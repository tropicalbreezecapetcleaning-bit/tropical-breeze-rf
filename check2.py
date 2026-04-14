with open("public/booking.html", "rb") as f:
    content = f.read()
idx = content.find(b"Tropical Breeze RF")
print(repr(content[idx:idx+30]))
