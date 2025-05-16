Architecture Explanation:

Our solution is a full-stack web application that answers complex business questions using data stored in a MySQL database. It is built using the following technologies:

Frontend: React.js

Backend: Node.js with Express.js

Database: MySQL 

🔁 How It Works (Data Flow)
User Interaction (Frontend – React):
The user selects a business question from a dropdown (e.g., “Who are the top 5 customers by total spending?”) and clicks a button to submit.

API Request (Frontend → Backend):
React sends a request to a specific backend route (like /api/reports/top-customers).

Processing the Request (Backend – Node.js):
The Node.js backend handles this request. It runs a pre-written SQL query that fetches the relevant data from the MySQL database.

Getting Data (Backend → MySQL DB):
The backend uses mysql2/promise to connect to the database, execute the SQL query, and receive the result.

Send Response (Backend → Frontend):
The result (e.g., customer names and spending) is sent back to the frontend in JSON format, along with the original question and SQL query.

Display the Output (Frontend – React):
The React app shows the result in:

Natural language format (e.g., table)

Visual chart (e.g., bar or line chart using Recharts)

🧠 Smart Features
Each business question has a matching SQL query on the backend.

The app handles charts dynamically, displaying them based on the type of question asked.

The UI is clean and simple to use, allowing fast testing of analytical questions
