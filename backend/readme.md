( REQUIRED - MINICONDA, XAMPP )  
OPEN MINICONDA
cd \backend
conda create --equipsenseEnv python=3.9
conda activate equipsenseEnv
pip install fastapi uvicorn mysql-connector-python bcrypt python-multipart
uvicorn main:app --reload
