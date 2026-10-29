"""Create display copies without modifying or removing photographic originals."""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
photos = json.loads((ROOT / "photos.json").read_text())
report = []
for photo in photos:
    source = DIST / photo["file"]
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        sizes = {}
        for edge, quality in ((960, 80), (1920, 86)):
            destination = DIST / "assets" / "previews" / f"{photo['id']}-{edge}.webp"
            destination.parent.mkdir(parents=True, exist_ok=True)
            preview = image.copy()
            preview.thumbnail((edge, edge), Image.Resampling.LANCZOS)
            preview.save(destination, "WEBP", quality=quality, method=5, icc_profile=original.info.get("icc_profile", b""))
            sizes[str(edge)] = destination.stat().st_size
        report.append({"id": photo["id"], "original": source.stat().st_size, **sizes})
(ROOT / "preview-audit.json").write_text(json.dumps(report, indent=2))
print(f"Generated {len(report) * 2} previews for {len(report)} originals.")
print(f"1920px previews: {sum(p['1920'] for p in report):,} bytes; originals: {sum(p['original'] for p in report):,} bytes")
