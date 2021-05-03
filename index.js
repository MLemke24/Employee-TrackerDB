const db = require('./db/connection');
const inquirer = require('inquirer');
const table = require('console.table');
const mgrQuery = 'SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management";'



const database = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'action',
            message: 'what would you like to do?',
            choices: ['See all employees', 'See employees by department', 'View all employees by manager', 'Add employee', 'Remove employee', 'Update role', 'End session'] 
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
        } else if (data.action == 'See employees by department') {
            db.query (
                `SELECT e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.name AS "Department"
                FROM employees e 
                INNER JOIN roles r 
                ON r.id = e.role_id 
                INNER JOIN department d
                ON d.id = r.department_id
                ORDER BY r.department_id DESC;;`,
                function(err, res) {
                    console.table(res)
                    database()
                }
            )
        } else if (data.action == 'View all employees by manager'){
            db.query (
                `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", CONCAT(m.first_name," ",m.last_name) AS "Manager"
                FROM employees e
                LEFT JOIN roles r
                ON r.id = e.role_id 
                LEFT JOIN department d
                ON d.id = r.department_id
                LEFT JOIN employees m ON m.id = e.manager_id
                ORDER BY e.manager_id DESC;`,
                function(err, res) {
                    console.table(res)
                    database()
                }
            )
        } else if (data.action == 'Add employee') {
            addEmployee();
        } else if (data.action == 'Remove employee') {
            deleteEmployee()
        } else if (data.action == 'Update role'){
            updateRole()
        } else if (data.action == 'End session') {
            return data;
        }
    })
}

//================= Select Role Quieries Role Title for Add Employee Prompt ===========//
var roleArr = [];
  function selectRole() {
  db.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
//================= Select Role Quieries The Managers for Add Employee Prompt ===========//
var managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is their first name?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is their last name?'
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'What is their role?',
            choices: selectRole()
        },
        {
            name: 'manager_id',
            type: 'list',
            message: "Who is their manager?",
            choices: selectManager()
        }
    ]).then(data => {
        var roleId = selectRole().indexOf(data.role_id) + 1;
        console.log(roleId)
        var managerId = selectManager().indexOf(data.manager_id) + 1;
        console.log(managerId)
        const sql = `INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES (?,?,?,?)`
        const params = [data.first_name, data.last_name, managerId, roleId]
        db.query(sql,params, (err, result) => {
              if(err) throw err;
              console.log('employee was successfully added')
              database()
        })
     
    })
}


function deleteEmployee() {
    inquirer.prompt([
        {
            name: 'employees.id',
            type: 'input',
            message: 'What is the employees ID that you would like to delete?'
            }
        ]).then(data => {
            const sql = `DELETE FROM employees WHERE id = ?`
            const params = [data.employees.id]
            db.query(sql,params, (err, result) => {
                if(err) throw err;
                console.log('employee was successfully deleted')
                database()
          })
        })
}

function updateRole() {
    inquirer.prompt([
        {
            name: 'roles.id',
            type: 'input',
            message: 'What is the employees ID?'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What would you like their new role ID to be?'
        }
    ]).then(data => {
        sql = `UPDATE employees SET role_id = ?
        WHERE id = ?`
        const params = [data.role_id, data.roles.id]
        db.query(sql,params, (err, result) => {
            if(err) throw err;
            console.log('employees role was successfully updated')
            database()
      })
    })
}


database()

// // Get all employees
// SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.name AS "Department", r.salary AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
// FROM employees e
// LEFT JOIN roles r
// ON r.id = e.role_id 
// LEFT JOIN department d
// ON d.id = r.department_id
// LEFT JOIN employees m ON m.id = e.manager_id
// ORDER BY e.id;

// get all roles
// SELECT e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.name AS "Department"
// FROM employees e 
// INNER JOIN roles r 
// ON r.id = e.role_id 
// INNER JOIN department d
// ON d.id = r.department_id
// ORDER BY r.department_id DESC;

// get employees by manager

// SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", CONCAT(m.first_name," ",m.last_name) AS "Manager"
// FROM employees e
// LEFT JOIN roles r
// ON r.id = e.role_id 
// LEFT JOIN department d
// ON d.id = r.department_id
// LEFT JOIN employees m ON m.id = e.manager_id
// ORDER BY e.manager_id DESC;