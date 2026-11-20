"""Comprueba cobertura y límites de comparabilidad de H-2.1."""
import json
import unittest

from build_h_2_1 import CRITERIA, OUTPUT, SCOPES, build, load


class CriticidadPorUniverso(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.contract = json.loads(OUTPUT.read_text(encoding="utf-8"))
        cls.problems = {row["id"]: row for row in cls.contract["problemas"]}

    def test_reproducible_y_catalogo_completo(self):
        self.assertEqual(self.contract, build())
        self.assertEqual(len(self.problems), 31)
        self.assertEqual(list(self.problems), [row["id"] for row in load("catalogo")["problems"]])
        for row in self.problems.values():
            self.assertEqual(set(row["vistas"]), set(SCOPES))
            for view in row["vistas"].values():
                self.assertEqual(set(view["criterios"]), set(CRITERIA))

    def test_aplicabilidad_es_distinta_de_criticidad(self):
        summary = self.contract["resumen"]
        self.assertEqual(summary["fundaciones"]["aplicabilidad_documental"], {
            "especifica": 6, "mixta": 13, "aplicabilidad_por_confirmar": 12,
        })
        self.assertEqual(summary["tercer_sector"]["aplicabilidad_documental"], {"documentado": 31})
        all_findings = {row["id"]: row["P"] for row in load("banco")["findings"]}
        displayed = {}
        for pid, row in self.problems.items():
            for ids in row["vistas"]["tercer_sector"]["hallazgos_por_poblacion"].values():
                for finding in ids:
                    self.assertNotIn(finding, displayed)
                    displayed[finding] = pid
        self.assertEqual(displayed, all_findings)

    def test_nd_y_ranking_en_ambas_vistas(self):
        self.assertFalse(self.contract["pesos_aplicados"])
        for scope in SCOPES:
            self.assertEqual(self.contract["resumen"][scope]["problemas_elegibles_para_ranking"], [])
            for row in self.problems.values():
                for cell in row["vistas"][scope]["criterios"].values():
                    self.assertEqual(cell["estado"], "datos_insuficientes")
                    self.assertIsNone(cell["valor_comparable"])
                    self.assertTrue(cell["dato_faltante"])

    def test_convenios_solo_como_alcance_muestral(self):
        for scope in SCOPES:
            eligible = set()
            for pid, row in self.problems.items():
                for key, cell in row["vistas"][scope]["criterios"].items():
                    sample = cell["observacion_muestral"]
                    if sample is not None:
                        self.assertEqual(key, "A")
                        self.assertEqual((sample["fuente"], sample["n"], sample["periodo"]), ("F03", 125, "2025"))
                        self.assertEqual(sample["grupo"], "F03_CONVENIOS_125_2025")
                        self.assertNotIn("nivel", sample)
                        eligible.add(pid)
            self.assertEqual(eligible, {"P02", "P16", "P18", "P20", "P21", "P22", "P23"})

    def test_p20_bases_por_pregunta_y_selector(self):
        p20 = self.problems["P20"]
        self.assertEqual([item["n"] for item in p20["observaciones_de_fuente"]], [125, None])
        self.assertEqual(p20["vistas"]["fundaciones"]["aplicabilidad_documental"], "mixta")
        left = p20["vistas"]["fundaciones"]["criterios"]["A"]
        right = p20["vistas"]["tercer_sector"]["criterios"]["A"]
        self.assertEqual(left["observacion_muestral"], right["observacion_muestral"])
        self.assertEqual(left["observacion_muestral"]["porcentaje"], 62)
        self.assertNotEqual(left["dato_faltante"], right["dato_faltante"])

    def test_contexto_conserva_fuente_y_unidad(self):
        p48 = self.problems["P48"]
        self.assertEqual(p48["vistas"]["fundaciones"]["aplicabilidad_documental"],
                         "aplicabilidad_por_confirmar")
        self.assertIsNone(p48["observaciones_de_fuente"][0]["n"])
        self.assertEqual(p48["observaciones_de_fuente"][0]["fuente"], "F26")
        p54 = self.problems["P54"]["observaciones_de_fuente"][0]
        self.assertEqual(p54["n"], 82)
        self.assertIn("menciones", p54["unidad_n"])
        self.assertEqual(self.problems["P13"]["observaciones_de_fuente"][0]["n"], 255)


if __name__ == "__main__":
    unittest.main(verbosity=2)
