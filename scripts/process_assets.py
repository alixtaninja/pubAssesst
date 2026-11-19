#!/usr/bin/env python3
"""
Post-processes generated JPEG game art into Unity-ready 32-bit RGBA PNGs.
- Removes pure white background via corner floodfill + edge anti-halo cleanup
- Supports hollow-center floodfill (for MocTinhHp2Overlay)
- Trims & resizes with Lanczos to exact target dimensions with 86-88% safe margin
- Verifies 4-corner alpha == 0 and writes PNG32 to Assets/Resources/Art/ and public/art/
"""
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path("/app/applet")
SRC_DIR = ROOT / "src/assets/images"
UNITY_ART_DIR = ROOT / "Assets/Resources/Art"
PUBLIC_ART_DIR = ROOT / "public/art"

# Specification matching AI_ART_ASSET_GENERATION_GUIDE_VI.md
ASSET_SPECS = [
    # Part A: 6 Basic Tiles (256x256)
    {"id": "LuaVang", "prefix": "tile_lua_vang_", "rel": "Tiles/LuaVang.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "SenHong", "prefix": "tile_sen_hong_", "rel": "Tiles/SenHong.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "TrongDong", "prefix": "tile_trong_dong_", "rel": "Tiles/TrongDong.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "ChimHac", "prefix": "tile_chim_hac_", "rel": "Tiles/ChimHac.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "SungTrau", "prefix": "tile_sung_trau_", "rel": "Tiles/SungTrau.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "NonLa", "prefix": "tile_non_la_", "rel": "Tiles/NonLa.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},

    # Part B: 7 Special Gems (256x256) — v3 slender 4-gem frames with frame-breaking silhouettes
    {"id": "DragonSeal", "prefix": "gem_dragon_seal_", "rel": "Gems/DragonSeal.png", "w": 256, "h": 256, "fill": 0.88, "fuzz": 14, "fine_edge": True},
    {"id": "FairyLotus", "prefix": "gem_fairy_lotus_", "rel": "Gems/FairyLotus.png", "w": 256, "h": 256, "fill": 0.88, "fuzz": 14, "fine_edge": True},
    {"id": "IronBamboo", "prefix": "gem_iron_bamboo_", "rel": "Gems/IronBamboo.png", "w": 256, "h": 256, "fill": 0.88, "fuzz": 14, "fine_edge": True},
    {"id": "MagicStaff", "prefix": "gem_magic_staff_", "rel": "Gems/MagicStaff.png", "w": 256, "h": 256, "fill": 0.88, "fuzz": 14, "fine_edge": True},
    {"id": "MountainJade", "prefix": "gem_mountain_jade_", "rel": "Gems/MountainJade.png", "w": 256, "h": 256, "fill": 0.88, "fuzz": 14, "fine_edge": True},
    {"id": "IncenseOffering", "prefix": "gem_incense_offering_", "rel": "Gems/IncenseOffering.png", "w": 256, "h": 256, "fill": 0.88, "fuzz": 14, "fine_edge": True},
    {"id": "DivineCrossbow", "prefix": "gem_divine_crossbow_", "rel": "Gems/DivineCrossbow.png", "w": 256, "h": 256, "fill": 0.88, "fuzz": 14, "fine_edge": True},

    # Part C: 6 Hero Portraits (256x256)
    {"id": "Hero_LacLongQuan", "prefix": "hero_lac_long_quan_", "rel": "Portraits/Hero_LacLongQuan.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Hero_AuCo", "prefix": "hero_au_co_", "rel": "Portraits/Hero_AuCo.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Hero_ThanKimQuy", "prefix": "hero_than_kim_quy_", "rel": "Portraits/Hero_ThanKimQuy.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Hero_ThanhGiong", "prefix": "hero_thanh_giong_", "rel": "Portraits/Hero_ThanhGiong.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Hero_ChuDongTu", "prefix": "hero_chu_dong_tu_", "rel": "Portraits/Hero_ChuDongTu.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Hero_SonTinh", "prefix": "hero_son_tinh_", "rel": "Portraits/Hero_SonTinh.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},

    # Part D: 7 Enemy Portraits + 1 HP2 Overlay (256x256)
    {"id": "Enemy_NguTinhRock", "prefix": "enemy_ngu_tinh_", "rel": "Portraits/Enemy_NguTinhRock.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Enemy_HoTinhFog", "prefix": "enemy_ho_tinh_", "rel": "Portraits/Enemy_HoTinhFog.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Enemy_MocTinhRoot", "prefix": "enemy_moc_tinh_", "rel": "Portraits/Enemy_MocTinhRoot.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Enemy_BachKeSpirit", "prefix": "enemy_bach_ke_", "rel": "Portraits/Enemy_BachKeSpirit.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Enemy_TrieuDaSoldier", "prefix": "enemy_trieu_da_", "rel": "Portraits/Enemy_TrieuDaSoldier.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Enemy_GiacAnSoldier", "prefix": "enemy_giac_an_", "rel": "Portraits/Enemy_GiacAnSoldier.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15},
    {"id": "Enemy_AncientSeal", "prefix": "enemy_ancient_seal_", "rel": "Portraits/Enemy_AncientSeal.png", "w": 256, "h": 256, "fill": 0.87, "fuzz": 15, "pre_pipeline": "enemy_ancient_seal_daylight"},
    {"id": "MocTinhHp2Overlay", "prefix": "board_hp2_overlay_", "rel": "Board/MocTinhHp2Overlay.png", "w": 256, "h": 256, "fill": 0.90, "fuzz": 14, "hollow_center": True, "remove_white_pockets": True},

    # Part E: Environment & Board
    {
        "id": "DrumMandala",
        "prefix": "env_drum_mandala_",
        "rel": "Environment/DrumMandala.png",
        "w": 512,
        "h": 512,
        "fill": 0.90,
        "fuzz": 15,
        # Issue #1: Low-contrast pale antique gold & muted jade patina backdrop
        "pre_pipeline": "drum_mandala_low_contrast",
    },
    {
        "id": "PlayableCellPlate",
        "prefix": "board_cell_plate_",
        "rel": "Board/PlayableCellPlate.png",
        "w": 256,
        "h": 256,
        "fill": 0.90,
        "fuzz": 15,
        # Issue #1: Warm neutral mahogany-umber lacquer interior (#4A2C22), 87.5%-92% occupancy
        "pre_pipeline": "cell_plate_mahogany",
    },
    {
        "id": "ClusterRotateNode",
        "prefix": "board_rotate_node_",
        "rel": "Board/ClusterRotateNode.png",
        "w": 128,
        "h": 128,
        "fill": 0.86,
        "fuzz": 15,
        # Issue #1: Warm sunlit antique bronze (#D8A24A) matching Hero_LacLongQuan
        "pre_pipeline": "rotate_node_sunlit_bronze",
    },
    {"id": "MountainPillar", "prefix": "env_mountain_pillar_", "rel": "Environment/MountainPillar.png", "w": 256, "h": 384, "fill": 0.90, "fuzz": 15},
    {"id": "FloodWaveOverlay", "prefix": "env_flood_wave_", "rel": "Environment/FloodWaveOverlay.png", "w": 256, "h": 256, "fill": 0.88, "fuzz": 15},
    {"id": "CraneEmblem", "prefix": "env_crane_emblem_", "rel": "Environment/CraneEmblem.png", "w": 256, "h": 256, "fill": 0.86, "fuzz": 15},
    {"id": "BuffaloEmblem", "prefix": "env_buffalo_emblem_", "rel": "Environment/BuffaloEmblem.png", "w": 256, "h": 256, "fill": 0.86, "fuzz": 15},
]


def find_latest_source(prefix: str) -> Path | None:
    def ts_key(p: Path) -> tuple[int, str]:
        tail = p.stem.rsplit("_", 1)[-1]
        return (int(tail) if tail.isdigit() else 0, p.name)

    matches = sorted(SRC_DIR.glob(f"{prefix}*.jpg"), key=ts_key)
    return matches[-1] if matches else None


def get_image_size(path: Path) -> tuple[int, int]:
    out = subprocess.check_output(["identify", "-format", "%w %h", str(path)], text=True).strip()
    w, h = out.split()
    return int(w), int(h)


def check_rgba_and_corners(path: Path, check_hollow: bool = False) -> dict:
    w, h = get_image_size(path)
    # Inspect alpha of 4 corners and center
    pts = [
        (0, 0),
        (w - 1, 0),
        (0, h - 1),
        (w - 1, h - 1),
        (w // 2, h // 2),
    ]
    fmt_parts = []
    for x, y in pts:
        fmt_parts.append(f"%[pixel:p{{{x},{y}}}]")
    out = subprocess.check_output(
        ["identify", "-format", "|".join(fmt_parts), str(path)],
        text=True,
    ).strip()
    pixels = out.split("|")
    corner_alphas = []
    for p in pixels[:4]:
        # ImageMagick returns e.g. srgba(0,0,0,0) or none
        is_transparent = p == "none" or p.endswith(",0)")
        corner_alphas.append(is_transparent)
    center_pixel = pixels[4]
    center_transparent = center_pixel == "none" or center_pixel.endswith(",0)")

    # Check bounding box occupancy using trim format
    trim_info = subprocess.check_output(
        ["convert", str(path), "-format", "%@ %w %h", "info:"],
        text=True,
    ).strip()
    # %@ gives WxH+X+Y
    bbox_part = trim_info.split()[0]
    bw_bh = bbox_part.split("+")[0]
    bw, bh = [int(v) for v in bw_bh.split("x")]
    metrics = {
        "width": w,
        "height": h,
        "cornersTransparent": all(corner_alphas),
        "centerTransparent": center_transparent,
        "bboxWidth": bw,
        "bboxHeight": bh,
        "occupancyPct": round(max(bw / w, bh / h) * 100, 1),
        "bytes": path.stat().st_size,
    }
    if check_hollow and center_transparent:
        # Measure contiguous horizontal & vertical transparent span passing through image center
        row_out = subprocess.check_output(
            ["convert", str(path), "-crop", f"{w}x1+0+{h // 2}", "+repage", "-alpha", "extract", "-threshold", "10%", "txt:-"],
            text=True,
        )
        transparent_xs = []
        for line in row_out.splitlines()[1:]:
            if "black" in line or "gray(0)" in line or "#000000" in line:
                coord = line.split(":")[0]
                x_val = int(coord.split(",")[0])
                transparent_xs.append(x_val)
        # Find contiguous segment around w//2
        left = w // 2
        right = w // 2
        tset = set(transparent_xs)
        while left - 1 in tset:
            left -= 1
        while right + 1 in tset:
            right += 1
        hollow_px = right - left + 1
        metrics["hollowWidthPx"] = hollow_px
        metrics["hollowPct"] = round(hollow_px / w * 100, 1)
    return metrics


def apply_pre_pipeline(src: Path, pipeline: str, tmp_dir: Path) -> Path:
    out = tmp_dir / f"{pipeline}_{src.name}"
    if pipeline == "cell_plate_mahogany":
        # Replace cool grey recessed center socket with warm mahogany-umber lacquer (#4A2C22)
        cmd = [
            "convert", str(src),
            "(", "-clone", "0", "-fill", "#5A3022", "-colorize", "65%", ")",
            "(", "-clone", "0", "-fuzz", "14%", "-fill", "white", "+opaque", "rgb(55,61,66)",
            "-fill", "black", "-opaque", "rgb(55,61,66)", "-negate", "-blur", "0x6", ")",
            "-composite", str(out),
        ]
    elif pipeline == "drum_mandala_low_contrast":
        cmd = [
            "convert", str(src),
            "+level", "26%,94%",
            "-modulate", "118,80,104",
            "(", "+clone", "-fill", "#C4B88A", "-colorize", "20%", ")",
            "-compose", "blend", "-define", "compose:args=35",
            "-composite", str(out),
        ]
    elif pipeline == "rotate_node_sunlit_bronze":
        cmd = [
            "convert", str(src),
            "+level", "5%,96%",
            "-modulate", "120,118,103",
            str(out),
        ]
    elif pipeline == "enemy_ancient_seal_daylight":
        # Gentle daylight lift for #F4E6CA paper backdrop while preserving crisp white outer bg
        cmd = [
            "convert", str(src),
            "-modulate", "112,106,100",
            str(out),
        ]
    else:
        return src
    subprocess.run(cmd, check=True)
    return out


def process_one(spec: dict) -> dict | None:
    import tempfile

    src = find_latest_source(spec["prefix"])
    if not src:
        print(f"MISSING source for {spec['id']} ({spec['prefix']}*)")
        return None

    unity_out = UNITY_ART_DIR / spec["rel"]
    public_out = PUBLIC_ART_DIR / spec["rel"]
    unity_out.parent.mkdir(parents=True, exist_ok=True)
    public_out.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmp:
        work_src = src
        if spec.get("pre_pipeline"):
            work_src = apply_pre_pipeline(src, spec["pre_pipeline"], Path(tmp))

        sw, sh = get_image_size(work_src)
        target_w, target_h = spec["w"], spec["h"]
        inner_w = round(target_w * spec["fill"])
        inner_h = round(target_h * spec["fill"])
        fuzz = spec.get("fuzz", 15)

        cmd = [
            "convert",
            str(work_src),
        ]
        if spec.get("interior_fill"):
            fill_color, seed_pts = spec["interior_fill"]
            cmd.extend(["-fuzz", "4%", "-fill", fill_color])
            for sx, sy in seed_pts:
                cmd.extend(["-draw", f"color {sx},{sy} floodfill"])
        if spec.get("modulate"):
            cmd.extend(["-modulate", spec["modulate"]])

        cmd.extend([
            "-alpha", "set",
            "-bordercolor", "white",
            "-border", "2x2",
            "-fuzz", f"{fuzz}%",
            "-fill", "none",
            "-draw", "color 0,0 floodfill",
        ])
        if spec.get("hollow_center"):
            cx, cy = (sw + 4) // 2, (sh + 4) // 2
            cmd.extend(["-draw", f"color {cx},{cy} floodfill"])

        if spec.get("remove_white_pockets"):
            flooded = Path(tmp) / "flooded.png"
            keep_mask = Path(tmp) / "keep_mask.png"
            clean_src = Path(tmp) / "clean_src.png"
            subprocess.run(cmd + ["-shave", "2x2", f"PNG32:{flooded}"], check=True)
            # Keep artwork pixels; erase low-saturation studio white trapped inside braided vine/chain loops
            subprocess.run(
                [
                    "convert", str(work_src),
                    "-colorspace", "sRGB",
                    "-fx", "(r>0.86 && g>0.86 && b>0.86 && (max(r,max(g,b))-min(r,min(g,b)))<0.13) ? 0 : 1",
                    "-colorspace", "Gray",
                    f"PNG8:{keep_mask}",
                ],
                check=True,
            )
            subprocess.run(
                [
                    "convert", str(flooded),
                    "(", "-clone", "0", "-alpha", "extract", str(keep_mask), "-compose", "Multiply", "-composite", ")",
                    "-alpha", "off", "-compose", "CopyOpacity", "-composite",
                    f"PNG32:{clean_src}",
                ],
                check=True,
            )
            cmd = ["convert", str(clean_src)]
        else:
            cmd.extend(["-shave", "2x2"])

        erode_disk = "Disk:1" if (spec.get("remove_white_pockets") or spec.get("fine_edge")) else "Disk:2"
        # Clean anti-alias & soft drop-shadow fringe at 1024px before 4x Lanczos downsampling
        cmd.extend([
            "-channel", "A",
            "-morphology", "Erode", erode_disk,
            "-blur", "0x0.6",
            "-level", "20%,92%",
            "+channel",
            "-trim", "+repage",
            "-filter", "Lanczos",
            "-resize", f"{inner_w}x{inner_h}",
            "-gravity", "center",
            "-background", "none",
            "-extent", f"{target_w}x{target_h}",
            f"PNG32:{unity_out}",
        ])

        subprocess.run(cmd, check=True)
    subprocess.run(["cp", str(unity_out), str(public_out)], check=True)

    metrics = check_rgba_and_corners(unity_out, check_hollow=bool(spec.get("hollow_center")))
    extra = f" hollow={metrics['hollowWidthPx']}px({metrics['hollowPct']}%)" if "hollowWidthPx" in metrics else ""
    print(f"OK {spec['id']:22s} -> {spec['rel']:36s} {metrics['width']}x{metrics['height']} corners_alpha0={metrics['cornersTransparent']} occ={metrics['occupancyPct']}%{extra}")
    return {
        "id": spec["id"],
        "relPath": spec["rel"],
        "unityPath": f"Assets/Resources/Art/{spec['rel']}",
        "publicUrl": f"/art/{spec['rel']}",
        "rawUrl": f"/src/assets/images/{src.name}",
        **metrics,
    }


def main():
    import zipfile

    results = []
    for spec in ASSET_SPECS:
        res = process_one(spec)
        if res:
            if spec.get("hollow_center") and not res["centerTransparent"]:
                print(f"WARNING: {spec['id']} center is NOT transparent!")
            results.append(res)

    manifest_path = PUBLIC_ART_DIR / "manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(results, indent=2, ensure_ascii=False))

    zip_path = PUBLIC_ART_DIR / "LacHong_Unity_ArtAssets.zip"
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for res in results:
            file_on_disk = UNITY_ART_DIR / res["relPath"]
            arcname = f"Assets/Resources/Art/{res['relPath']}"
            zf.write(file_on_disk, arcname)

    print(f"\nProcessed {len(results)} / {len(ASSET_SPECS)} assets.")
    print(f"ZIP archive written to {zip_path} ({zip_path.stat().st_size} bytes).")


if __name__ == "__main__":
    main()
