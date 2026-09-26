from pathlib import Path
from PIL import Image, ImageOps
import urllib.request, re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist' / 'assets'
OUT.mkdir(parents=True, exist_ok=True)
sources = {
 'puch': r'C:\Users\bmthi\OneDrive\Desktop\Moped\Thiel Classics\Promobilder\_DSC0055.jpg',
 'puch-tank': r'C:\Users\bmthi\OneDrive\Desktop\Moped\Thiel Classics\Promobilder\_DSC0089.jpg',
 'puch-tacho': r'C:\Users\bmthi\OneDrive\Desktop\Moped\Thiel Classics\Promobilder\_DSC0092.jpg',
 'porsche-duo': r'C:\Users\bmthi\OneDrive\Desktop\Moped\Thiel Classics\Promobilder\WhatsApp Image 2024-06-21 at 16.05.42 (7).jpeg',
 'porsche-detail': r'C:\Users\bmthi\OneDrive\Desktop\Moped\Thiel Classics\Promobilder\WhatsApp Image 2024-06-21 at 16.05.43 (3).jpeg',
 'porsche-front': r'C:\Users\bmthi\OneDrive\Desktop\Moped\Thiel Classics\Porsche\A7400131.jpg',
 'lifestyle': r'C:\Users\bmthi\Downloads\A7400508.png',
 'porsche-trio': r'C:\Users\bmthi\Downloads\390320F3-91CD-4BDD-BBA9-4AE983575BC0.jpg'
}
for name, path in sources.items():
    im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    for width in (640, 1440):
        output = im.copy()
        output.thumbnail((width, width * 2))
        output.save(OUT / f'{name}-{width}.webp', 'WEBP', quality=86, method=6)
    print(name, im.size)
logo = Image.open(r'C:\Users\bmthi\OneDrive\Desktop\Moped\Thiel Classics\Logo\Logo komplett.png').convert('RGB')
mask = logo.point(lambda p: p)
# Trim only the unused white margin; the brand artwork is unchanged.
pixels = logo.load()
coords = [(x,y) for y in range(logo.height) for x in range(logo.width) if pixels[x,y][0] > 120 and pixels[x,y][1] < 100 and pixels[x,y][2] < 100]
box = (min(x for x,y in coords)-2, min(y for x,y in coords)-2, max(x for x,y in coords)+3, max(y for x,y in coords)+3)
cropped = logo.crop(box)
cropped.thumbnail((650,200),Image.Resampling.LANCZOS)
cropped.save(OUT / 'logo.webp', 'WEBP', quality=100, lossless=True)
mark = logo.crop((box[0],box[1],box[0]+box[3]-box[1],box[3]))
mark.resize((64,64),Image.Resampling.LANCZOS).save(OUT / 'favicon.png')
print('Logo crop', box)

fonts = [('display','Barlow+Condensed:wght@600;700;800'),('body','DM+Sans:wght@400;500;600;700'),('serif','Cormorant+Garamond:ital,wght@1,400;1,500')]
css = []
for name, query in fonts:
    url = f'https://fonts.googleapis.com/css2?family={query}&display=swap'
    request = urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
    source = urllib.request.urlopen(request).read().decode()
    def download(match):
        address = match.group(1)
        filename = f'{name}-{len(list(OUT.glob(name+"-font-*")))}-font.woff2'
        filename = f'{name}-font-{len(list(OUT.glob(name+"-font-*")))}.woff2'
        (OUT/filename).write_bytes(urllib.request.urlopen(address).read())
        return f'url(./{filename})'
    css.append(re.sub(r'url\((https://[^)]+)\)',download,source))
(OUT/'fonts.css').write_text('\n'.join(css),encoding='utf-8')
print('Images and local fonts ready')
