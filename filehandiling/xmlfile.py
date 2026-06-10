import xml.etree.ElementTree as ET

#-->Key Functions
# Function	Use
# Element()	create root
# SubElement()	add child
# parse()	read file
# getroot()	access root
# find()	get tag
# write()	save file


#   writing
root = ET.Element("students")

student1 =ET.SubElement(root,"student")

ET.SubElement(student1,"name").text="Jean"
ET.SubElement(student1,"age").text="22"

tree =ET.ElementTree(root)
tree.write("students.xml")

#  reading

tree = ET.parse("students.xml")
root=tree.getroot()

for student in root:
    name = student.find("name").text
    age = student.find("age").text
    print(name,age)

#appending
tree=ET.parse("students.xml")
root=tree.getroot()

new_student = ET.SubElement(root,"student")
ET.SubElement(new_student,"name").text="Rose"
ET.SubElement(new_student,"age").text="21"

tree.write("students.xml")

tree =ET.parse("students.xml")
root = tree.getroot()

for student in root:
    name=student.find("name").text
    age=student.find("age").text
    print(name,age)

#update data

for student in root:
    if student.find("name").text=="Rose":
        student.find("age").text="17"
tree.write("students.xml")

tree=ET.parse("students.xml")
root=tree.getroot()

for student in root:
    name=student.find("name").text
    age=student.find("age").text
    print(name,age)

#deleting
# for student in root:
#     if student.find("name").text=="Jean":
#         root.remove(student)

# tree.write("students.xml")       

# tree=ET.parse("students.xml")
# root=tree.getroot()

# for student in root:
#     name=student.find("name").text
#     age=student.find("age").text
#     print(name,age)

#------> visualisation

data = []

for student in root:
    data.append({
        "Name":student.find("name").text,
        "Age":int(student.find("age").text)
    })
print(data)

import matplotlib.pyplot as plt

names=[d["Name"] for d in data]
ages=[d["Age"] for d in data]

plt.bar(names,ages)
plt.title("student table")
plt.show()