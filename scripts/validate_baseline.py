#!/usr/bin/env python3
"""Validación automática de invariantes del corte público v0.6.

No certifica veracidad científica, UX, privacidad completa ni aprobación humana.
Para cambios de modelo autorizados, actualizar las expectativas junto con el diff.
Solo usa biblioteca estándar. Ejecutar desde cualquier directorio.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
failures: list[str] = []
checks: list[str] = []


def expect(ok: bool, label: str) -> None:
    (checks if ok else failures).append(label)
    print(("PASS" if ok else "FAIL") + "  " + label)


def read(path: str) -> str:
    target = ROOT / path
    if not target.is_file():
        expect(False, "Archivo requerido: " + path)
        return ""
    return target.read_text(encoding="utf-8")


required = [
    "AGENTS.md", "GOALS.md", "PLANS.md", "PROMPTS.md",
    "docs/PROTOCOL.md", "docs/DATA_POLICY.md", "docs/QA.md",
    "docs/RELEASE.md", "docs/SECURITY.md", "docs/DECISIONS.md",
    "docs/HANDOFF_TEMPLATE.md", ".github/pull_request_template.md",
    ".github/CODEOWNERS", "README.md", "CHANGELOG.md",
    "ESTADO_PUBLICACION.md", "versiones.json", "index.html",
]
for name in required:
    expect((ROOT / name).is_file(), "Existe " + name)

html = read("index.html")
manifest_raw = read("versiones.json")
data = {}

match = re.search(
    r'<script\s+type="application/json"\s+id="data">([\s\S]*?)</script>',
    html,
    flags=re.IGNORECASE,
)
expect(bool(match), "JSON de catálogo A localizado en HTML")
if match:
    try:
        data = json.loads(match.group(1))
        expect(True, "JSON A sintácticamente válido")
    except (json.JSONDecodeError, TypeError) as exc:
        expect(False, "JSON A no válido: " + str(exc))

for key, size in (("sources", 26), ("problems", 31), ("segments", 121)):
    items = data.get(key) if isinstance(data, dict) else None
    expect(isinstance(items, list) and len(items) == size, f"Catálogo {key}: {size}")
    if isinstance(items, list):
        identifiers = [x.get("id") for x in items if isinstance(x, dict)]
        expect(len(identifiers) == len(set(identifiers)) and all(identifiers), f"IDs únicos de {key}")

source_ids = {x.get("id") for x in data.get("sources", []) if isinstance(x, dict)}
for key in ("problems", "segments"):
    items = data.get(key, [])
    if not isinstance(items, list):
        continue
    orphans = []
    for item in items:
        if not isinstance(item, dict):
            orphans.append("registro no diccionario")
            continue
        if item.get("origin") not in source_ids:
            orphans.append(str(item.get("id")) + " origin")
        for backing in item.get("backing", []):
            if backing.get("source") not in source_ids:
                orphans.append(str(item.get("id")) + " backing")
    expect(not orphans, f"Origen y backing de {key} referencian fuentes existentes")

for label, expression, count in (
    ("Ranking B v0.6", 'class="decision-ranking-row"', 31),
    ("C IA v0.6", 'class="decision-opp" data-kind="ia"', 4),
    ("C convencional v0.6", 'class="decision-opp" data-kind="noia"', 2),
    ("Suficiencia B v0.6", 'class="suff-row"', 31),
    ("F03 suficiencia v0.6", 'class="suff-row" data-kind="indicador"', 15),
    ("Otros estudios suficiencia v0.6", 'class="suff-row" data-kind="cualitativa"', 16),
):
    expect(html.count(expression) == count, f"{label}: {count}")
expect("Versión 0.6" in html, "Banner actual visible corresponde a v0.6")

html_ids = re.findall(r'\sid="([A-Za-z0-9_-]+)"', html)
expect(len(html_ids) == len(set(html_ids)), "No hay IDs HTML estáticos repetidos")
targets = re.findall(r'\saria-controls="([^"]+)"', html)
unknown = [x for x in targets if "'+" not in x and x not in html_ids]
expect(not unknown, "Los tabs estáticos apuntan a IDs existentes")

try:
    manifest = json.loads(manifest_raw)
except (json.JSONDecodeError, TypeError) as exc:
    manifest = []
    expect(False, "Manifiesto de versiones no válido: " + str(exc))
expect(isinstance(manifest, list) and bool(manifest), "Manifiesto de versiones es lista no vacía")
if isinstance(manifest, list):
    versions = [x.get("version") for x in manifest if isinstance(x, dict)]
    current = [x.get("version") for x in manifest if isinstance(x, dict) and x.get("estado") == "actual"]
    expect(len(versions) == len(set(versions)), "Versiones únicas en manifest")
    expect(current == ["0.7"], "Un solo corte publicado en el manifiesto: v0.7")
    archived_v06 = [x for x in manifest if isinstance(x, dict) and x.get("version") == "0.6"]
    expect(len(archived_v06) == 1 and archived_v06[0].get("estado") == "archivada", "v0.6 figura archivada sin alterar su contenido")
    for version in ("v0.6", "v0.5", "v0.4", "v0.3", "v0.2", "base-a"):
        expect((ROOT / "versiones" / version / "index.html").is_file(),
               "Snapshot histórico " + version)

# En el release, index.html de raíz mantiene el original histórico como golden master.
# La ruta pública '/' redirige a preview/h0/index.html en vercel.json.
legacy = ROOT / "versiones" / "v0.6" / "index.html"
expect(legacy.exists() and legacy.read_bytes() == (ROOT / "index.html").read_bytes(),
       "Archivo v0.6 byte a byte idéntico al antiguo index.html")
try:
    vercel = json.loads(read("vercel.json"))
    redirects = vercel.get("redirects", [])
    rewrites = vercel.get("rewrites", [])
    expect(any(x.get("source") == "/" and x.get("destination") == "/preview/h0/index.html" for x in redirects),
           "Portada pública v0.7 redirigida a experiencia de cuatro etapas")
    expect(any(x.get("source") == "/archivo" and x.get("destination") == "/versiones/v0.6/index.html" for x in rewrites),
           "Archivo histórico v0.6 accesible por /archivo")
except (json.JSONDecodeError, OSError) as exc:
    expect(False, "Configuración release no válida: " + str(exc))
preview = read("preview/h0/index.html")
expect("id=\"scope-top\"" in preview and "methods.css" in preview and "data-go=\"metodos\"" in preview,
       "Vista v0.7 incluye selector, CSS y sección Métodos y fuentes")
expect("Archivo v0.6" in preview, "Footer permite consultar v0.6 histórica")

unsafe_urls = re.findall(r'https?://(?:app\.notion\.com|(?:www\.)?notion\.so|drive\.google\.com)/', html)
expect(not unsafe_urls, "HTML no incorpora URLs de espacios privados Notion/Drive")
secret_patterns = [
    r'ghp_[A-Za-z0-9]{20,}',
    r'github_pat_[A-Za-z0-9_]{20,}',
    r'AKIA[0-9A-Z]{16}',
    r'sk-[A-Za-z0-9_-]{24,}',
]
expect(not any(re.search(pattern, html) for pattern in secret_patterns),
       "No hay patrones evidentes de credenciales en HTML (cribado limitado)")

print()
print(f"Validaciones: {len(checks)} PASS; {len(failures)} FAIL")
if failures:
    print("El gate falla. No publicar hasta corregir o tramitar una migración autorizada.")
    sys.exit(1)
print("Corte histórico v0.6 íntegro y contrato de rutas v0.7 validado. Esto NO valida la navegación real ni toda la investigación.")
