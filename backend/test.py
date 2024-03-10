from fastapi import FastAPI, Depends
import mysql.connector

app = FastAPI()

# Your database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "equipsense",
    "port": 3306,
}

# Function to check database connection
def check_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM borrower")
        result = cursor.fetchone()
        cursor.close()
        connection.close()
        return True if result else False
    except Exception as e:
        print("Database connection error:", e)
        return False

# Test endpoint to check database connection
@app.get("/test-db-connection")
async def test_db_connection(connected: bool = Depends(check_db_connection)):
    if connected:
        return {"message": "Database connected successfully!"}
    else:
        return {"message": "Database connection failed."}