f = open('src/app/[slug]/page.tsx', 'r', encoding='utf-8')
content = f.read()
f.close()
# Remove all revalidate lines first
lines = content.split('\n')
lines = [l for l in lines if 'revalidate' not in l]
content = '\n'.join(lines)
# Add once at the top after dynamicParams
content = content.replace('export const dynamicParams = true;', 'export const dynamicParams = true;\nexport const revalidate = 3600;')
f = open('src/app/[slug]/page.tsx', 'w', encoding='utf-8')
f.write(content)
f.close()
print('Done')