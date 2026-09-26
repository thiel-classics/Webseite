from pathlib import Path
from urllib.request import urlopen
root=Path(__file__).resolve().parents[1]/'dist'/'assets'
for name in ['barlowcondensed','dmsans','cormorantgaramond']:
    source=f'https://raw.githubusercontent.com/google/fonts/main/ofl/{name}/OFL.txt'
    (root/f'{name}-LICENSE.txt').write_bytes(urlopen(source).read())
    print(f'License saved: {name}')
