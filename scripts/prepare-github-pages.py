"""Prepare the native-anchor static site for free GitHub Pages publication."""
from pathlib import Path
import hashlib
import html
import json
import os
import re

root = Path('out')
if not (root / 'opportunities/index.html').is_file():
    raise SystemExit('GitHub Pages requires a trailing-slash static build.')
# These are Next's client-navigation payloads. All product navigation uses
# ordinary anchors, so full HTML navigation and embedded hydration stay intact.
# Stop if a future change adds client routing, rather than silently pruning it.
for parent in ('app', 'components'):
    for file in Path(parent).rglob('*.tsx'):
        source = file.read_text()
        if re.search(r'''(?:from\s*|import\s*)["']next/link["']''', source) or re.search(r'\buseRouter\b', source):
            raise SystemExit(f'Client navigation added in {file}; review Pages packaging first.')
removed = 0
removed_bytes = 0
for file in root.rglob('*.txt'):
    # Only remove known Next-generated RSC payloads, not arbitrary public text.
    if file.name == 'robots.txt' or (Path('public') / file.relative_to(root)).is_file():
        continue
    text = file.read_text()
    if not re.match(r'^(?:[0-9a-f]*:|[0-9a-f]+\[)', text):
        raise SystemExit(f'Unexpected text asset requires review: {file}')
    removed += 1
    removed_bytes += file.stat().st_size
    file.unlink()
# This is a Vercel-only routing configuration, not a public asset.
(root / 'vercel.json').unlink(missing_ok=True)
(root / '.nojekyll').touch()
# Pages cannot configure custom response headers. Keep the existing resource
# policy in each HTML document; frame-ancestors is not supported in a meta CSP.
config = json.loads(Path('hosting/static-vercel.json').read_text())
policy = next(header['value'] for group in config['headers'] for header in group['headers'] if header['key'] == 'Content-Security-Policy')
policy = '; '.join(part.strip() for part in policy.split(';') if not part.strip().startswith('frame-ancestors'))
for file in root.rglob('*.html'):
    text = file.read_text()
    if '<head>' in text and 'http-equiv="Content-Security-Policy"' not in text:
        text = text.replace('<head>', '<head><meta http-equiv="Content-Security-Policy" content="' + html.escape(policy, quote=True) + '">', 1)
        file.write_text(text)
files = [f for f in root.rglob('*') if f.is_file()]
size = sum(f.stat().st_size for f in files)
if size > 800_000_000 or any(f.stat().st_size > 90_000_000 for f in files):
    raise SystemExit('Static publication exceeds the conservative free Pages size budget.')
feed = (root / 'opportunities.json').read_bytes()
manifest = {'sourceCommit': os.environ.get('GTA_SOURCE_COMMIT', ''),
            'siteUrl': 'https://rupayon123.github.io',
            'nativeFeedSha256': hashlib.sha256(feed).hexdigest(),
            'nativeFeedRecords': len(json.loads(feed)['opportunities']),
            'publicationBytes': size, 'publicationFiles': len(files),
            'removedNavigationPayloads': removed, 'removedBytes': removed_bytes}
(root / 'hosting-release.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps(manifest))
