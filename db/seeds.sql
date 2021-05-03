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
('Accountant', 80000, 2),
('Sales', 78000, 3),
('Facilities', 45000, 4),
('Lead Human Resources', 145000, 5),
('Human Resources', 65000, 5);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES
('Kobe', 'Bryant', null, 1),
('Pau', 'Gasol', 1, 2),
('Andrew', 'Bynum', 1, 2),
('LeBron', 'James', null, 3),
('Tyler', 'Johnson', 4, 4),
('Kevin', 'Durant', 4, 4),
('Magic', 'Johnson', 4, 5),
('Chris', 'Paul', 4, 5),
('Devin', 'Booker', 4, 6),
('Shaquille', 'ONeal', 4, 6),
('Steph', 'Curry', null, 7),
('Klay', 'Thompson', 11, 8),
('Draymond', 'Green', 11, 8);
