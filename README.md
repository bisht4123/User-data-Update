# User-Tester-
A full-stack Node.js + MySQL CRUD app with Express, EJS templates, and Faker.js for bulk data seeding.

# Alpha App 🚀

A full-stack web application built with **Node.js**, **Express**, and **MySQL** that demonstrates complete CRUD operations with server-side rendering using EJS templates.

---

## 📋 Features

- View total number of registered users
- View all users in a table (id, email, username)
- Edit any user's username (password-protected)
- Bulk data seeding using Faker.js (100 fake users)
- Server-side rendering with EJS templates
- SQL Injection prevention using placeholders

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MySQL | Relational database |
| mysql2 | MySQL driver for Node.js |
| EJS | Server-side templating |
| Faker.js | Fake data generation |
| method-override | PATCH/DELETE via HTML forms |

---

## 📁 Project Structure
```
delta-app/
├── views/
│   ├── home.ejs          # Home page — total user count
│   ├── showusers.ejs     # All users table
│   └── edit.ejs          # Edit username form
├── index.js              # Main server file — all routes
├── schema.sql            # Database schema
├── package.json
└── .gitignore
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/delta-app.git
cd delta-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup MySQL Database

Make sure MySQL is running on your machine, then:
```bash
# Login to MySQL CLI
mysql -u root -p

# Run the schema file
source schema.sql;
```

### 4. Configure Database Connection

In `index.js`, update your MySQL credentials:
```javascript
const connection = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  database: "delta_app",
  password: "YOUR_PASSWORD",  // ← change this
});
```

### 5. Seed the Database (Optional)

To insert 100 fake users, uncomment the bulk insert section in `index.js` and run once:
```bash
node index.js
```

Then comment it back out.

### 6. Start the Server
```bash
# Normal start
node index.js

# With auto-restart (recommended)
nodemon index.js
```

---

## 🌐 API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Show total number of users |
| GET | `/user` | Show all users (id, email, username) |
| GET | `/user/:id/edit` | Show edit form for a specific user |
| PATCH | `/user/:id` | Update username (password required) |

---

## 🗄️ Database Schema
```sql
CREATE TABLE user (
  id       VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email    VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
);
```

---

## 📸 Screenshots

### Home Page
> Shows total number of users in the database

### All Users
> Displays all users in a table with edit option

### Edit Username
> Password-protected form to update username

---

## 📌 Key Concepts Covered

- Connecting **Node.js with MySQL** using `mysql2` package
- **SQL placeholders** (`?`) to prevent SQL Injection
- **Bulk INSERT** using 2D arrays with Faker.js
- **EJS templating** — loops, dynamic data rendering
- **REST API** design (GET, POST, PATCH)
- **method-override** for PATCH via HTML forms
- **express.urlencoded** middleware for form data parsing
- Using `schema.sql` for database version control

---

## 🚀 Learning Resource

Built while following the **Sigma 8.0 Course** by [Apna College](https://www.apnacollege.in/)
> Backend 5 — Node.js with SQL (Day 36)

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your_username](https://github.com/your_username)
- Twitter: [@your_twitter](https://twitter.com/your_twitter)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
