content = open("src/app/tile-grout/page.tsx", "r", encoding="utf-8").read()
content = content.replace(
    "tile-before-kitchen.jpg`, alt=\"Kitchen tile before RF cleaning\"",
    "TEMP_KITCHEN.jpg`, alt=\"Kitchen tile temp\""
)
content = content.replace(
    "tile-after-kitchen.jpg`, alt=\"Kitchen tile after RF cleaning\"",
    "tile-before-kitchen.jpg`, alt=\"Kitchen tile before RF cleaning\""
)
content = content.replace(
    "TEMP_KITCHEN.jpg`, alt=\"Kitchen tile temp\"",
    "tile-after-kitchen.jpg`, alt=\"Kitchen tile after RF cleaning\""
)
open("src/app/tile-grout/page.tsx", "w", encoding="utf-8").write(content)
print("Done")
