import json

#writing
data={
    "CARS":[
        {"brand":"Bmw","count":19},
        {"brand":"ford","count":15}
    ]
}

with open("cars.json","w") as f:
    json.dump(data,f)

#reading
with open("cars.json","r") as f:
    j=json.load(f)
print(j)

#append
newcars={"brand":"porsche","count":10}

with open("cars.json","r") as f:
    k=json.load(f)
print(k)

data["CARS"].append(newcars)
with open("cars.json","w") as f:
    json.dump(data,f)

#json.dumps() → Convert to JSON string

# student={"Name":"Jean","Marks":70}
# json_string=json.dumps(student)
# print(json_string)

#visualisation

brands = []
counts =[]

for cars in data["CARS"]:
    counts.append(cars["count"])
    brands.append(cars["brand"])

import pandas as pd

with open("cars.json","r")as f:
    data = json.load(f)

h=pd.DataFrame(data["CARS"])
print(h)

import matplotlib.pyplot as plt

#bar graph
# plt.bar(brands, (len(counts)))
# plt.title("Cars Names")
# plt.xlabel("Cars")
# plt.ylabel("Count")

# plt.show()

#-->pie chart
# plt.pie(counts, labels=brands)
# plt.title("brand distribution")

# plt.show()

#-->scatter plot
# plt.scatter(brands,counts)
# plt.show()

#histogram
# plt.hist(counts)
# plt.title("histo gram")
# plt.xlabel("count")
# plt.ylabel("brand")

# plt.show()