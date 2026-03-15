# RBAC-PRJ

Role-Based Access Control (RBAC) Article Management System built with a modern full-stack architecture.

This project allows users to create, manage, and publish articles with role-based permissions for **Admin** and **Staff** users.

Both **frontend** and **backend** are located inside the same repository and can be started together using a single command.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Redux Toolkit
* TanStack React Query
* Tailwind CSS
* shadcn/ui
* Lucide Icons

### Backend

* Node.js
* Express
* TypeScript
* PostgreSQL
* JWT Authentication
* RBAC (Role-Based Access Control)

### Database

* PostgreSQL
* UUID based IDs
* Article status support (`draft`, `published`)

---

## Features

* User Authentication
* Role-Based Access Control (Admin / Staff)
* Article CRUD Operations
* Draft & Published Article Status
* Dashboard with statistics
* Light / Dark Mode
* Responsive UI
* Toast Notifications
* Secure Password Hashing
* JWT Authentication

---

## Roles and Permissions

### Admin

* Create Articles
* Edit Articles
* Delete Articles
* View All Articles

### Staff

* Create Articles
* View Articles
* Cannot Delete Articles

---

## Project Structure

```
RBAC-PRJ
│
├── back-end
│   ├── src
│   │   ├── controllers
│   │   ├── services
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   └── database
│
├── front-end
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── store
│   │   ├── hooks
│   │   └── utils
│
└── package.json
```

---

## Installation

Clone the repository

```
git clone https://github.com/your-username/RBAC-PRJ.git
```

Navigate into the project

```
cd RBAC-PRJ
```

Install dependencies

```
npm install
```

---

## Environment Variables

Create a `.env` file inside **back-end**

Example:

```
PORT=8000
AES_SECRET=ackrock-secret
JWT_SECRET=***
```

---

## Running the Project

This project runs **frontend and backend together**.

Start the development server:

```
npm run dev
```

This command will start:

* Backend server (Express API)
* Frontend server (Vite React App)

---

## Backend API

Example endpoints:

```
POST /api/auth/register
POST /api/auth/login

GET /api/articles
POST /api/articles
PUT /api/articles/:id
DELETE /api/articles/:id
```

---

## Screenshots

Dashboard, Articles Management, and Authentication UI included.

---

## Future Improvements

* Pagination for articles
* Article categories
* Comments system
* Notifications
* Advanced analytics
* Role management panel

---

## Author

Gowtham

Full Stack Developer

---

## License

This project is open source and available under the MIT License.
