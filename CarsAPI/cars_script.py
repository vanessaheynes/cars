import os
import pandas as pd
import sqlite3

base_dir = os.path.dirname(os.path.abspath(__file__))
csv_file = os.path.join(base_dir, "Data", "Cars Datasets 2025.csv")

db_file = os.path.join(base_dir, "cars.db")
df = pd.read_csv(csv_file, encoding="cp1252")  

conn = sqlite3.connect(db_file)
df.to_sql("Cars", conn, if_exists="replace", index=False)
conn.close()

print(f"{csv_file} loaded into {db_file} successfully with {len(df)} rows.")
