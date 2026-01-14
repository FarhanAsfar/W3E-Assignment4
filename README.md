# W3E-Assignment4
# Building a REST API using Express.js

This project uses **PostgreSQL** as the database (which is running inside Docker) and **Prisma ORM** for database access.

The Node.js server runs on the **host machine**, while PostgreSQL runs inside a **Docker container**.

---

## Tech Stack

- Node.js
- PostgreSQL (Dockerized)
- Prisma ORM
- Docker & Docker Compose

---

## Prerequisites

Make sure the following are installed on your machine:

- Node.js (v18+ recommended)
- npm
- Docker
- Docker Compose

You can verify installations:

```bash
node -v
npm -v
docker -v
docker compose version
```
# Project Setup

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start PostgreSQL (Docker)

Start the PostgreSQL database using Docker Compose:

```bash
docker compose up -d
```

### PostgreSQL Configuration

- Host: `localhost`
- Port: `5434`
- User: `postgres`
- Password: `postgres`
- Database: `travel-db`

---

## 4. Restore Database Data

This project includes a pre-exported SQL dump file: `travel-db.sql`.

Restore the database by running the following command:

```bash
docker exec -i postgres_assignment \
  psql -U postgres travel-db < travel-db.sql
```

---

## 5. Generate Prisma Client

```bash
npx prisma generate
```

---

## 6. Start the Server

The entry point of the application is `index.js`.

```bash
node index.js
```

Now, you should have the server running.

---

## 7. You can check the database using Prisma Studio
Run the following in your terminal:
```
npx prisma studio
```

---

## API Endpoints

All endpoints are **PROTECTED** and require authentication via `verifyToken`.

---

### Search Travel by Location

**Endpoint**
```
GET api/v1/travel/search/:locationname?token=your_token
```

**Description**  
Search travel data based on a location name.

**URL Parameters**

| Parameter      | Type   | Description              |
|---------------|--------|--------------------------|
| locationname | string | Name of the location     |

🔐 **Authentication**
- The token you should pass with the URL is ***assignment4***

**Example**
```
GET api/v1/travel/search/:mumbai?token=assignment4
```

---

### Get Travel Details

**Endpoint**
```
GET api/v1/travel/details/:id?searchtype=flight/attraction
```

**Description**  
Search for detailed information for a specific travel entry.

**URL Parameters**

| Parameter | Type   | Description              |
|----------|--------|--------------------------|
| id       | number | Unique travel identifier |
| searchtype | string | get flight or attractoin details |

🔐 **Authentication**
- The token you should pass with the URL is ***assignment4***

**Example**
```
GET api/v1/travel/details/1?searchtype=flight&token=assignment4)
```

---

## Test the server for the following Inputs:
You can also check the available location names using Prisma Studio.

**Location Endpoint**
```
GET api/v1/travel/search/:locationname?token=your_token
```
| locationname | Link |
|----------| ----------------- |
| mumbai     | http://localhost:3333/api/v1/travel/search/mumbai?token=assignment4 |
| sydney    | http://localhost:3333/api/v1/travel/search/sydney?token=assignment4 |
| auckland     | http://localhost:3333/api/v1/travel/search/auckland?token=assignment4 |

**Details Endpoint**
```
GET api/v1/travel/search/:locationname?token=your_token
```
| id | searchtype | Link |
|---- |----------| ----------------- |
| 1 | attraction    | http://localhost:3333/api/v1/travel/details/1?searchtype=attraction&token=assignment4) |
| 4 |  flight    | (http://localhost:3333/api/v1/travel/details/4?searchtype=flight&token=assignment4)|

---


### Database Diagram
<img width="1215" height="790" alt="Screenshot from 2026-01-13 18-38-32" src="https://github.com/user-attachments/assets/104bb208-266d-4c5b-a19a-720327327bad" />

---

### Some Example Screenshots
<img width="1151" height="489" alt="Screenshot from 2026-01-13 18-45-34" src="https://github.com/user-attachments/assets/dafefd23-a931-4160-99ec-ee61ddad656c" />
<img width="1151" height="489" alt="Screenshot from 2026-01-13 18-45-21" src="https://github.com/user-attachments/assets/bcf41be7-9724-4ec8-bbdf-81b5d66c27be" />
<img width="651" height="478" alt="Screenshot from 2026-01-13 18-41-39" src="https://github.com/user-attachments/assets/ad496680-e0ca-4c53-8b68-a278480a0c22" />
<img width="651" height="478" alt="Screenshot from 2026-01-13 18-41-11" src="https://github.com/user-attachments/assets/f0946884-3863-453f-863e-792850b2f89a" />
<img width="1569" height="503" alt="Screenshot from 2026-01-13 18-40-46" src="https://github.com/user-attachments/assets/f5b0ebd8-b6cc-4914-9289-89a1b5afd323" />
<img width="1730" height="380" alt="Screenshot from 2026-01-13 18-40-34" src="https://github.com/user-attachments/assets/2f16d1ed-dd5e-49a9-b4c7-3c8cad1742c1" />
<img width="1730" height="380" alt="Screenshot from 2026-01-13 18-40-26" src="https://github.com/user-attachments/assets/a825baf3-72bf-4c50-be8d-99b2b2dd57d8" />
<img width="1403" height="540" alt="Screenshot from 2026-01-13 18-40-11" src="https://github.com/user-attachments/assets/3a5cfd06-853b-4003-8a86-4989e476c98c" />

---

### Global Handlers
Used a global async handler, also ApiResponse, and ApiError handler to handle server response and error in a better and cleaner way. 

## Limitations
- The data fetching file should be organized
- Added the exported .sql file for the assignment purpose
- .env file should not be pushed to GitHub
