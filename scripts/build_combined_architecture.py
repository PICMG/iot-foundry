#!/usr/bin/env python3
"""
Build a single combined architecture page from doc/*.md and extract image1.

Behavior:
- Reads the authoritative markdown files in `doc/` in numeric order.
- Strips any reference-style data-URI image definitions (e.g. `[image2]: <data:image/png;base64,...>`).
- Writes a combined `docs/architecture/index.md` with Jekyll front-matter.
- Writes image files referenced by the data-URIs (currently extracts `image1` to `/images/image1.png`).

Run this script from the repository root.
"""
import os
import re
import base64

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOC_DIR = os.path.join(ROOT, 'doc')
OUT_MD = os.path.join(ROOT, 'docs', 'architecture', 'index.md')
IMAGES_DIR = os.path.join(ROOT, 'images')

DOC_FILES = [
    '01_INTRODUCTION.md',
    '02_GLOSSARY.md',
    '03_REFERENCE_SPECIFICATIONS.md',
    '04_USE_CASES.md',
    '05_CONNECTION_MODEL.md',
]

if not os.path.isdir(IMAGES_DIR):
    os.makedirs(IMAGES_DIR, exist_ok=True)

combined_parts = []

# regex to find reference-style image definitions with data: URIs
data_uri_re = re.compile(r'^\[image(\d+)\]:\s*<data:image/[^;]+;base64,([^>]+)>\s*$', re.IGNORECASE)

found_images = {}

for fname in DOC_FILES:
    path = os.path.join(DOC_DIR, fname)
    if not os.path.exists(path):
        print(f"Warning: missing {path}")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.read().splitlines()

    out_lines = []
    for ln in lines:
        m = data_uri_re.match(ln.strip())
        if m:
            imgnum = int(m.group(1))
            b64 = m.group(2)
            found_images[imgnum] = b64
            # skip this line (we will add a file-backed reference later)
            continue
        out_lines.append(ln)

    combined_parts.append('\n'.join(out_lines))

# Decode image1 if present (we previously extracted image2..image6)
img1_b64 = found_images.get(1)
if img1_b64:
    img1_path = os.path.join(IMAGES_DIR, 'image1.png')
    try:
        with open(img1_path, 'wb') as imgf:
            imgf.write(base64.b64decode(img1_b64))
        print(f"Wrote {img1_path}")
    except Exception as e:
        print(f"Failed to write image1: {e}")

# Build combined markdown
front_matter = (
    "---\n"
    "title: Architecture\n"
    "layout: default\n"
    "collection: architecture\n"
    "permalink: /architecture/\n"
    "---\n\n"
)

body = '\n\n---\n\n'.join(combined_parts)

# Append reference definitions for images we have (1..6) pointing to /images/
defs = []
for i in range(1, 7):
    imgpath = os.path.join(IMAGES_DIR, f'image{i}.png')
    if os.path.exists(imgpath):
        defs.append(f'[image{i}]: /images/image{i}.png')

if defs:
    body = body.rstrip() + '\n\n' + '\n'.join(defs) + '\n'

out_content = front_matter + body + '\n'

with open(OUT_MD, 'w', encoding='utf-8') as outf:
    outf.write(out_content)

print(f"Wrote combined architecture page: {OUT_MD}")
print(f"Image references written for: {', '.join(str(i) for i in range(1,7) if os.path.exists(os.path.join(IMAGES_DIR, f'image{i}.png')))}")
