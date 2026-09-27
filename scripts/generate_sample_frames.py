#!/usr/bin/env python3
"""
TAAGA BY DISHA - Sample Artisanal Frame Generator
Generates 180 high-fashion WebP frames simulating the draping & unfurling
of a luxury handloom saree with pure zari gold borders on rust-terracotta fabric.
Ensures instant out-of-the-box local testing in Cursor / browser without external video.
"""

import os
import math
from PIL import Image, ImageDraw, ImageFont

def generate_frames(output_dir="assets/frames", total_frames=180, width=1280, height=720):
    os.makedirs(output_dir, exist_ok=True)
    print(f"[*] Generating {total_frames} luxury handloom frames ({width}x{height}) in {output_dir}...")

    # Color Palette
    rust_deep = (18, 11, 7)       # #120b07
    rust_base = (36, 22, 13)      # #24160d
    rust_warm = (123, 55, 33)     # #7b3721
    rust_clay = (179, 93, 51)     # #b35d33
    gold_zari = (201, 155, 83)    # #c99b53
    gold_sheen = (243, 223, 162)  # #f3dfa2
    teal_accent = (13, 148, 136)  # #0d9488
    cream_text = (252, 249, 245)  # #fcf9f5

    for i in range(total_frames):
        progress = i / float(total_frames - 1)  # 0.0 to 1.0

        # Create base canvas with smooth rust radial/vertical gradient
        img = Image.new("RGB", (width, height), rust_deep)
        draw = ImageDraw.Draw(img)

        # Draw soft gradient bands
        for y in range(0, height, 4):
            blend = y / float(height)
            r = int(rust_deep[0] + (rust_base[0] - rust_deep[0]) * blend)
            g = int(rust_deep[1] + (rust_base[1] - rust_deep[1]) * blend)
            b = int(rust_deep[2] + (rust_base[2] - rust_deep[2]) * blend)
            draw.rectangle([0, y, width, y + 4], fill=(r, g, b))

        # Simulate fluid handloom saree silk draping waves unfurling across screen
        # As progress advances, waves ripple and drape across the center
        wave_amplitude = 60 + 30 * math.sin(progress * math.pi)
        wave_frequency = 0.005 + 0.002 * math.cos(progress * 2 * math.pi)
        center_y = height * 0.52 - (progress - 0.5) * 80

        # Layer 1: Dark Silk Folds
        poly_points = [(0, height)]
        for x in range(0, width + 10, 10):
            fold_offset = math.sin(x * wave_frequency + progress * 8.0) * wave_amplitude
            drape_arch = math.sin(x / float(width) * math.pi) * 100 * (1.0 - progress * 0.5)
            y = center_y + fold_offset - drape_arch
            poly_points.append((x, int(y)))
        poly_points.append((width, height))
        draw.polygon(poly_points, fill=rust_warm)

        # Layer 2: Terracotta Pleats
        poly_points2 = [(0, height)]
        for x in range(0, width + 10, 10):
            fold_offset = math.sin(x * (wave_frequency * 1.3) + progress * 6.0 + 1.2) * (wave_amplitude * 0.8)
            drape_arch = math.sin(x / float(width) * math.pi) * 80 * (0.8 - progress * 0.4)
            y = center_y + 40 + fold_offset - drape_arch
            poly_points2.append((x, int(y)))
        poly_points2.append((width, height))
        draw.polygon(poly_points2, fill=rust_clay)

        # Layer 3: Shimmering Pure Zari Gold Border
        zari_points = []
        for x in range(0, width + 10, 10):
            fold_offset = math.sin(x * (wave_frequency * 1.3) + progress * 6.0 + 1.2) * (wave_amplitude * 0.8)
            drape_arch = math.sin(x / float(width) * math.pi) * 80 * (0.8 - progress * 0.4)
            y = center_y + 36 + fold_offset - drape_arch
            zari_points.append((x, int(y)))

        # Draw Zari Border Ribbons (3 strokes)
        for offset in range(-6, 7, 3):
            line_pts = [(pt[0], pt[1] + offset) for pt in zari_points]
            draw.line(line_pts, fill=gold_zari, width=2)

        # Draw delicate Jamdani floral motifs / geometric lozenges
        motif_spacing = 80
        for mx in range(60, width - 40, motif_spacing):
            # Compute position on wave
            wave_y = int(center_y + 80 + math.sin(mx * wave_frequency + progress * 7.0) * 40)
            if 0 < wave_y < height - 30:
                size = 12 + int(4 * math.sin(progress * 4.0 + mx))
                draw.polygon([
                    (mx, wave_y - size),
                    (mx + size, wave_y),
                    (mx, wave_y + size),
                    (mx - size, wave_y)
                ], outline=gold_sheen, fill=teal_accent)

        # Elegant Micro Brand Watermark & Frame Status Indicator
        padded_num = f"{i + 1:04d}"
        draw.text((40, 40), "TAAGA BY DISHA • ARTISANAL HANDLOOM ARCHIVE", fill=gold_zari)
        draw.text((40, 60), f"SEQUENCE FRAME {padded_num} / {total_frames:04d} • WEBP 30FPS SCRUB", fill=cream_text)
        
        # Subtle progress bar along bottom
        bar_w = int((width - 80) * progress)
        draw.rectangle([40, height - 20, 40 + bar_w, height - 17], fill=teal_accent)

        out_name = f"frame_{padded_num}.webp"
        out_path = os.path.join(output_dir, out_name)
        img.save(out_path, "WEBP", quality=82, method=6)

        if (i + 1) % 45 == 0 or i == total_frames - 1:
            print(f"    Rendered frame {i + 1}/{total_frames} ({((i + 1)/total_frames)*100:.1f}%)")

    print(f"[OK] Successfully generated all {total_frames} test frames in {output_dir}!")

if __name__ == "__main__":
    generate_frames()
