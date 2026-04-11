content = open("public/booking.html", "r", encoding="latin-1").read()
content = content.encode("latin-1").decode("utf-8", errors="replace")
open("public/booking.html", "w", encoding="utf-8").write(content)
print("Done")
