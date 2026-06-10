import pickle

data=[
    {"Name":"Shana","Age":23}
    ]

with open("data.pkl","wb") as f:
     pickle.dump(data,f)

# #read

# with open("data.pkl","rb") as f:
#     s=pickle.load(f)
# print(s)

#append
with open("data.pkl","rb") as f:
    a=pickle.load(f)
    print(type(a))
a.append({"Name":"rose","Age":22})

with open("data.pkl","wb") as f:
    pickle.dump(a,f)

with open("data.pkl","rb") as f:
    a=pickle.load(f)
print(a)

#visualisation
names=[]
age=[]

for person in a:
    
    names.append(person["Name"])
    age.append(person["Age"])

print(names)
import matplotlib.pyplot as plt
# plt.bar(names,age)
# plt.title("student list")
# plt.xlabel("Name")
# plt.ylabel("Age")
# plt.show()

#pie chart

# plt.pie(age,labels=names)
# plt.title("studet names")
# plt.show()

#line graph

# plt.plot(age,names)
# plt.title("Student list")
# plt.show()

#scatter 

# plt.scatter(age,names)
# plt.title("students")
# plt.show()

#using pandas

import pandas as pd

with open("data.pkl","rb") as f:
    data=pickle.load(f)
df=pd.DataFrame(data)
print(df)

#bar chart pandas
df.plot(x=names,y=age,kind="bar")
plt.title("student age")

plt.show()