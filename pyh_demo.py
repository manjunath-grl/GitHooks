"""Impot Json module"""
import json

with open("package.json", encoding="utf-8") as f:
    read_data = json.loads(f.read())

print(read_data["scripts"])
print("done")


arr = [2, 3, 4, 5]

for i in arr:
    print(i)


# function
def multiplier(fst_ele, sec_ele):
    """Takes in two numbers, returns their product."""
    return fst_ele * sec_ele


print(multiplier(20, 40))


# Python String Operations
def string_reverse(strng):
    """read the string and reverse it"""
    reverse_str = ""
    j = len(strng)
    while j > 0:
        reverse_str += strng[j - 1]
        j = j - 1
    return reverse_str


print(string_reverse("GRL"))
