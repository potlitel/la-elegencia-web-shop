"""Genera variantes tintadas por color para cada producto.

La paleta se lee en vivo de src/data/shop.js (sin duplicarla): Node vuelca
{ slug -> [[nombre, hex], ...] } y se genera la variante <slug>-<hex>.jpg
para cada color distinto del base (colors[0]). Los archivos que no
correspondan a la paleta actual se eliminan.

Estrategia de tintado: en HSV se recompone el color con el matiz objetivo
manteniendo la saturación/valor originales de los píxeles saturados (la tela),
dejando casi intactos fondos neutros y pieles suaves.

Requisitos: numpy y Pillow en el Python usado, y Node en el PATH.
Uso: python3 scripts/gen-color-variants.py
"""
import colorsys
import json
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "public" / "images"
OUT_DIR = ROOT / "public" / "images" / "colors"
SHOP_JS = str(ROOT / "src" / "data" / "shop.js")


def load_palette():
    code = (
        "import("
        + json.dumps(SHOP_JS)
        + ").then(m => console.log(JSON.stringify(m.PRODUCTS.map(p => ({"
        "slug: p.slug,"
        "colors: p.colors.map(c => ({ name: c.name, hex: c.hex }))"
        "}))))).catch(e => { console.error(e); process.exit(1) })"
    )
    out = subprocess.run(["node", "-e", code], check=True, capture_output=True, text=True)
    return json.loads(out.stdout)


def hex_to_hsv(hexs):
    r, g, b = tuple(int(hexs.lstrip("#")[i : i + 2], 16) / 255 for i in (0, 2, 4))
    return colorsys.rgb_to_hsv(r, g, b)


def _hsv_to_rgb_vec(h, s, v):
    """Reconstruye RGB vectorizado desde HSV en [0,1]."""
    h = np.mod(h, 1.0)
    i = np.floor(h * 6).astype(int)
    f = h * 6 - i
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    i = i % 6
    r = np.choose(i, [v, q, p, p, t, v])
    g = np.choose(i, [t, v, v, q, p, p])
    b = np.choose(i, [p, p, t, v, v, q])
    return r, g, b


def recolor(rgb_src, hexs, sat_bump=1.15):
    im = Image.open(rgb_src).convert("RGB")
    arr = np.asarray(im, dtype=np.float32) / 255.0
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    val = mx
    mask = (sat > 0.5) & (val > 0.10) & (val < 0.98)

    th, _, _ = hex_to_hsv(hexs)
    out = arr.copy()
    ts = np.minimum(1.0, sat[mask] * sat_bump)
    ch_v = val[mask]
    hr, hg, hb = _hsv_to_rgb_vec(th, ts, ch_v)
    out[..., 0][mask] = hr
    out[..., 1][mask] = hg
    out[..., 2][mask] = hb
    out = np.clip(out, 0, 1)
    return Image.fromarray((out * 255).astype(np.uint8))


def main():
    OUT_DIR.mkdir(exist_ok=True)
    referenced = set()
    for product in load_palette():
        slug = product["slug"]
        src = SRC_DIR / f"{slug}.jpg"
        if not src.exists():
            print(f"  ! sin base {src.name}")
            continue
        base_hex = product["colors"][0]["hex"].lower()
        for color in product["colors"]:
            hx = color["hex"].lower()
            if hx == base_hex:
                continue
            fname = f"{slug}-{hx.lstrip('#')}.jpg"
            referenced.add(fname)
            out = OUT_DIR / fname
            if out.exists():
                print(f"  . ya existe {fname}")
                continue
            img = recolor(src, color["hex"])
            img.save(out, "JPEG", quality=82, optimize=True, progressive=True)
            print(f"  + {fname}  ({out.stat().st_size // 1024} KB)")

    for orphan in OUT_DIR.glob("*.jpg"):
        if orphan.name not in referenced:
            orphan.unlink()
            print(f"  - borrada {orphan.name} (no referenciada)")

    print("listo ✓")


if __name__ == "__main__":
    main()