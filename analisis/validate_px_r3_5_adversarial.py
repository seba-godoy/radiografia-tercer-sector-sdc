"""Validate evidence projections on the PX-R3 research branch."""

import csv
import json
from pathlib import Path
import unittest

from px_r3_4_sensibilidad import SCENARIOS, total_if_eligible


ROOT = Path(__file__).resolve().parent


def read_json(name):
    return json.loads((ROOT / name).read_text(encoding="utf-8"))


class EvidenceError(ValueError):
    """A claim exceeded the information its source supports."""


def validate_survey_item(item_ids, percentage, items):
    if len(item_ids) != 1:
        raise EvidenceError("AGREGACION_DE_ITEMS")
    if percentage != items[item_ids[0]]:
        raise EvidenceError("PORCENTAJE_NO_COINCIDE")


def validate_projection(expected, proposed):
    for field, reason in (
        ("unidad", "UNIDAD_INCOMPATIBLE"),
        ("universo", "UNIVERSO_INCOMPATIBLE"),
        ("n", "BASE_INCOMPATIBLE"),
        ("porcentaje", "PORCENTAJE_NO_COINCIDE"),
    ):
        if proposed[field] != expected[field]:
            raise EvidenceError(reason)


def validate_origins(publications, independent_claimed, by_source):
    origins = {by_source[source]["root_candidate"] for source in publications}
    if independent_claimed > len(origins):
        raise EvidenceError("RAIZ_DUPLICADA")
    return len(origins)


def validate_nd(levels, candidate):
    for criterion, base in levels.items():
        if base is None and candidate[criterion] is not None:
            raise EvidenceError("ND_IMPUTADO")


