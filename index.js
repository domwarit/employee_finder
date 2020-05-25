const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
  
    // port
    port: 8080,
  
    //  username
    user: "root",
  
    // Your password
    password: "",
    database: "employee_infoDB"
  });

  connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    // console.log("Connected to db as id " + connection.threadId);
});

function getJob(){
    inquirer.prompt(
        {
            name:'job',
            type: 'list',
            message: 'Please select a task.',
            choices: ['add', 'view', 'update', 'exit'],

        }
    ).then(function({job}) {
        switch (job){
            case 'add':
                add();
                break;
            case 'view':
                view();
                break;
            case 'update':
                update();
                break;
            case 'exit':
                connection.end()
                return;            
        }


    })
}
function add (){
    inquirer.prompt(
    { 
        name:"db",
        message: 'Which task would you like to preform',
        type: 'list',
        choices: ['department','role','employee'],
    }
    ).then(function ({ db }) {
        switch (db) {
            case "department":
                add_department()
                break;
            case "role":
                add_role()
                break;
            case 'employee':
                add_employee();
                break;
        }
    })

}
function add_department(){
    inquirer.prompt(
        {
        name: 'name',
        message: "Department name?",
        type: 'intput'
        }
    ).then(function({name}){
        connection.query(`INSERT INTO department (name) VALUES ('${name}')`),
        function(error,data){
            if(error) throw error;
            console.log(`Department Added`)
            getJob();
        }
    })
}
function add_role(){
    let departments = []
     connection.query(`SELECT * FROM department`, 
     function (error,data){
        if(error) throw error;
        for(let i = 0; i < data.lenght; i++){departments.push(data[i].name)}
        inquirer.prompt([
            {
                name: 'role_id',
                message: "Please enter role id",
                type: 'input'
            },
            {
                name: 'title',
                message: "Please enter the employee role",
                type: 'input'
            },
            {
                name: 'salary',
                message: 'What is the salary for this role?',
                type: 'input'

            },
            {
                name: 'department_id',
                message: 'Which department is this role under?',
                type: 'list',
                choices: departments
            }
        ]).then(function ({role_id, title,salary, department_id}){
            let index = departments.indexOf(department_id)
            connection.query(`INSERT INTO role (role_id, title, salary, department_id) VALUES ('${role_id}' , '${title}', '${salary}' , ${index})`,
            function(error,data){
                if(error) throw error;
                console.log(`Role Added`)
                getJob();
            })
        })
     })
}
function add_employee(){
    let employees = [];
    let roles = [];
    connection.query(`SELECT FROM employee`,function(error, data){
        if (error) throw error;
        for(let i = 0; i < data.lenght; i++){
            employees.push(data[i].first_name);
        }
        inquirer.prompt([
            {
                name: 'first_name',
                message: "Please enter employee's First Name",
                type: 'input'
            },
            {
                name: 'last_name',
                message: 'Please enter employee last name',
                type: 'input'
            },
            {
                name: 'role_name',
                message: 'What is the role/title of this employee',
                type: 'list',
                choices: roles
            },
            {
                name: 'manager_id',
                message: "Please enter this employee's manager",
                type: 'list',
                choices: ['none'].concat(employees)
            }

        ]).then(function ({first_name, last_name, role_name, manager_id}){
            let queryText = `INSERT INTO employee (first_name, last_name, role_id`;
            if (manager_id != 'none') {
                queryText += `, manager_id) VALUES ('${first_name}', '${last_name}, ${roles.indexOf(role_name)}, ${employees.indexOf(manager_id) + 1})` 
            } else{
                queryText += `) VALUES ('${first_name}' , '${last_name} , ${roles.indexOf(role_name)}, ${employee.indexOf(manager_id) + 1})`
            }
            console.log(queryText)
            connection.query(queryText, function(error,data){
                if (error) throw error;
                getJob();
            })
        })
    })

}
function search() {
    inquirer
        .prompt(
            {
                name: "db",
                message: 'What would you like to search?',
                type: 'list',
                choices: ['department', 'role', 'employee'],
            }
        ).then(function ({ db }) {
            connection.query(`SELECT * FROM ${db}`, function (err, data) {
                if (err) throw err;

                console.table(data)
                getJob();
            })
        })
}