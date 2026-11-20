"""Genera el contrato documental de Criticidad para las dos vistas."""
import argparse
from collections import Counter, defaultdict
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "h-2-1-criticidad-por-universo-v1.json"
CRITERIA = {"I": "Impacto", "F": "Recurrencia", "A": "Alcance", "U": "Urgencia"}
SECTOR_REVIEW_FIELDS = (
    "impacto_comparable", "frecuencia_episodios_por_organizacion_tiempo",
    "prevalencia_nacional_o_exclusiva_fundaciones", "urgencia_comparable",
)
FINDING_GROUPS = {
    "F_EXCLUSIVA_EXPLICITA": "especifica",
    "M_MIXTA_NO_DESAGREGADA": "mixta",
    "G_OSFL_GENERAL": "general",
    "S_SECTORIAL_SIN_FORMA": "sectorial",
    "I_INFERIDA_POR_VALIDAR": "contextual",
    "U_INSUFICIENTE": "pendiente",
    "X_NO_FUNDACION_EXPLICITA": "solo_otras_formas",
}
SCOPES = {
    "tercer_sector": "OSC pertinentes al proyecto en Chile",
    "fundaciones": "Organizaciones de forma jurídica fundación en Chile",
}
INPUTS = {
    "catalogo": "../preview/h0/h1-data.json",
    "banco": "mf1-banco-26-fuentes-v1.json",
    "afirmaciones": "px-r1-2b-attribution-31p-147links-v1.json",
    "indicadores": "px-r3-1-matriz-indicadores-31-v1.json",
    "rubrica": "px-r3-3-matriz-aplicacion-124-v1.json",
}


def load(name):
    return json.loads((ROOT / INPUTS[name]).read_text(encoding="utf-8"))


def primary_observations(indicator, claims):
    observation = {
        "id": indicator["problema_id"] + "__PX-R3.1__PRINCIPAL",
        "fuente": indicator["fuente_principal"],
        "localizador": indicator["localizador"],
        "url": indicator["url_primaria"],
        "tipo": indicator["tipo_indicador"],
        "texto": indicator["indicador_principal"],
        "poblacion": indicator["poblacion"],
        "periodo": indicator["periodo_referencia"],
        "n": indicator["n_base"] if isinstance(indicator["n_base"], int) else None,
        "unidad_n": indicator["unidad"],
        "limitacion": indicator["consecuencia_o_limite"],
    }
    if indicator["problema_id"] != "P20":
        return [observation]
    # Los dos porcentajes de P20 tienen identificadores y bases independientes.
    return [
        {
            **observation,
            "id": claim["id"], "texto": claim["text"], "n": claim["denominator"],
            "poblacion": claim["population"], "periodo": claim["period"],
            "localizador": claim["locator"], "url": claim["url"],
            "limitacion": claim["limitations"], "tipo": claim["claim_type"],
            "unidad_n": "organizaciones encuestadas" if claim["denominator"] else None,
        }
        for claim in (claims["CLM-F03-D22-RENDICION-62"], claims["CLM-F03-D22-REVISION-42"])
    ]


def criterion_view(cell, scope, indicator, sample):
    gap = cell["justificacion"]
    if scope == "tercer_sector":
        if cell["criterio"] == "A":
            gap = ("Falta una proporción de OSC elegibles con el episodio definido "
                   "en 12 meses, para el universo de esta vista. " + indicator["consecuencia_o_limite"])
        else:
            gap = gap.replace("por fundación afectada", "por OSC afectada")
    return {
        "estado": "datos_insuficientes",
        "valor_comparable": None,
        "unidad_objetivo": cell["unidad_objetivo"],
        "dato_faltante": gap,
        "observacion_muestral": sample,
    }


def build():
    catalog = load("catalogo")["problems"]
    indicators = {item["problema_id"]: item for item in load("indicadores")["problemas"]}
    claims = {item["id"]: item for item in load("afirmaciones")["canonical_claims"]}
    cells = defaultdict(dict)
    for cell in load("rubrica")["celdas"]:
        assert cell["criterio"] not in cells[cell["problema_id"]], "Celda repetida"
        assert cell["estado"] == "ND" and cell["valor_elegible"] is None, "Revisar medición nueva"
        cells[cell["problema_id"]][cell["criterio"]] = cell
    findings = defaultdict(lambda: defaultdict(list))
    for item in load("banco")["findings"]:
        group = FINDING_GROUPS[item["population_evidence_class"]]
        findings[item["P"]][group].append(item["id"])

    problems = []
    for problem in catalog:
        pid = problem["id"]
        indicator = indicators[pid]
        assert all(indicator[field] == "ND" for field in SECTOR_REVIEW_FIELDS), (
            f"Revisar elegibilidad de la medición nueva de {pid} para tercer sector"
        )
        groups = dict(findings[pid])
        foundation_state = "especifica" if groups.get("especifica") else (
            "mixta" if groups.get("mixta") else "aplicabilidad_por_confirmar"
        )
        sample = cells[pid]["A"]["observacion_submuestra"]
        if sample:
            sample = {
                "grupo": sample["escenario"],
                "poblacion": "Fundaciones y corporaciones encuestadas con contratos o convenios estatales",
                "fuente": "F03", "porcentaje": sample["valor_porcentaje"],
                "episodio": sample["episodio_consultado"], "n": sample["n"],
                "unidad_n": sample["unidad_n"], "periodo": sample["periodo"],
                "localizador": sample["localizador"], "url": sample["url"],
                "metodo": sample["metodo"],
            }
        views = {}
        for scope in SCOPES:
            scope_groups = {key: ids for key, ids in groups.items()
                            if scope == "tercer_sector" or key != "solo_otras_formas"}
            views[scope] = {
                "aplicabilidad_documental": "documentado" if scope == "tercer_sector" else foundation_state,
                "hallazgos_por_poblacion": scope_groups,
                "criterios": {
                    key: criterion_view(cells[pid][key], scope, indicator, sample if key == "A" else None)
                    for key in CRITERIA
                },
            }
        problems.append({
            "id": pid, "titulo": problem["title"], "tema": problem["themeId"],
            "observaciones_de_fuente": primary_observations(indicator, claims),
            "vistas": views,
        })

    summary = {}
    for scope in SCOPES:
        rows = [problem["vistas"][scope] for problem in problems]
        summary[scope] = {
            "problemas": len(rows),
            "aplicabilidad_documental": dict(Counter(row["aplicabilidad_documental"] for row in rows)),
            "mediciones_comparables": {key: sum(row["criterios"][key]["valor_comparable"] is not None
                                               for row in rows) for key in CRITERIA},
            "observaciones_muestrales_de_alcance": sum(
                row["criterios"]["A"]["observacion_muestral"] is not None for row in rows
            ),
            "problemas_elegibles_para_ranking": [
                problem["id"] for problem, row in zip(problems, rows)
                if all(cell["valor_comparable"] is not None for cell in row["criterios"].values())
            ],
        }
    return {
        "version": "1.0.0", "universos": SCOPES, "criterios": CRITERIA,
        "insumos": INPUTS, "pesos_aplicados": False, "resumen": summary, "problemas": problems,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Comprueba que el contrato se reproduce.")
    args = parser.parse_args()
    content = json.dumps(build(), ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if OUTPUT.read_text(encoding="utf-8") != content:
            parser.exit(1, "El contrato no coincide con sus insumos.\n")
    else:
        OUTPUT.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    main()
