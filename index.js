const db = require('./db/connection');
const inquirer = require('inquirer');
const table = require('console.table');

const database = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'action',
            message: 'what would you like to do?',
            choices: ['See all employees', 'See employees by department', 'View all employees by manager', 'Add employee', 'Remove Employee', 'Update Employee'] 
        }
    ])
    .then (data => {
        if( data.action == 'See all employees'){
            db.query(
                `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.name AS "Department", r.salary AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
                FROM employees e
                LEFT JOIN roles r
                ON r.id = e.role_id 
                LEFT JOIN department d
                ON d.id = r.department_id
                LEFT JOIN employees m ON m.id = e.manager_id
                ORDER BY e.id;`,
                function(err, res) {
                    console.table(res)
                    database()
                  }
            )
        }
    })
}
database()

// employees.first_name, employees.last_name, roles.title, roles.salary, department.name, AS Manager FROM employee INNER JOIN role on role.id = employee.roles_id INNER JOIN department on department.id = roles.department_id LEFT JOIN employees on employees.manager_id = employees.id

// SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.name AS "Department", r.salary AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
// FROM employees e
// LEFT JOIN roles r
// ON r.id = e.role_id 
// LEFT JOIN department d
// ON d.id = r.department_id
// LEFT JOIN employees m ON m.id = e.manager_id
// ORDER BY e.id;