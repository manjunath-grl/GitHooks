import json

with open("package.json", "r") as f:
    data = json.load(f)

print(data)
print(data["name"])
print("done")
