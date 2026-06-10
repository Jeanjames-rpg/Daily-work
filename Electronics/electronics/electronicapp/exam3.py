import psycopg2
import json

conn = psycopg2.connect(
    dbname="electronics",
    user="postgres",
    password="jeanjames",
    host="localhost",
    port="5432"
)

cursor = conn.cursor()

# cursor.execute(
#     """
# create table if not exists sales_json(
#     id serial primary key,
#     data JSONB
# )

# """
# )
# conn.commit()

# with open('data2.json','r',encoding='utf-8') as f:
#     data= json.load(f)

with open(r'D:\pythonprogrms\Electronics\electronics\electronicapp\data2.json',
          'r',
          encoding='utf-8') as f:
    data = json.load(f)

for record in data:
    cursor.execute(
        "insert into sales_json (data) values (%s)",
        [json.dumps(record)]
    )

conn.commit()

cursor.close()
conn.close()
print("success")