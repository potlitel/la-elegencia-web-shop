#!/usr/bin/env python3
"""Descarga imágenes reales de Unsplash con concurrencia."""

import json
import os
import time
import urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = ROOT / "src" / "data" / "products.json"
IMAGES_DIR = ROOT / "public" / "images"

# IDs de fotos de Unsplash verificadas
PHOTO_IDS = {
    "vestidos": [
        "1595777457583-95e059d581b8", "1572804013309-59a88b7e92f1",
        "1515886657613-9f3515b0c78f", "1496747611176-843222e1e57c",
        "1539008835657-cc04580670ab", "1518622358385-8ca74249e6e6",
        "1469334031218-e382a71b716b", "1529139574466-a303027c1d8b",
        "1517841905240-472988babdf9", "1487222477894-8943e31ef7b2",
        "1544005313-94ddf0286df2", "1534528741775-53994a69daeb",
        "1524504388940-b1c1722653e1", "1509631179647-0177331693ae",
        "1492707892479-7bc8d5a4ee93", "1531746020798-e6953c6e8e04",
    ],
    "blusas": [
        "1564257631407-4deb1f99d992", "1485462537746-965f33f7f6a7",
        "1489987707025-afc232f7ea0f", "1503342217505-b0a15ec3261c",
        "1562157873-818bc0726f68", "1487222477894-8943e31ef7b2",
        "1490481651871-ab68de25d43d", "1512436991641-6745cdb1723f",
        "1469334031218-e382a71b716b", "1558618666-fcd25c85f82e",
        "1502716119321-85f1b6b3b377", "1526047932273-341f2a7631f9",
        "1509631179647-0177331693ae", "1492707892479-7bc8d5a4ee93",
        "1531746020798-e6953c6e8e04", "1515886657613-9f3515b0c78f",
    ],
    "pantalones": [
        "1542272604-787c3835535d", "1594633312681-425c7b97ccd1",
        "1506629082955-511b1aa562c8", "1584370848010-d7fe6bc767ec",
        "1541099649105-f69ad21f3246", "1578587018452-892bacefd9f2",
        "1473966968600-fa801b869a1a", "1507680434567-5739c80be1ac",
        "1582552938357-32b906df40cb", "1591195853828-11db59a44f6b",
    ],
    "faldas": [
        "1583496661160-fb5886a0aaaa", "1594633312681-425c7b97ccd1",
        "1506629082955-511b1aa562c8", "1584370848010-d7fe6bc767ec",
        "1541099649105-f69ad21f3246", "1578587018452-892bacefd9f2",
        "1473966968600-fa801b869a1a", "1507680434567-5739c80be1ac",
        "1582552938357-32b906df40cb", "1591195853828-11db59a44f6b",
    ],
    "accesorios": [
        "1584917865442-de89df76afd3", "1535632066927-ab7c9ab60908",
        "1511499767150-a48a237f0083", "1524592094714-0f0654e20314",
        "1601924994988-5b69d4e63f2c", "1576566588028-4147f3842f27",
        "1573408301185-9146fe634ad0", "1599643478518-a784e5dc4c8f",
        "1548036328-c9fa89d128fa", "1611085583191-a3b181a88401",
    ],
}


def download_one(args):
    """Descarga una imagen."""
    slug, photo_id, output_path = args
    url = f"https://images.unsplash.com/photo-{photo_id}?w=600&h=800&fit=crop&auto=format&q=80"
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        })
        with urllib.request.urlopen(req, timeout=10) as r:
            data = r.read()
            if len(data) < 5000:
                return (slug, False, 0)
            with open(output_path, "wb") as f:
                f.write(data)
            return (slug, True, len(data) // 1024)
    except Exception as e:
        return (slug, False, 0)


def main():
    with open(PRODUCTS_JSON, "r", encoding="utf-8") as f:
        products = json.load(f)
    
    # Preparar tareas (solo placeholders < 25KB)
    tasks = []
    category_idx = {cat: 0 for cat in PHOTO_IDS}
    
    for product in products:
        slug = product["slug"]
        category = product["category"]
        output_path = IMAGES_DIR / f"{slug}.jpg"
        
        # Solo descargar si es placeholder pequeño
        if output_path.exists() and output_path.stat().st_size > 25000:
            continue
        
        photos = PHOTO_IDS.get(category, PHOTO_IDS["vestidos"])
        idx = category_idx[category] % len(photos)
        photo_id = photos[idx]
        category_idx[category] += 1
        
        tasks.append((slug, photo_id, str(output_path)))
    
    print(f"Descargando {len(tasks)} imágenes reales con 5 hilos...\n")
    
    downloaded = 0
    errors = 0
    
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(download_one, t): t for t in tasks}
        for i, future in enumerate(as_completed(futures)):
            slug, ok, size_kb = future.result()
            if ok:
                downloaded += 1
                print(f"[{i+1}/{len(tasks)}] {slug} ✓ ({size_kb} KB)")
            else:
                errors += 1
                print(f"[{i+1}/{len(tasks)}] {slug} ✗")
    
    print(f"\n{'='*50}")
    print(f"Descargados: {downloaded}")
    print(f"Errores: {errors}")
    print(f"Total tareas: {len(tasks)}")


if __name__ == "__main__":
    main()
