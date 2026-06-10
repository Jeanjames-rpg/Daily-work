import mysql.connector
import csv


conn= mysql.connector.connect(
    host="localhost",
    user="root",
    password="jeanjames",
    database="electronics"

)

cursor = conn.cursor()

with open(r"D:\pythonprogrms\Electronics\electronics\electronicapp\templates\Electronic_sales.csv", newline='', encoding='utf-8') as f:
    reader = csv.reader(f)

    headers=next(reader)

    headers = [h.replace(" ","_") for h in headers]

    columns = ', '.join([f"`{col}` TEXT" for col in headers])
    cursor.execute(f"CREATE TABLE IF NOT EXISTS sales ({columns})")


    for row in reader:
        placeholder = ', '.join(['%s'] * len(row))
        cursor.execute(f"insert into sales values ({placeholder})",row)

conn.commit()

cursor.close()
conn.close()
print("successss")