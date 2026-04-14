content = open("public/booking.html", "rb").read().decode("latin-1")
open("public/booking.html", "w", encoding="utf-8").write(content)
print("Done")
