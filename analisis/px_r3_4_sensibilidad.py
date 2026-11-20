"""Reproduce stress tests for PX-R3.4 without imputing empirical values."""

from collections import Counter
from itertools import combinations, product
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent
CRITERIA = "IFAU"
SCENARIOS = {
    "base_propuesta": dict(zip(CRITERIA, (35, 25, 25, 15))),
    "continuidad": dict(zip(CRITERIA, (50, 15, 15, 20))),
    "convenios": dict(zip(CRITERIA, (25, 20, 45, 10))),
    "sostenibilidad": dict(zip(CRITERIA, (45, 25, 15, 15))),
}
MODERATE_CUTS = list(product((3, 5, 7), (15, 20, 25), (45, 50, 55)))
STRESS_CUTS = [(5, 20, upper) for upper in range(35, 66, 5)]


def read_json(name):
    return json.loads((ROOT / name).read_text())


def total_if_eligible(levels, weights):
    """Gate structural only. The study does not approve additive aggregation."""
    if any(levels[criterion] is None for criterion in weights):
        return None
    return sum(levels[k] * weight for k, weight in weights.items())


def level_at(value, cuts):
    return 0 if value == 0 else 1 + sum(value >= cut for cut in cuts)


def possible_a(percent, cuts):
    return sorted({level_at(percent - 0.5, cuts), level_at(percent + 0.5, cuts)})


def comparison_bounds(first, second, weights):
    """Return conditional bounds in hundredths of a level; never store fill-ins."""
    diff = [range(-4, 5) if first[k] is None and second[k] is None else
            range(-second[k], 5 - second[k]) if first[k] is None else
            range(first[k] - 4, first[k] + 1) if second[k] is None else
            (first[k] - second[k],) for k in CRITERIA]
    scores = [sum(w * d for w, d in zip(weights.values(), vector))
              for vector in product(*diff)]
    return {"min_centésimas": min(scores), "max_centésimas": max(scores),
            "empate_posible": 0 in scores,
            "inversion_posible": min(scores) < 0 < max(scores)}


def build_report():
    data = read_json("px-r3-3-matriz-aplicacion-124-v1.json")
    rubric = read_json("px-r3-2-rubrica-criticidad-v0.1.json")
    problems = {}
    observations = {}
    for row in data["celdas"]:
        pid, criterion = row["problema_id"], row["criterio"]
        assert criterion not in problems.setdefault(pid, {})
        problems[pid][criterion] = row["nivel"]
        assert row["escenario"] == "FUNDACIONES_CL" and row["estado"] == "ND"
        assert row["nivel"] is None
        obs = row["observacion_submuestra"]
        if obs:
            assert criterion == "A" and obs["n"] == 125
            assert obs["escenario"] == "F03_CONVENIOS_125_2025" and obs["periodo"] == "2025"
            observations[pid] = obs
    assert len(problems) == 31 and len(data["celdas"]) == 124
    assert all(set(row) == set(CRITERIA) for row in problems.values())
    assert len(observations) == 7 and not data["agregado_autorizado"]
    assert SCENARIOS["base_propuesta"] == {
        k: rubric["criterios"][k]["peso_propuesto"] for k in CRITERIA
    }
    assert all(sum(w.values()) == 100 and min(w.values()) > 0 for w in SCENARIOS.values())
    sample = sorted(observations)
    sample_levels = {pid: {**problems[pid], "A": observations[pid]["nivel_provisional"]}
                     for pid in sample}
    weighted = {name: {
        "n_totales_principal": sum(total_if_eligible(x, weights) is not None for x in problems.values()),
        "n_totales_muestrales": sum(total_if_eligible(x, weights) is not None for x in sample_levels.values()),
        "pares_muestrales_sin_orden_robusto": sum(
            comparison_bounds(sample_levels[p], sample_levels[q], weights)["inversion_posible"]
            for p, q in combinations(sample, 2)),
        "P02_menos_P20_muestra": comparison_bounds(sample_levels["P02"], sample_levels["P20"], weights),
        "P48_menos_P50_principal": comparison_bounds(problems["P48"], problems["P50"], weights),
        "ejemplo_sintetico_P02_menos_P20_con_I_mas_1": weights["I"] - weights["A"],
    } for name, weights in SCENARIOS.items()}
    moderate = {pid: sorted({level for cuts in MODERATE_CUTS for level in
                             possible_a(observations[pid]["valor_porcentaje"], cuts)})
                for pid in sample}
    stress = {str(cuts[2]): {pid: possible_a(observations[pid]["valor_porcentaje"], cuts)
                             for pid in sample} for cuts in STRESS_CUTS}
    assert all(v["n_totales_principal"] == v["n_totales_muestrales"] == 0 for v in weighted.values())
    assert all(v["pares_muestrales_sin_orden_robusto"] == 21 for v in weighted.values())
    assert all(moderate[pid] == [observations[pid]["nivel_provisional"]] for pid in sample)
    assert stress["60"]["P16"] == [3] and stress["60"]["P20"] == [4]
    assert stress["65"]["P16"] == stress["65"]["P20"] == [3]
    assert stress["40"]["P22"] == [3, 4]
    assert all(v["P48_menos_P50_principal"]["empate_posible"] for v in weighted.values())
    assert weighted["base_propuesta"]["P02_menos_P20_muestra"]["empate_posible"]
    assert weighted["continuidad"]["ejemplo_sintetico_P02_menos_P20_con_I_mas_1"] > 0
    assert weighted["convenios"]["ejemplo_sintetico_P02_menos_P20_con_I_mas_1"] < 0
    return {
        "fase": "PX-R3.4", "version": "1.0.0", "entrada": "9d477da1598596317e37ea3ae3b58c0440d3f04c",
        "metodo": "Escenarios hipotéticos, comparación condicional sin imputación ni orden global",
        "pesos_propuestos_pct": SCENARIOS,
        "escenario_principal": {"id": "FUNDACIONES_CL", "celdas_nd": 124},
        "escenario_muestral": {"id": "F03_CONVENIOS_125_2025", "n": 125,
                               "niveles_A": {k: observations[k]["nivel_provisional"] for k in sample},
                               "grupos_A": dict(sorted(Counter(x["nivel_provisional"] for x in observations.values()).items()))},
        "sensibilidad_pesos": weighted,
        "sensibilidad_umbrales": {"redondeo_pp": 0.5, "n_combinaciones_moderadas": len(MODERATE_CUTS),
                                  "rangos_moderados": MODERATE_CUTS, "niveles_moderados_por_problema": moderate,
                                  "estres_por_corte_superior_pct": stress},
    }


if __name__ == "__main__":
    print(json.dumps(build_report(), ensure_ascii=False, indent=2))
