"""Render public/og-image.png, the social preview card.

Run after changing the headshot, name, role or specialties:
    python3 tools/generate_og_image.py
Requires Pillow. Dev-only; the generated PNG is committed so the build needs nothing.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
HEADSHOT = ROOT / "src/assets/about/headshot.jpg"
OUT = ROOT / "public/og-image.png"

W, H = 1200, 630
BG = (7, 7, 7)
ACCENT = (255, 163, 0)
TEXT = (245, 245, 246)
MUTED = (166, 166, 173)
FAINT = (109, 109, 117)

NAME = "Sam Ehrlich"
ROLE = "Baseball Operations Analyst — Driveline Baseball"
FOCUS = "MLB Analysis  ·  Computer Vision  ·  In-Gym Support"
DOMAIN = "samehrlich.github.io"

BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

card = Image.new("RGB", (W, H), BG)

# Corner washes, matching the site background.
glow = Image.new("RGB", (W, H), BG)
gd = ImageDraw.Draw(glow)
gd.ellipse((-260, -420, 780, 300), fill=(28, 20, 6))
gd.ellipse((640, 380, 1560, 1000), fill=(6, 14, 26))
card = Image.blend(card, glow, 0.85)

draw = ImageDraw.Draw(card)

# Circular headshot.
SIZE = 260
photo = Image.open(HEADSHOT).convert("RGB")
side = min(photo.size)
photo = photo.crop(
    ((photo.width - side) // 2, (photo.height - side) // 2,
     (photo.width + side) // 2, (photo.height + side) // 2)
).resize((SIZE, SIZE), Image.LANCZOS)
mask = Image.new("L", (SIZE * 4, SIZE * 4), 0)
ImageDraw.Draw(mask).ellipse((0, 0, SIZE * 4, SIZE * 4), fill=255)
mask = mask.resize((SIZE, SIZE), Image.LANCZOS)
px, py = 96, (H - SIZE) // 2
draw.ellipse((px - 5, py - 5, px + SIZE + 5, py + SIZE + 5), outline=(52, 52, 58), width=5)
card.paste(photo, (px, py), mask)

x = px + SIZE + 72
draw.text((x, 214), NAME, font=ImageFont.truetype(BOLD, 82), fill=TEXT)
draw.text((x, 318), ROLE, font=ImageFont.truetype(REG, 30), fill=ACCENT)
draw.text((x, 366), FOCUS, font=ImageFont.truetype(REG, 27), fill=MUTED)
draw.text((x, 448), DOMAIN, font=ImageFont.truetype(REG, 24), fill=FAINT)

OUT.parent.mkdir(parents=True, exist_ok=True)
card.save(OUT, optimize=True)
print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size / 1024:.0f} KB, {W}x{H})")
