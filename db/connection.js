const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee database.')
);

module.exports = db

// --- SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN employees ON employees.manager_id = employees.id;