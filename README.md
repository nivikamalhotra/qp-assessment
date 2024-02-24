# QP - Assessment 
<b> Grocery Management System </b>

This is a Grocery Management System API built with Node.js, Express.js, TypeScript, and MySQL. It allows users to manage grocery items, place orders, and more.

# Features
<b> Admin Role: </b>

1. Add new grocery items to the system.
2. View existing grocery items.
3. Remove grocery items from the system.
4. Update details (e.g., name, price) of existing grocery items.
5. Manage inventory levels of grocery items.

<b> User Role: </b>

1. View the list of available grocery items.
2. Ability to book multiple grocery items in a single order.

# Installation
1. Clone the repository: git clone <repository-url>
2. Navigate to the project directory: cd qp-assessment
3. Install dependencies: npm install
4. Set up the database: Create a MySQL database & Update the database configuration in src/config/config.default.json file. Sql file also present at src/qp_assessment.sql.
5. Start the server: npm start (The server will start running at http://localhost:8080.)

# Environment Variables
1. DB_HOST: MySQL database host.
2. DB_USER: MySQL database username.
3. DB_PASSWORD: MySQL database password.
4. DB_DATABASE: MySQL database name.
5. JWT_ACCESS_SECRET_KEY: Secret key for JWT access token.
6. JWT_REFRESH_SECRET_KEY: Secret key for JWT refresh token.
7. ACCESS_TOKEN_EXPIRY: Expiry time for access token.
8. REFRESH_TOKEN_EXPIRY: Expiry time for refresh token.

# API Endpoints - http://localhost:8080/api/v1
<b> Admin Endpoints: </b>

* POST /admin/items: Add a new grocery item.
* GET /admin/items: View all existing grocery items.
* DELETE /admin/items/:id: Remove a grocery item.
* PUT /admin/items/:id: Update details of a grocery item.
* PUT /admin/items/:id/inventory: Manage inventory level of a grocery item.

<b> User Endpoints: </b>

* GET /items: View all available grocery items.
* POST /orders: Book multiple grocery items in a single order.

<b> Auth Endpoints: </b>

* POST /auth/login: Login the user.
* POST /auth/signup: Sign up the user.

# Credentials
* Admin - username: authorized_user, password: test123
* User - username: user_one, password: test123

# Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.