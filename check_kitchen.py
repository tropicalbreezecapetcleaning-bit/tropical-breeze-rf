content = open("src/app/tile-grout/page.tsx", "r", encoding="utf-8").read()
print("before count:", content.count("tile-after-kitchen"))
print("after count:", content.count("tile-before-kitchen"))
