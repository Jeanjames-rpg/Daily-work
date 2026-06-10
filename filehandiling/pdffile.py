# Key Functions
# Function	Use
# PdfReader()	read PDF
# extract_text()	get text
# PdfWriter()	create/edit
# PdfMerger()	merge files
# build()	create PDF


#create pdf

from reportlab.platypus import SimpleDocTemplate,Paragraph
from reportlab.lib.styles import getSampleStyleSheet

doc= SimpleDocTemplate("data.pdf")

styles= getSampleStyleSheet()
content = []

content.append(Paragraph("helllo jean",styles["Normal"]))

doc.build(content)

#reading 

from PyPDF2 import PdfReader

reader = PdfReader("data.pdf")

# for page in reader.pages:
#     print(page.extract_text())

#get pdf info
print(len(reader.pages))

#aadding mul lines

content.append(Paragraph("Name:Rose",styles["Normal"]))
content.append(Paragraph("Age:19",styles["Normal"]))
doc.build(content)

# reader=PdfReader("data.pdf")
# for page in reader.pages:
#     print(page.extract_text())

#------>merging files
#creating a second file
# doc2= SimpleDocTemplate("data2.pdf")

# styles=getSampleStyleSheet()
# data=[]

# data.append(Paragraph("Hello how arr you",styles["Normal"]))
# data.append(Paragraph("are you fine",styles["Normal"]))

# doc2.build(data)

#merging

from PyPDF2 import PdfMerger

# merger = PdfMerger()
# merger.append("data.pdf")
# merger.append("data2.pdf")

# merger.write("mergedfile.pdf")
# merger.close()

# reader=PdfReader("mergedfile.pdf")
# for page in reader.pages:
#     print(page.extract_text())

#split pdf

from PyPDF2 import PdfWriter

# reader=PdfReader("Add Multiple Lines.pdf")
# writer=PdfWriter()

# writer.add_page(reader.pages[0])

# with open("page1.pdf","wb")as f:
#     writer.write(f)

# reader=PdfReader("page1.pdf")
# for page in reader.pages:
#     print(page.extract_text())

#add password

# reader = PdfReader("Add Multiple Lines.pdf")
# writer =PdfWriter()

# for page in reader.pages:
#     writer.add_page(page)

# writer.encrypt("1234")

# with open("secure.pdf","wb")as f:
#     writer.write(f)

# reader=PdfReader("secure.pdf")
# reader.decrypt("1234")

# for page in reader.pages:
#     reader.decrypt("1234")
#     print(page.extract_text())

#visualisation

reader = PdfReader("data.pdf")
text = ""
for page in reader.pages:
    text+=page.extract_text()

print(text)

#Convert Text → Data

lines = text.split("\n")

names =[ ]
age = [] 

for i in range(0,len(lines),2):
    if "Name" in lines[i]:
        names.append(lines[i].split(":")[1].strip())
        age.append(int(lines[i+1].split(":")[1].strip()))

print(names,age) 

import matplotlib.pyplot as plt 

# plt.bar(names,age)
# plt.xlabel("name")
# plt.ylabel("age")
# plt.title("student table")
# plt.show()

#pie chart

# plt.pie(age,labels=names,autopct="%1.1f%%")
# plt.title("student table")
# plt.show()

#line graph

plt.plot(age,names,marker = 0)
plt.title("stdnt age")
plt.show()