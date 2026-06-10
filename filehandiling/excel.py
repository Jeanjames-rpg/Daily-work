import pandas as pd 

#writing
# data = {
#     "Name":["Jean","James","Ken"],
#     "Marks":[80,58,71]
# }
# jj=pd.DataFrame(data)
# jj.to_excel("data.xlsx",index=False)

#reading
# h=pd.read_excel("data.xlsx")
# print(h)

#appending
    #read
# h=pd.read_excel("data.xlsx")
#     #new data
# new_data={"Name":"Rose","Marks":79}

    #append
# 
# h.to_excel("data.xlsx",index=False)
# h=pd.concat([h,pd.DataFrame([new_data])], ignore_index=True)

# print(pd.read_excel("data.xlsx"))

        #using openpyxl

# import openpyxl
# from openpyxl import Workbook, load_workbook
# #writing

# wb=Workbook()
# ws = wb.active

# ws["A1"]="Name"
# ws["B1"]="Marks"

# ws["A2"]="Jean"
# ws["B2"]=90

# ws["A3"]="kris"
# ws["B3"]=78

# wb.save("file.xlsx")

# #reading

# wb=load_workbook("file.xlsx")
# ws=wb.active

# for row in ws.iter_rows(values_only=True):
#     print(row)

# #append

# wb=load_workbook("file.xlsx")
# ws=wb.active

# ws.append(["Arun",69])

# wb.save('file.xlsx')

# wb = load_workbook("file.xlsx")
# ws=wb.active

# for row in ws.iter_rows(values_only=True):
#     print(row)

#Key Functions
# Function	Use
# Workbook()	Create file
# load_workbook()	Open file
# ws["A1"]	Access cell
# ws.append()	Add row
# iter_rows()	Read data
# wb.save()	Save file


