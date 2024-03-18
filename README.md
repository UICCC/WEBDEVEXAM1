
FRONT END SET-UP 

( REQUIRED - NODE JS, GIT )
--CD FRONTEND--
--NPM INSTALL--
-NPM RUN DEV--


BACK END SET-UP

( REQUIRED - MINICONDA, XAMPP )
*OPEN MINICONDA*
--cd \backend--
--conda create equipsenseEnv--
--conda activate equipsenseEnv--
--pip install fastapi uvicorn mysql-connector-python bcrypt python-multipart--
--uvicorn main:app --reload--
