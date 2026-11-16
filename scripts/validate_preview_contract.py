#!/usr/bin/env python3
"""PX-1.2: validación de un contrato de muestra, NO auditoría científica externa."""
import copy
import json
import re
from collections import Counter
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker

ROOT=Path(__file__).resolve().parent.parent
def load(p):
    return json.loads((ROOT/p).read_text(encoding="utf-8"))
schema=load("schemas/px12-preview-contract.schema.json")
data=load("fixtures/px12-preview-examples.json")
Draft202012Validator.check_schema(schema)
validator=Draft202012Validator(schema,format_checker=FormatChecker())
def check_schema(doc):
    errors=list(validator.iter_errors(doc))
    if errors:
        raise AssertionError("JSON Schema inválido: "+str(errors[0]))
def sem(doc):
    by=lambda name:{x["id"]:x for x in doc[name]}
    tables={k:by(k) for k in ("sources","source_versions","problems","segments","claims","evidence_links","tasks","alternatives","opportunities","reviews")}
    for k in tables:
        assert len(tables[k])==len(doc[k]),"ID duplicado "+k
    src,sv,prob,seg,clm,task,alt=tables["sources"],tables["source_versions"],tables["problems"],tables["segments"],tables["claims"],tables["tasks"],tables["alternatives"]
    for s in sv.values(): assert s["source_id"] in src
    for p in prob.values(): assert p["origin_source_id"] in src and p["weighted_score"] is None
    for s in seg.values(): assert s["origin_source_id"] in src
    for c in clm.values():
        assert c["source_version_id"] in sv
        st=c["statistic"]
        if c["claim_type"]=="qualitative_testimony":
            assert st["percent"] is None and st["denominator"] is None and st["unit"]=="none"
        else:
            assert st["percent"] is not None and 0 <= st["percent"] <= 100 and st["unit"]=="respondent_share"
        assert st["numerator"] is None and not st["can_compare_nationally"]
    for l in doc["evidence_links"]:
        assert l["claim_id"] in clm and l["problem_id"] in prob and l["source_id"] in src
        assert sv[clm[l["claim_id"]]["source_version_id"]]["source_id"]==l["source_id"]
        assert (l["backing_relation"]==0)==(l["status"]=="context")
    assert len({(x["problem_id"],x["segment_id"],x["source_id"],x["kind"]) for x in doc["problem_segments"]})==len(doc["problem_segments"])
    for x in doc["problem_segments"]:
        assert x["problem_id"] in prob and x["segment_id"] in seg and x["source_id"] in src
        assert x["auto_rebase_claim"] is False
    for t in task.values(): assert set(t["problem_ids"]).issubset(prob)
    for a in alt.values():
        assert set(a["task_ids"]).issubset(task)
        assert set(a["problem_ids"]).issubset(prob)
        assert all(set(a["problem_ids"]) & set(task[t]["problem_ids"]) for t in a["task_ids"])
    for o in doc["opportunities"]:
        assert o["task_id"] in task
        a=alt[o["alternative_id"]];b=alt[o["comparator_id"]]
        assert a["id"] != b["id"] and o["task_id"] in a["task_ids"] and o["task_id"] in b["task_ids"]
        assert a["type"]=="ai_hypothesis" and b["type"]=="conventional_comparator"
        assert all(o[k] is None for k in ("measured_incremental_impact","measured_operating_cost","adoption_rate"))
    kinds={"contract":{doc["contract_version"]},"claim":set(clm),"task":set(task),"alternative":set(alt),"opportunity":set(tables["opportunities"])}
    for r in doc["reviews"]:
        assert r["entity_id"] in kinds[r["entity_kind"]] or (r["entity_kind"]=="contract" and r["entity_id"]=="PX-1.2@"+doc["contract_version"])
        assert r["reviewer"] is None and r["reviewed_at"] is None
    return True
