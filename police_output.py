import mysql.connector
from datetime import date
import json
conn=mysql.connector.connect(
    host="localhost",
    user="root",
    password="jeanjames",
    database="police"
)

cursor =conn.cursor()

query="""
select 
	c.caseid,
    c.title,
    c.description,
    c.status,
    c.firid,
    o.officerid,
    o.pname,
    c.case_date,
    c.open_date,
    c.close_date
from cases c
join officer o on c.officerid = o.officerid
order by c.title;
"""
cursor.execute(query)

result=cursor.fetchall()


data = {}

for row in result:
    key=f"case_{row[0]}"
    data[key]={
        "caseid":row[0],
        "title":row[1],
        "description":row[2],
        "status":row[3],
        "firid":row[4],
        "officerid":row[5],
        "pname":row[6],
        "case_date":str(row[7]) if row[7] else None,
        "open_date":str(row[8]) if row[8] else None,
        "close_date":str(row[9]) if row[9] else None
        
    }

    # data.append(data)

with open("police1.json","w")as f:
    json.dump(data,f,indent=4)

print("done")