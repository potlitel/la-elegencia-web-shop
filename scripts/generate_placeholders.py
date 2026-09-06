#!/usr/bin/env python3
"""Genera imágenes placeholder para 275 productos usando Pillow."""

import json
import os
from PIL import Image, ImageDraw, ImageFont

# Colores por categoría (fondo, texto)
CATEGORY_COLORS = {
    "vestidos": ("#faf0f5", "#c2185b"),
    "blusas": ("#f0f5ff", "#1565c0"),
    "pantalones": ("#f0f5ff", "#0d47a1"),
    "faldas": ("#fdf0f5", "#ad1457"),
    "accesorios": ("#f5f0e6", "#5d4037"),
}


def hex_to_rgb(hex_color):
    """Convierte hex a RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def create_placeholder(name, category, colors, output_path, size=(600, 800)):
    """Crea una imagen placeholder para un producto."""
    bg_hex, text_hex = CATEGORY_COLORS.get(category, ("#fafafa", "#333333"))
    bg = hex_to_rgb(bg_hex)
    text_color = hex_to_rgb(text_hex)

    img = Image.new('RGB', size, bg)
    draw = ImageDraw.Draw(img)

    # Dibujar círculos de colores del producto
    if colors:
        n = len(colors)
        radius = 30
        start_x = (size[0] - (n * (radius * 2 + 10) - 10)) // 2
        for i, c in enumerate(colors[:4]):
            hex_c = c.get("hex", "#cccccc")
            rgb = hex_to_rgb(hex_c)
            x = start_x + i * (radius * 2 + 10)
            y = 120
            draw.ellipse([x, y, x + radius * 2, y + radius * 2], fill=rgb, outline=(200, 200, 200), width=2)

    # Dibujar rectángulo decorativo
    draw.rounded_rectangle(
        [size[0]//4, size[1]//3, 3*size[0]//4, 2*size[1]//3],
        radius=20,
        fill=None,
        outline=text_color,
        width=3,
    )

    # Texto del nombre (truncado si es largo)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 16)
    except:
        font = ImageFont.load_default()
        font_small = font

    # Nombre del producto
    display_name = name[:35] + "..." if len(name) > 35 else name
    bbox = draw.textbbox((0, 0), display_name, font=font)
    text_w = bbox[2] - bbox[0]
    x = (size[0] - text_w) // 2
    draw.text((x, 320), display_name, fill=text_color, font=font)

    # Texto placeholder
    placeholder = "LA ELEGANCIA"
    bbox2 = draw.textbbox((0, 0), placeholder, font=font_small)
    text_w2 = bbox2[2] - bbox2[0]
    x2 = (size[0] - text_w2) // 2
    draw.text((x2, 380), placeholder, fill=text_color, font=font_small)

    # Guardar
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "JPEG", quality=85)
    return True


def main():
    # Cargar productos generados
    with open("src/data/products.json", "r", encoding="utf-8") as f:
        products = json.load(f)

    print(f"Generando placeholders para {len(products)} productos...")

    created = 0
    errors = 0

    for product in products:
        slug = product["slug"]
        category = product["category"]
        colors = product.get("colors", [])
        name = product["name"]

        output_path = f"public/images/{slug}.jpg"

        try:
            create_placeholder(name, category, colors, output_path)
            created += 1
        except Exception as e:
            print(f"Error con {slug}: {e}")
            errors += 1

    print(f"Creados: {created} placeholders")
    if errors:
        print(f"Errores: {errors}")


if __name__ == "__main__":
    main()
