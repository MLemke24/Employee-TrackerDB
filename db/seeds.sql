INSERT INTO department (name)
VALUES
('Engineering'),
('Accounting'),
('Sales'),
('Facilities'),
('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
('Lead Engineer', 145000, 1),
('Engineer', 100000, 1), 
('Lead Office Manager', 145000, 2),
('Accounting', 80000, 2),
('Sales', 78000, 3),
('Facilities', 45000, 4),
('Lead Human Resources', 145000, 5),
('Human Resources', 65000, 5);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES
('John', 'Doe', null, 1),
('Matt', 'Lemke', 1, 2);

