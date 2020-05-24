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