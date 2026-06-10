import mysql.connector
from datetime import date

db_settings = {
"host" : " localhost",
"user" : "root",
"password":"jeanjames",
"database":"police"
}

db=mysql.connector.connect(**db_settings)
cursor = db.cursor(dictionary=True)

# cursor.execute("Describe cases")

# for row in cursor.fetchall():
#     print(row)

# query="UPDATE cases set case_date = %s where caseid=%s"

# data = [
#     ("2026-04-01", 1),
#     ("2026-04-05", 2),
#     ("2026-08-19", 3),
#     ("2026-04-01", 4),
#     ("2026-04-05", 5),
#     ("2026-03-16", 6),
#     ("2026-07-11", 7),
#     ("2026-02-05", 8),
#     ("2026-11-10", 9),
#     ("2026-02-22", 10),
#     ("2026-08-25", 11),
#     ("2026-02-20", 12),
#     ("2026-05-11", 13),
#     ("2026-02-27", 14),
#     ("2026-07-11", 15),
#     ("2026-05-31", 16),
#     ("2026-06-25", 17),
#     ("2026-11-10", 18),
#     ("2026-11-11", 19),
#     ("2026-04-25", 20),
#     ("2026-08-10", 21),
#     ("2026-04-01", 22),
#     ("2026-07-05", 23),
#     ("2026-06-20", 24),
#     ("2026-04-30", 25),
#     ("2026-04-25", 26),
#     ("2026-04-10", 27),
#     ("2026-04-01", 28),
#     ("2026-02-05", 29),
#     ("2026-03-17", 30),
#     ("2026-05-10", 31),
#     ("2026-04-10", 32),
#     ("2026-01-18", 33),
#     ("2026-09-13", 34),
#     ("2026-04-10", 35),
#     ("2026-01-09", 36),
#     ("2026-04-10", 37),
#     ("2026-06-03", 38),
#     ("2026-04-10", 39),
#     ("2026-04-10", 40),
#     ("2026-03-01", 41),
#     ("2026-07-11", 42),
#     ("2026-11-10", 43),
#     ("2026-04-10", 44),
#     ("2026-08-01", 45),
    
# ]
# cursor.executemany(query,data)

# conn.commit()

# query ="""
# select * from cases
# where title like '%theft%'
# order by case_date

# """

# cursor.execute(query)

# rows =cursor.fetchall()

# for row in rows:
#     print(row)

# conn.close()

# query="update cases set description = %s where caseid=%s"

# data =[
#     ("Bike stolen near bus stand", 1),
#     ("Mobile phone theft in market", 27),
#     ("Chain snatching incident", 23),
#     ("House burglary at night", 25),
#     ("Pickpocketing in crowded area",43)

# ]

# cursor.executemany(query,data)
# conn.commit()

# cursor.execute("""
# UPDATE  cases
# set open_date=case_date
# """)

# cursor.execute("""
# UPDATE cases
# set close_date = date_add(case_date, interval 5 day)
# where status = 'closed'
# """)


# conn.commit()
# conn.close()
# print("success")


# query="""
#     insert into criminal(criminalid,cr_name,age,crime_type,location,phnum,idmark,emergency_no)
#     values(%s, %s, %s, %s, %s, %s, %s, %s)
# """

# info =[
#     (16, 'Deepak', 29, 'Theft', 'Kakkanad', 9000000016, 'Scar on arm', 9011000016),
#     (17, 'Rahul', 36, 'Robbery', 'Aluva', 9000000017, 'Tattoo on neck', 9011000017),
#     (18, 'Sanjay', 31, 'Theft', 'Kochi', 9000000018, 'Burn mark on hand', 9011000018),
#     (19, 'Faisal', 42, 'Fraud', 'Edappally', 9000000019, 'Scar on face', 9011000019),
#     (20, 'Joseph', 50, 'Burglary', 'Angamaly', 9000000020, 'Mole on chin', 9011000020),
#     (21, 'Akash', 27, 'Theft', 'Kaloor', 9000000021, 'Tattoo on wrist', 9011000021),
#     (22, 'Naveen', 33, 'Cyber Crime', 'Vyttila', 9000000022, 'Scar on eyebrow', 9011000022),
#     (23, 'Prakash', 37, 'Theft', 'Tripunithura', 9000000023, 'Burn mark on leg', 9011000023),
#     (24, 'Shyam', 41, 'Extortion', 'Perumbavoor', 9000000024, 'Tattoo on arm', 9011000024),
#     (25, 'Mani', 30, 'Theft', 'Aluva', 9000000025, 'Scar near eye', 9011000025)
    
# ]

# cursor.executemany(query,info)
# conn.commit()

# query="""
#     INSERT into case_criminal(caseid,criminalid)
#     values(%s ,%s )

# """
# dataa=[
#     (1, 16),
#     (1, 21),
#     (23, 18),
#     (23, 23),
#     (25, 25),
#     (27, 16),
#     (27, 23),
#     (43, 21),
#     (43, 18)
# ]

# cursor.executemany(query,dataa)

# conn.commit()
# print("ready")

# query="""
# select
# 	p.stationid,
#     p.name,
#     p.location,
#     p.phno,
#     o.pname,
#     o.officerid,
#     o.prank,
#     o.gender,
#     o.age,
#     c.caseid,
#     c.title,
#     c.description,
# 	c.status
# from pstation p
# join officer o on p.stationid=o.stationid
# left join cases c on o.officerid=c.officerid 
# where p.stationid="1"
# order by o.officerid;

# """

# cursor.execute(query)

# c=cursor.fetchall()

# for row in c:
#     print(row)

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
# d=cursor.fetchall()

# for row in d:
#     print(row)

# query="""
# select 
# 	v.vehicleid,
#     v.stationid,
#     p.name,
#     v.type,
#     v.vehicle_number,
#     p.noofficers
# from vehicle v
# join pstation p on v.stationid=p.stationid
# where type like '%Jeep%'
# order by v.vehicleid;

# """

# cursor.execute(query)
# s=cursor.fetchall()

# for row in s:
#     print(row)

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
join officer o on c.officerid=o.officerid
order by c.title;
"""

cursor.execute(query)

t=cursor.fetchall()

# for row in t:
#     # print(row)
#     print(f"Case:{row['title']}  | Assigned officer:{row['pname']}")
#     print(f"status: {row['status']}")
#     print("_" * 30)

# if t:
#     print(" | ".join(t[0].keys()))
#     print("-" * 100)

for row in t:
    print(row)