import mysql.connector
import json

conn=mysql.connector.connect(
    host="localhost",
    user="root",
    password="jeanjames",
    database="police"
)

cursor=conn.cursor()

# query="""
# select 
# 	v.vehicleid,
#     v.stationid,
# 	p.name,
#     v.type,
#     v.vehicle_number,
#     p.noofficers
# from vehicle v
# join pstation p on v.stationid=p.stationid
# where type like '%Jeep%'
# order by v.vehicleid;
# """

# cursor.execute(query)

# result=cursor.fetchall()

# data={}

# for row in result:
#     key=f"station_{row[2]}"
#     data[key]={
#         "vehicleid":row[0],
#         "stationid":row[1],
# 	    "name":row[2],
#         "type":row[3],
#         "vehicle_number":row[4],
#         "noofficers":row[5]

#     }

# with open("police_veh.json","w") as f:
#     json.dump(data,f,indent=4)



##------------------Aluva

# query="""
# SELECT
# 	p.location,
#     o.pname,
#     o.officerid,
#     o.prank,
#     o.gender,
#     o.age,
#     c.caseid,
#     c.title,
#     c.description,
# 	cr.cr_name
# from pstation p 
# join officer o on p.stationid=o.stationid
# left join cases c on o.officerid=c.officerid
# left join case_criminal cc on c.caseid=cc.caseid	
# left join criminal cr on cc.criminalid=cr.criminalid
# where p.stationid='2'
# order by o.officerid; 

# """

# cursor.execute(query)

# result=cursor.fetchall()

# data={}
# for row in result:
#     key=f"officer_{row[1]}"
#     data[key]={
#         "location":row[0],
#         "pname":row[1],
#         "officerid":row[2],
#         "prank":row[3],
#         "gender":row[4],
#         "age":row[5],
#         "caseid":row[6],
#         "title":row[7],
#         "description":row[8],
# 	    "cr_name":row[9]

#     }

# with open("police_aluva.json","w") as f:
#     json.dump(data,f,indent=4)



##-------------Theft case
# from datetime import date

# query="""
# select 
# c.caseid,
# c.title,
# c.description,
# c.status,
# c.officerid,
# c.firid,
# c.case_date,
# c.open_date,
# c.close_date,
# group_concat(cr.cr_name separator',') as criminal_names,
# o.pname as officer_name,
# p.name as station_name
# from cases c
# join officer o on c.officerid=o.officerid
# join case_criminal cc on c.caseid=cc.caseid
# join criminal cr on cc.criminalid=cr.criminalid
# join pstation p on o.stationid=p.stationid
# where c.title like '%theft%'
# GROUP BY c.caseid, c.title, c.case_date, o.pname
# order by c.case_date;
# """
# cursor.execute(query)
# res=cursor.fetchall()

# data={}

# for row in res:
#     key=f"desc_{row[2]}"
#     data[key]={
#         "caseid":row[0],
#         "title":row[1],
#         "description":row[2],
#         "status":row[3],
#         "officerid":row[4],
#         "firid":row[5],
#         "case_date":str(row[6]) if row[6] else None,
#         "open_date":str(row[7]) if row[7] else None,
#         "close_date":str(row[8]) if row[8] else None
#     }

# with open("police_theft.json","w") as f:
#     json.dump(data,f,indent=4)

query = """
ALTER TABLE case_criminal
ADD COLUMN id INT NOT NULL AUTO_INCREMENT PRIMARY KEY;
"""
cursor.execute(query)
conn.commit()