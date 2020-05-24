DROP DATABASE IF EXISTS employee_infoDB;
CREATE database employee_infoDB;

USE employee_infoDB;

CREATE TABLE department (
  department_id INT NOT NULL,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE roles (
  role_id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,4) NULL,
  department_id INT (department) NULL,
  PRIMARY KEY (role_id)
);
CREATE TABLE employee(
  employee_id INT NOT NULL,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  role_id INT (roles) NULL,
  manager_id INT (role_id) NULL,
  PRIMARY KEY (employee_id)
);

SELECT * FROM department;
select * from roles;
select * from employee;

