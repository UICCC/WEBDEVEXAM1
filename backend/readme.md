BACK END SET-UP

( REQUIRED - MINICONDA, XAMPP )
*OPEN MINICONDA*
--cd \backend--
--conda create equipsenseEnv--
--conda activate equipsenseEnv--
--pip install fastapi uvicorn mysql-connector-python bcrypt python-multipart--
--uvicorn main:app --reload--
