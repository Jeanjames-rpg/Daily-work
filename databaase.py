1. Police_Station

Stores station details

Field	Type
station_id (PK)	INT
name	VARCHAR
location	VARCHAR
phone	VARCHAR
🔹 2. Officer

Stores police officers

Field	Type
officer_id (PK)	INT
name	VARCHAR
rank	VARCHAR
station_id (FK)	INT