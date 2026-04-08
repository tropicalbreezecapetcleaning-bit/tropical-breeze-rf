with open('amplify.yml', 'r') as f:
    content = f.read()

old = '        - echo "GEMINI_API_KEY=$GEMINI_API_KEY" >> .env.production'
new = '        - echo "GEMINI_API_KEY=$GEMINI_API_KEY" >> .env.production\n        - echo "SENDGRID_API_KEY=$SENDGRID_API_KEY" >> .env.production'

if old in content:
    content = content.replace(old, new)
    with open('amplify.yml', 'w') as f:
        f.write(content)
    print('Done')
else:
    print('NOT FOUND')