import os
files = ['src/app/page.tsx','src/components/Navbar.tsx','src/app/carpet-cleaning/page.tsx','src/app/upholstery/page.tsx','src/app/windows/page.tsx','src/app/tile-grout/page.tsx','src/app/hardwood/page.tsx','src/app/ez-breeze/page.tsx']
for f in files:
    if not os.path.exists(f):
        print('SKIP: ' + f)
        continue
    raw = open(f, 'rb').read()
    try:
        content = raw.decode('utf-8')
        print('OK: ' + f)
    except:
        content = raw.decode('latin-1')
        print('FIXED: ' + f)
    open(f, 'w', encoding='utf-8').write(content)
print('Done')