with open("public/booking.html", "rb") as f:
    content = f.read()
content = content.replace(b'\xc3\x83\xc2\xa2\xc3\xa2\xc2\x82\xc2\xac\xc3\xa2\xc2\x80\xc2\x9d', b'-')
content = content.replace(b'\xc3\x83\xc2\xa2\xc3\xa2\xc2\x84\xc2\xa2', b'TM')
content = content.replace(b'\xc3\x83\xc2\xa2\xc3\xa2\xc2\x80\xc2\x99', b"'")
content = content.replace(b'\xc3\x82\xc2\xb7', b' - ')
with open("public/booking.html", "wb") as f:
    f.write(content)
print("Done")
