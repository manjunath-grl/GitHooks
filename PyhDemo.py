import json

with open("package.json", encoding="utf-8") as f:
    data_ = json.loads(f.read())

print(data_)
print(data_["name"])
print("done")
