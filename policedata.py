from graphviz import Digraph

dot = Digraph(comment='Police ER Diagram')

# Entities
dot.node('P', '''Police_Station
---------------------
PK stationid
name
location
phno
noofficers
cell count
vehicles
''')

dot.node('O', '''Officer
---------------------
PK officerid
pname
prank
salary
FK stationid
gender
age
ph
emergency_contact
''')

dot.node('C', '''Cases
---------------------
PK caseid
title
description
status
FK officerid
FK firid
case_date 
''')

dot.node('CR', '''Criminal
---------------------
PK criminalid
cr_name
age
crime_type
location
phnum
idmark
emergency_no
''')

dot.node('F', '''FIR
---------------------
PK firid
firdate
firdescription
FK officerid
FK stationid
complainant_name
complainant_phone
''')

dot.node('CC', '''Case_Criminal
---------------------
FK caseid
FK criminalid
''')

dot.node('V', '''vehicle
---------------------
PK vehicleid
FK stationid
type
vehicle_no         
'''

)

# Relationships
dot.edge('P', 'O', label='1:N')
dot.edge('O', 'C', label='1:N')
dot.edge('C', 'CC', label='1:M')
dot.edge('CR', 'CC', label='1:M')
dot.edge('P', 'F', label='1:N')
dot.edge('O', 'F', label='1:N')
dot.edge('F','C', label='1:N')
dot.edge('P','V', label='1:N')

# Save and render
dot.render('police_er_diagram', format='png', view=True)