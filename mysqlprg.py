import mysql.connector
import random

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='jeanjames',
    database='police'

)


cursor = conn.cursor()
cursor.execute("show tables")

rows=cursor.fetchall()

for row in rows:
    print(row)


titles =[
    "Theft Case","Robbery Case", "Cyber Crime", "Fraud Case",
    "Accident Case", "Murder Case", "Drug Case", "Assault Case",
    "Kidnap Case", "Foreign Case", "Burglary Case", "Extortion Case",
    "Traffic Violation", "Harassment Case", "Smuggling Case"
]

description =[
    "Investigation ongoing", "Robbery Case", "Cyber Crime", "Fraud Case",
    "Accident Case", "Murder Case", "Drug Case", "Assault Case",
    "Kidnap Case", "Forgery Case", "Burglary Case", "Extortion Case",
    "Traffic Violation", "Harassment Case", "Smuggling Case"
]

statuses = ["Open","Closed","Pending"]


for i in range(30):
    title= random.choice(titles)
    desc= random.choice(description)
    status = random.choice(statuses)
    officer_id = random.randint(1,15)

    query = """
    INSERT INTO cases (title, description, status, officerid)
    VALUES (%s, %s, %s, %s)
    """

    cursor.execute(query,(title,desc,status,officer_id))

conn.commit()

print(" 30 case insertd successfully")

cursor.close()
conn.close()