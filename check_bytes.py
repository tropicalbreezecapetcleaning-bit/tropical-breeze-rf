with open("public/booking.html", "rb") as f:
    content = f.read()
# Find title tag and show surrounding bytes
idx = content.find(b"<title>")
print(repr(content[idx:idx+60]))
