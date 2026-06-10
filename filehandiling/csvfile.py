import csv

# with open("students.csv","w",newline="") as f:
#     writer = csv.writer(f)

#     writer.writerow(["Name","Age"])
#     writer.writerow(["jean",20])
#     writer.writerow(["johny",15])

# #append
# with open("students.csv","a",newline="") as f:
#     writer=csv.writer(f)

#     writer.writerow(["kat",18])

# #reading
# with open("students.csv","r") as f:
#     reader = csv.reader(f)

#     for row in reader:
#         print(row)

# #read as dictionary
# with open("students.csv","r") as f:
#     reader= csv.DictReader(f)

#     for row in reader:
#         print(row["Name"],row["Age"])

# #write using dictionary
# with open("student.csv","w",newline="") as f:
#     fieldnames = ["Name","Age"]

#     writer = csv.DictWriter(f, fieldnames=fieldnames)

#     writer.writeheader()
#     writer.writerow({"Name": "Adam", "Age": 20})
#     writer.writerow({"Name": "Susan","Age": 22})

# #read using dictionary
# with open("student.csv","r") as f:
#     reader=csv.DictReader  (f)

#     for row in reader:
#         print(row["Name"],row["Age"])

# #visualisation
#--> using pandas

import pandas as pd
d=pd.read_csv("student.csv")
# print(d)

 #--->line graph using matplot lib

import matplotlib.pyplot as plt

# d.plot(x="Name", y="Age")
# plt.show()

#bar graph
# d.plot(kind="bar",x="Name",y="Age")
# plt.show()

#pie chart

# plt.pie(d["Age"],labels=d["Name"])
# plt.show()

#. Scatter Plot

# plt.scatter(d["Age"],d["Name"])
# plt.show()

#Add labels & Title

plt.bar(d["Name"],d["Age"])

plt.xlabel("Students")
plt.ylabel("Ages")
plt.title("Student table")

plt.show()