import csv 
import json

data=[]

with open(r"D:\pythonprogrms\Electronics\electronics\electronicapp\templates\Electronic_sales.csv",newline='',encoding='utf-8') as f:
    reader = csv.DictReader(f)


    for row in reader:
        data.append(row)


with open('data.json','w',encoding='utf-8') as j:
    json.dump(data,j,indent=4)

print(" converted")