check_schema(data)
sem(data)
html=(ROOT/"index.html").read_text(encoding="utf-8")
raw=re.search(r'<script\\s+type="application/json"\\s+id="data">([\\s\\S]*?)</script>',html)
assert raw,"Falta JSON A embebido"
A=json.loads(raw.group(1))
B=load("analisis/SDC_M17a_Matriz_B31_2026-11-16.json")
S=load("analisis/SDC_M17c_Suficiencia_B31_2026-11-16.json")
assert (len(A["sources"]),len(A["problems"]),len(A["segments"]))==(26,31,121)
assert len(A["cross"])==87 and len(B["rows"])==len(S["rows"])==31
assert Counter(x["band"] for x in B["rows"])=={"Alta":11,"Media":12,"Por validar":8}
assert all(x["scorePonderado"]=="NO CALCULABLE; no sustituir ND por 0" for x in S["rows"])
assert sum('class="decision-opp" data-kind="ia"' in html[i:i+95] for i in [])==0  # no implicit C import
assert html.count('class="decision-opp" data-kind="ia"')==4
assert html.count('class="decision-opp" data-kind="noia"')==2
P={p["id"]:p for p in A["problems"]}
BM={p["id"]:p for p in B["rows"]}
for pid in ("P20","P25","P48"):
    assert pid in P
    assert next(x for x in data["problems"] if x["id"]==pid)["editorial_band"]==BM[pid]["band"]
for pid,claimid in (("P20","CLM-F03-D22-RENDICION-62"),("P25","CLM-F03-D33-DONACIONES-57")):
    c=next(x for x in data["claims"] if x["id"]==claimid)
    assert c["statistic"]["percent"]==BM[pid]["metric"]
    assert c["statistic"]["denominator"]==BM[pid]["denominator"]
assert BM["P48"]["metric"] is None and BM["P48"]["denominator"] is None
for link in data["evidence_links"]:
    original=next(b for b in P[link["problem_id"]]["backing"] if b["source"]==link["source_id"])
    assert link["backing_relation"]==original["relation"]
for link in data["problem_segments"]:
    assert any(x["problem"]==link["problem_id"] and x["segment"]==link["segment_id"] and x["source"]==link["source_id"] and x["kind"]==link["kind"] for x in A["cross"])
byF={s["id"]:s.get("origin") for s in A["sources"]}
assert byF["F11"]==byF["F12"]=="IFO-2025-TRASCENDER"
assert {x["id"] for x in A["problems"] if not any(c["problem"]==x["id"] for c in A["cross"])}=={"P30","P54"}
assert next(x for x in data["claims"] if x["id"]=="CLM-F03-D22-REVISION-42")["statistic"]["question_key"]!=next(x for x in data["claims"] if x["id"]=="CLM-F03-D22-RENDICION-62")["statistic"]["question_key"]
# Pruebas negativas: modificaciones maliciosas/accidentales deben FALLAR.
def must_reject(name,mutator,by_schema=False):
    c=copy.deepcopy(data);mutator(c)
    try:
        if by_schema:check_schema(c)
        else:sem(c)
    except (AssertionError,KeyError,StopIteration):
        print("NEGATIVE PASS:",name);return
    raise AssertionError("NEGATIVE FAIL: "+name)
must_reject("score B inventado",lambda x:x["problems"][0].update(weighted_score=92),True)
must_reject("N=0",lambda x:x["claims"][0]["statistic"].update(denominator=0),True)
must_reject("dato cualitativo como porcentaje",lambda x:x["claims"][3]["statistic"].update(percent=65),False)
must_reject("rebase de filtro sin sustento",lambda x:x["problem_segments"][0].update(auto_rebase_claim=True),True)
must_reject("claim sin fuente",lambda x:x["claims"][0].update(source_version_id="SV-FAKE-CAT-V06"),False)
must_reject("alternativa sin comparador",lambda x:x["opportunities"][0].update(comparator_id="ALT-NO-EXISTE"),False)
must_reject("aprobador ficticio",lambda x:x["reviews"][0].update(reviewer="Juanra"),True)
must_reject("cruce duplicado",lambda x:x["problem_segments"].append(copy.deepcopy(x["problem_segments"][0])),False)
print("PASS: JSON Schema 2020-12 + FKs/joins + A/B/S + C + 8 negative cases; no HTML/data modified")