class CriticidadAdversarial(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bank = read_json("mf1-banco-26-fuentes-v1.json")
        cls.by_source = {x["id"]: x for x in cls.bank["sources"]}
        cls.claims = {x["id"]: x for x in read_json(
            "px-r1-2b-attribution-31p-147links-v1.json")["canonical_claims"]}
        cls.matrix = read_json("px-r3-3-matriz-aplicacion-124-v1.json")
        cls.by_problem = {}
        for row in cls.matrix["celdas"]:
            cls.by_problem.setdefault(row["problema_id"], {})[row["criterio"]] = row
        with (ROOT / "mf1-hallazgos-245-v1.csv").open(encoding="utf-8", newline="") as file:
            cls.findings = {x["id"]: x for x in csv.DictReader(file)}

    def test_01_p28_items_separados(self):
        source = self.findings["P28__F03__01"]
        self.assertEqual(json.loads(source["cifras_mencionadas"])[:2], ["52%", "52%"])
        items = {"estabilidad": 52, "retencion": 52}
        for item_id, value in items.items():
            with self.subTest(valid=item_id):
                validate_survey_item([item_id], value, items)
        # Reject also a seemingly plausible bounded union: overlap is unmeasured.
        for wrong in (104, 100, 52):
            with self.subTest(invalid=wrong), self.assertRaisesRegex(
                EvidenceError, "AGREGACION_DE_ITEMS"
            ):
                validate_survey_item(list(items), wrong, items)

    def test_02_f22_menciones_no_organizaciones(self):
        source = self.findings["P54__F22__01"]
        self.assertIn("43,9%", json.loads(source["cifras_mencionadas"]))
        bases = {x["n"]: x["unit"] for x in self.by_source["F22"]["bases_n"]}
        self.assertIn("MENCIONES", bases[82])
        self.assertIn("OSC", bases[51])
        expected = {"unidad": "mencion", "n": 82, "universo": "respuestas_multiples_F22",
                    "porcentaje": 43.9}
        validate_projection(expected, dict(expected))
        with self.assertRaisesRegex(EvidenceError, "UNIDAD_INCOMPATIBLE"):
            validate_projection(expected, {**expected, "unidad": "organizacion"})
        with self.assertRaisesRegex(EvidenceError, "BASE_INCOMPATIBLE"):
            validate_projection(expected, {**expected, "n": 51})
        self.assertIsNone(self.by_problem["P54"]["A"]["nivel"])

    def test_03_f11_f12_una_raiz(self):
        ids = ["F11", "F12"]
        # Counting both publications is valid; they provide one documented origin.
        self.assertEqual(len({self.by_source[x]["id"] for x in ids}), 2)
        self.assertEqual(validate_origins(ids, 1, self.by_source), 1)
        self.assertEqual(self.by_source["F11"]["root_candidate"], "IFO-2025-TRASCENDER")
        with self.assertRaisesRegex(EvidenceError, "RAIZ_DUPLICADA"):
            validate_origins(ids, 2, self.by_source)

    def test_04_f26_sin_prevalencia_nacional(self):
        finding = self.findings["P48__F26__02"]
        self.assertEqual(finding["clase"], "S_SECTORIAL_SIN_FORMA")
        self.assertEqual(self.by_source["F26"]["population_scope"],
                         "colaboradores_servicios_proteccion")
        source = {"unidad": "diagnostico_sectorial", "n": None, "universo": "proteccion_especializada",
                  "porcentaje": None}
        validate_projection(source, dict(source))
        with self.assertRaisesRegex(EvidenceError, "UNIVERSO_INCOMPATIBLE"):
            validate_projection(source, {**source, "universo": "fundaciones_chile",
                                         "porcentaje": 30})
        with self.assertRaisesRegex(EvidenceError, "PORCENTAJE_NO_COINCIDE"):
            validate_projection(source, {**source, "porcentaje": 30})
        self.assertIsNone(self.by_problem["P48"]["A"]["nivel"])

    def test_05_f03_submuestra_y_base_por_pregunta(self):
        claim = self.claims["CLM-F03-D22-RENDICION-62"]
        sample = self.by_problem["P20"]["A"]["observacion_submuestra"]
        self.assertEqual(sample["n"], claim["denominator"])
        self.assertEqual(sample["valor_porcentaje"], claim["percent"])
        self.assertIn(255, [x["n"] for x in self.by_source["F03"]["bases_n"]])
        self.assertEqual(sample["n"], 125)
        expected = {"unidad": "organizacion", "n": claim["denominator"],
                    "universo": sample["escenario"], "porcentaje": claim["percent"]}
        validate_projection(expected, dict(expected))
        with self.assertRaisesRegex(EvidenceError, "BASE_INCOMPATIBLE"):
            validate_projection(expected, {**expected, "n": 255})
        duration = self.claims["CLM-F03-D22-REVISION-42"]
        self.assertIsNone(duration["denominator"])
        other_item = {**expected, "n": duration["denominator"], "porcentaje": duration["percent"]}
        validate_projection(other_item, dict(other_item))
        with self.assertRaisesRegex(EvidenceError, "BASE_INCOMPATIBLE"):
            validate_projection(other_item, {**other_item, "n": 125})

    def test_06_nd_no_se_imputa(self):
        levels = {k: v["nivel"] for k, v in self.by_problem["P20"].items()}
        self.assertEqual(len(self.matrix["celdas"]), 124)
        self.assertTrue(all(row["estado"] == "ND" and row["nivel"] is None
                            for row in self.matrix["celdas"]))
        self.assertFalse(self.matrix["agregado_autorizado"])
        validate_nd(levels, dict(levels))
        observed_zero = {"I": 0, "F": 1, "A": 2, "U": 3}
        validate_nd(observed_zero, dict(observed_zero))
        with self.assertRaisesRegex(EvidenceError, "ND_IMPUTADO"):
            validate_nd(levels, {**levels, "I": 0})
        for profile, weights in SCENARIOS.items():
            with self.subTest(profile=profile):
                self.assertIsNone(total_if_eligible(levels, weights))


if __name__ == "__main__":
    unittest.main(verbosity=2)
