import mysql.connector

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "equipsense",
    "port": 3306,
}

def get_db():
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor(dictionary=True)  # Ensure that the cursor returns dictionaries
    try:
        yield cursor, db
    finally:
        cursor.close()
        db.close()