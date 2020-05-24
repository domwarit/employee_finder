use employees;
INSERT INTO department
    (department_id, department_name)
VALUES
    (1,'Sales'),
    (2,'Engineering'),
    (3,'Finance'),
    (4,'Legal');
INSERT INTO roles
    (role_id, title, salary, department_id)
VALUES
    (1,'Sales Lead', 100000, 1),
    (2,'Salesperson', 80000, 1),
    (3,'Lead Engineer', 150000, 2),
    (4,'Software Engineer', 120000, 2),
    (5,'Account Manager', 160000, 3),
    (6,'Accountant', 125000, 3),
    (7,'Legal Team Lead', 250000, 4),
    (8,'Lawyer', 190000, 4);
INSERT INTO employee
    (employee_id, first_name, last_name, role_id, manager_id)
VALUES
    (12,'John', 'Doe', 1, NULL),
    (23,'Mike', 'Chan', 2, 1),
    (34,'Ashley', 'Rodriguez', 3, NULL),
    (56,'Kevin', 'Tupik', 4, 3),
    (67,'Kunal', 'Singh', 5, NULL),
    (78,'Malia', 'Brown', 6, 5),
    (89,'Sarah', 'Lourd', 7, NULL),
    (90,'Tom', 'Allen', 8, 7);
Collapse



