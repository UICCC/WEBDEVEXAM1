( REQUIRED - MINICONDA, XAMPP )  
*OPEN MINICONDA*  
--cd \backend--  
--conda create --name equipsenseEnv python=3.9--  
--conda activate equipsenseEnv--  
--pip install fastapi uvicorn mysql-connector-python bcrypt python-multipart--  
--uvicorn main:app --reload--  

When testing, make sure that the following lines in the file are correct:


frontend/src/App.jsx
Line 28: const response = await axios.get(`http://localhost:*Port Shown on miniconda link i.e 8000*/api/borrowers/${value}`);

backend/main.py
Line 24: allow_origins=["http://localhost:*Port shown on vite link i.e. 5173*"],

Make sure that you execute "npm run dev" for frontend in VScode integrated terminal, as well as "uvicorn main:app --reload" for backend in Miniconda command prompt!!