#!/usr/bin/env python3
"""Compose a 1200×630 UNITEL × CEU share card: orange field, white badge, exact type."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
SCALE = 2
SW, SH = W * SCALE, H * SCALE

ORANGE = (255, 107, 0, 255)
ORANGE_DEEP = (232, 93, 0, 255)
NAVY = (14, 26, 56, 255)
INK_SOFT = (58, 69, 99, 255)
WHITE = (255, 255, 255, 255)

TITLE = "UNITEL × CEU"
SUBTITLE = "Parceria estratégica"

FONT_XBOLD = Path("/workspace/.grok/Outfit-ExtraBold.ttf")
FONT_MED = Path("/workspace/.grok/Outfit-Medium.ttf")
OUT = Path("/workspace/.grok/og-raw.png")


def tracked_width(font: ImageFont.FreeTypeFont, text: str, tracking: float) -> float:
    if not text:
        return 0.0
    return sum(font.getlength(ch) for ch in text) + tracking * (len(text) - 1)


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    text: str,
    y: float,
    font: ImageFont.FreeTypeFont,
    fill,
    tracking: float,
    canvas_w: int,
) -> None:
    total = tracked_width(font, text, tracking)
    x = (canvas_w - total) / 2
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + tracking


def draw_u_mark(draw: ImageDraw.ImageDraw, cx: float, top: float, h: float, stroke: float, fill) -> None:
    """Stroke-U matching the favicon geometry, centered on cx."""
    w = h * 0.72
    x0 = cx - w / 2
    x1 = cx + w / 2
    y0 = top
    y1 = top + h
    r = w / 2
    draw.line([(x0, y0), (x0, y1 - r)], fill=fill, width=int(stroke), joint="curve")
    draw.line([(x1, y0), (x1, y1 - r)], fill=fill, width=int(stroke), joint="curve")
    bbox = [x0, y1 - 2 * r, x1, y1]
    draw.arc(bbox, start=0, end=180, fill=fill, width=int(stroke))


def paint_field(img: Image.Image) -> None:
    """Bold Unitel orange with a soft deepen and faint broadcast arcs."""
    draw = ImageDraw.Draw(img)
    # Vertical wash: still clearly #FF6B00, slightly deeper at the foot.
    for y in range(SH):
        t = y / max(SH - 1, 1)
        r = int(255 + (214 - 255) * t * 0.28)
        g = int(107 + (72 - 107) * t * 0.28)
        b = int(0)
        draw.line([(0, y), (SW, y)], fill=(r, g, b, 255))

    wash = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    wd = ImageDraw.Draw(wash)
    max_r = int(math.hypot(SW, SH) * 0.72)
    ox, oy = SW * 0.5, SH * 1.18
    for rad in range(max_r, 0, -22):
        t = rad / max_r
        a = int(36 * (1 - t) ** 1.4)
        wd.ellipse([ox - rad, oy - rad, ox + rad, oy + rad], fill=(160, 48, 0, a))
    img.alpha_composite(wash.filter(ImageFilter.GaussianBlur(28)))

    # Concentric signal arcs — UNITEL as a carrier, quiet poster geometry.
    arcs = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    ad = ImageDraw.Draw(arcs)
    ax, ay = SW * 0.08, SH * 0.92
    for radius, alpha, width in (
        (280, 42, 7),
        (430, 32, 6),
        (580, 24, 5),
        (730, 16, 4),
    ):
        bbox = [ax - radius, ay - radius, ax + radius, ay + radius]
        ad.arc(bbox, start=268, end=352, fill=(255, 255, 255, alpha), width=width * SCALE)
    img.alpha_composite(arcs)

    # Opposite corner, quieter.
    arcs2 = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    ad2 = ImageDraw.Draw(arcs2)
    bx, by = SW * 0.96, SH * 0.08
    for radius, alpha, width in (
        (220, 28, 5),
        (340, 18, 4),
        (460, 12, 3),
    ):
        bbox = [bx - radius, by - radius, bx + radius, by + radius]
        ad2.arc(bbox, start=88, end=172, fill=(255, 255, 255, alpha), width=width * SCALE)
    img.alpha_composite(arcs2)

    # Inset poster frame + crop marks — generous margin survives the 3% cover-crop.
    frame = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    fd = ImageDraw.Draw(frame)
    m = 40 * SCALE
    fd.rounded_rectangle(
        [m, m, SW - m - 1, SH - m - 1],
        radius=18 * SCALE,
        outline=(255, 255, 255, 70),
        width=2 * SCALE,
    )
    arm = 22 * SCALE
    inset = 28 * SCALE
    thick = 2 * SCALE
    for cx, cy, sx, sy in (
        (inset, inset, 1, 1),
        (SW - inset, inset, -1, 1),
        (inset, SH - inset, 1, -1),
        (SW - inset, SH - inset, -1, -1),
    ):
        fd.line([(cx, cy), (cx + sx * arm, cy)], fill=WHITE, width=thick)
        fd.line([(cx, cy), (cx, cy + sy * arm)], fill=WHITE, width=thick)
    img.alpha_composite(frame)


def paint_badge(img: Image.Image) -> None:
    font_title = ImageFont.truetype(str(FONT_XBOLD), 92 * SCALE)
    font_sub = ImageFont.truetype(str(FONT_MED), 26 * SCALE)

    title_tracking = 1.6 * SCALE
    sub_tracking = 4.8 * SCALE
    title_w = tracked_width(font_title, TITLE, title_tracking)
    sub_w = tracked_width(font_sub, SUBTITLE, sub_tracking)

    u_h = 44 * SCALE
    u_stroke = 8 * SCALE
    gap_u = 26 * SCALE
    title_h = 92 * SCALE
    gap_rule = 22 * SCALE
    rule_h = 3 * SCALE
    gap_sub = 20 * SCALE
    sub_h = 26 * SCALE

    pad_x = 88 * SCALE
    pad_top = 56 * SCALE
    pad_bot = 52 * SCALE
    inner_w = max(title_w, sub_w)
    badge_w = inner_w + pad_x * 2
    block_h = u_h + gap_u + title_h + gap_rule + rule_h + gap_sub + sub_h
    badge_h = pad_top + block_h + pad_bot
    radius = 44 * SCALE

    bx = (SW - badge_w) / 2
    by = (SH - badge_h) / 2 - 4 * SCALE  # optical lift

    # Soft navy-tinted drop shadow
    shadow = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    lift = 10 * SCALE
    sd.rounded_rectangle(
        [bx, by + lift, bx + badge_w, by + badge_h + lift],
        radius=radius,
        fill=(14, 26, 56, 70),
    )
    img.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(28)))

    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle(
        [bx, by, bx + badge_w, by + badge_h],
        radius=radius,
        fill=WHITE,
    )

    # Hairline orange edge so the badge sits in the field, not floating as a sticker.
    draw.rounded_rectangle(
        [bx, by, bx + badge_w - 1, by + badge_h - 1],
        radius=radius,
        outline=(255, 107, 0, 38),
        width=2 * SCALE,
    )

    cx = SW / 2
    y = by + pad_top
    draw_u_mark(draw, cx, y, u_h, u_stroke, ORANGE)

    y += u_h + gap_u
    draw_tracked(draw, TITLE, y, font_title, NAVY, title_tracking, SW)

    y += title_h + gap_rule
    rule_w = 56 * SCALE
    draw.line(
        [(cx - rule_w, y), (cx + rule_w, y)],
        fill=ORANGE,
        width=int(rule_h),
    )

    y += rule_h + gap_sub
    draw_tracked(draw, SUBTITLE, y, font_sub, INK_SOFT, sub_tracking, SW)


def main() -> None:
    img = Image.new("RGBA", (SW, SH), ORANGE)
    paint_field(img)
    paint_badge(img)
    out = img.resize((W, H), Image.Resampling.LANCZOS).convert("RGB")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(OUT, "PNG")
    print(f"wrote {OUT} {out.size}")


if __name__ == "__main__":
    main()
