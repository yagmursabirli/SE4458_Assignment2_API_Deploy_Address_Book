Address Book REST API

SE4458 - Assignment 2 

This project is a simple Address Book REST API developed for the SE4458 course.
It uses Node.js (Express.js) and provides full CRUD functionality along with Swagger/OpenAPI documentation.

🚀 Live Links

GitHub Repository: https://github.com/yagmursabirli/SE4458_Assignment2_API_Deploy_Address_Book 

Swagger UI: https://se-4458-assignment2-api-deploy-addr.vercel.app/api-docs

API Base URL: https://se-4458-assignment2-api-deploy-addr.vercel.app/

🛠️ Tech Stack

Backend: Node.js + Express.js

Database: In-memory JavaScript array

Deployment: Vercel

Documentation: Swagger / OpenAPI

📂 API Endpoints
Method	Path	Description
GET	/contacts	 --> Get all contacts
GET	/contacts/{id}	--> Get a specific contact by id
GET	/contacts/search?q={query}	--> Search contacts by first name, last name, email, or tag
POST	/contacts	--> Create a new contact
PUT	/contacts/{id}	--> Full update (requires all data)
PATCH	/contacts/{id}	--> Partial update (only provided fields)
DELETE	/contacts/{id}	--> Delete a contact by id

🧩 Data Model

Each contact includes:

{
  "id": 1,
  "firstName": "Badem",
  "lastName": "Sabirli",
  "email": "badem@example.com",
  "phone": "5554443322",
  "tag": "work"
}



Data is not persistent: everything resets when the server restarts!


⚙️ Common Issues & Fixes
1. Swagger file not found on Vercel (ENOENT)

Fix: Used path.join(__dirname, 'swagger.yaml') to ensure correct path resolution.

2. Swagger UI static file routing error

Fix: Added a vercel.json file with rewrite rules to route all requests through index.js, ensuring static files load correctly.

3. CORS errors

Fix: Configured Express with CORS middleware to allow external requests.
