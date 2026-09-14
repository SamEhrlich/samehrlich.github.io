"""Build the publishable resume from the private one.

src/assets/about/resume.pdf is the real resume and is gitignored. This produces
src/assets/about/resume_public.pdf, which is what the site ships, by removing two
things that should not be on a public page:

  1. the home address and phone number from the contact line
  2. the Driveline SharePoint link on "Swing Path Optimization", whose URL carries a
     sharing token that would grant anyone who opens the PDF access to the file

Both are real redactions, so the content leaves the PDF's content stream rather than
being covered over. Re-run this after any edit to resume.pdf.

    ~/.claude/skills/pdf-redesign/.venv/bin/python tools/make_public_resume.py
"""

import re
import sys

import fitz

SRC = "src/assets/about/resume.pdf"
DST = "src/assets/about/resume_public.pdf"

PAGE_WIDTH = 612.0
LINK_BLUE = (0x11 / 255, 0x5A / 255, 0xCC / 255)

# The contact line: everything left of the email goes, the rest is redrawn centred.
CONTACT_RECT = fitz.Rect(100, 35, 512, 51)
CONTACT_BASELINE = 47.46
CONTACT_SIZE = 11.0
CONTACT_PARTS = [
    ("sehrlich98@gmail.com", 291.02, "mailto:sehrlich98@gmail.com"),
    ("X", 405.85, "https://x.com/SamEhrlich"),
    ("LinkedIn", 426.00, "https://www.linkedin.com/in/samuel-ehrlich-5a24351a3/"),
    ("Github", 478.51, "https://github.com/SamEhrlich"),
]
CONTACT_SHIFT = (PAGE_WIDTH / 2 - (509.10 - 291.02) / 2) - 291.02

# The SharePoint-linked bullet. The whole line is redrawn, not just the linked phrase:
# reinserted text lands at the end of the content stream, so redrawing only the phrase
# would split the sentence apart under text extraction.
SWING_RECT = fitz.Rect(96, 132.5, 571, 145.5)
# Straight apostrophe: the base-14 Times face has no U+2019 and substitutes a middot.
SWING_TEXT = (
    "Swing Path Optimization identifying the optimal Power vs Contact tradeoff of a "
    "batter's swing using a pareto frontier"
)
SWING_ORIGIN = (97.2, 142.5)
SWING_SIZE = 10.0

doc = fitz.open(SRC)
page = doc[0]

for link in list(page.get_links()):
    uri = link.get("uri") or ""
    if link["from"].y0 < 52 or "sharepoint" in uri:
        page.delete_link(link)

page.add_redact_annot(CONTACT_RECT)
page.add_redact_annot(SWING_RECT)
# Line art too, so the blue underlines under the removed links go with the text.
page.apply_redactions(graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_TOUCHED)

for text, x0, uri in CONTACT_PARTS:
    x = x0 + CONTACT_SHIFT
    width = fitz.get_text_length(text, fontname="tiro", fontsize=CONTACT_SIZE)
    page.insert_text((x, CONTACT_BASELINE), text, fontname="tiro", fontsize=CONTACT_SIZE, color=LINK_BLUE)
    page.draw_line((x, CONTACT_BASELINE + 1.4), (x + width, CONTACT_BASELINE + 1.4), color=LINK_BLUE, width=0.6)
    page.insert_link({"kind": fitz.LINK_URI, "from": fitz.Rect(x, 36.9, x + width, 50.1), "uri": uri})

page.insert_text(SWING_ORIGIN, SWING_TEXT, fontname="tiro", fontsize=SWING_SIZE, color=(0, 0, 0))

doc.save(DST, garbage=4, deflate=True)
doc.close()

# Verify the saved file rather than trusting the in-memory object.
out = fitz.open(DST)
text = out[0].get_text()
uris = [link.get("uri") or "" for link in out[0].get_links()]
failures = []
if re.search(r"\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}", text):
    failures.append("phone number still present")
if "Northbrook" in text or "60062" in text:
    failures.append("home address still present")
if any("sharepoint" in u.lower() for u in uris):
    failures.append("sharepoint link still present")
if SWING_TEXT not in text:
    failures.append(f"{SWING_TEXT!r} was removed instead of redrawn")
for part, _, uri in CONTACT_PARTS:
    if uri not in uris:
        failures.append(f"lost the {part} link")
if failures:
    sys.exit("FAILED: " + "; ".join(failures))
print(f"wrote {DST}: {len(uris)} links, no address, no phone, no sharepoint link")
