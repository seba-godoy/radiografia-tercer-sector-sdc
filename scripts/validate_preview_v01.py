#!/usr/bin/env python3
"""PX-V0.1: contrato UI, fuentes y reglas de un snapshot derived, NO validación externa PDF."""
from pathlib import Path
from collections import Counter
import json, re
ROOT=Path(__file__).resolve().parent.parent
D=ROOT/"preview/px-v01"
d=json.loads((D/"catalogue.json").read_text(encoding="utf-8"))
html=(D/"index.html").read_text(encoding="utf-8")
js=(D/"app.js").read_text(encoding="utf-8")
css=(D/"styles.css").read_text(encoding="utf-8")
assert {k:len(d[k]) for k in ("sources","problems","segments","cross","editorial","claims")}=={"sources":26,"problems":31,"segments":121,"cross":87,"editorial":31,"claims":5}
assert d["meta"]["score_calculable"]==0
assert d["meta"]["source_commit"]=="09ed13fa7d9fd24897d94948863c106d96bca1c3"
def ids(t):
    x=[v["id"] for v in d[t]]
    assert len(x)==len(set(x)),t+" duplicate ids"
    return set(x)
F,P,S=ids("sources"),ids("problems"),ids("segments")
assert len(d["editorial"])==31 and {b["id"] for b in d["editorial"]}==P
assert set(d["themes"][i]["id"] for i in range(4))=={"T1","T2","T3","T4"}
assign=[p for theme in d["themes"] for p in theme["problem_ids"]]
assert Counter(assign)==Counter({p:1 for p in P})
assert [len(t["problem_ids"]) for t in d["themes"]]==[11,8,6,6]
for p in d["problems"]:
    assert p["origin"] in F and p["theme_id"] in {"T1","T2","T3","T4"}
    assert p["backing"],p["id"]
    for b in p["backing"]:
        assert b["source"] in F and b["relation"] in (0,0.5,1)
        for finding in b["findings"]:
            for ref in finding["refs"]:
                assert ref["url"].startswith(("https://","http://"))
for x in d["cross"]:
    assert x["problem"] in P and x["segment"] in S and x["source"] in F and x["kind"] in ("base","candidate")
assert len(set((x["problem"],x["segment"],x["source"],x["kind"]) for x in d["cross"]))==87
assert not {"P30","P54"} & {x["problem"] for x in d["cross"]}
assert Counter(x["band"] for x in d["editorial"])=={"Alta":11,"Media":12,"Por validar":8}
assert sum(isinstance(x["metric"],(int,float)) for x in d["editorial"])==15
claims={x["id"]:x for x in d["claims"]}
p20=claims["CLM-F03-D22-RENDICION-62"]
p42=claims["CLM-F03-D22-REVISION-42"]
p25=claims["CLM-F03-D33-DONACIONES-57"]
p48=claims["CLM-F26-P158-DOTACION"]
assert (p20["percent"],p20["denominator"],p25["percent"],p25["denominator"])==(62,125,57,255)
assert p20["id"]!=p42["id"] and p42["denominator"] is None
assert p48["percent"] is None and p48["denominator"] is None and "P48" in p48["problem_ids"]
for c in d["claims"]:
    assert set(c["problem_ids"])<=P
    assert c["url"].startswith("https://") and "#page=" in c["url"]
assert 'role="dialog"' in html and 'aria-modal="true"' in html
assert all(f in html for f in ('id="mapa"','id="problem-search"','id="evidence-filter"','id="evidence-drawer"','id="drawer-close"'))
assert "closeDrawer" in js and "Escape" in js and "previousFocus" in js and "aria-pressed" in js
assert "prefers-reduced-motion" in css and "@media(max-width:700px)" in css
for path in (D/"index.html",D/"styles.css",D/"app.js"):
    assert "app.notion.com" not in path.read_text(encoding="utf-8")
    assert "drive.google.com" not in path.read_text(encoding="utf-8")
assert not re.search(r"\b(?:api_key|secret|password)\s*=\s*['\"][A-Za-z0-9]",js,re.I)
print("PASS PX-V0.1: 26 F / 31 P / 121 S / 87 P×S / 4 groups / 5 claims / ND / navigation scaffolding.")
