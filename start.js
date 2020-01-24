const mysql = require('mysql');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

const qDepartment = [
  {
    type: "list",
    name: "department",
    message: "What department are you adding to?",
    choices: ["Store Support", "Prepared Foods", "Bakery", "Grocery", "Produce", "Specialty"]
  }
]

const  qRole = [
  {
    type: "list",
    name: "role",
    message: "What role will filled?",
    choices: ["Alternate Team Leader", "Supervisor", "Team Trainer", "Team Member"]
  },
  {
    type: "input",
    name: "salary",
    message: "What is the starting salary?"
  }
]

const qEmployee = [
  {
    type: "input",
    name: "fname",
    message: "What is the employee first name?"
  },
  {
    type: "input",
    name: "lname",
    message: "What is the employee last name?"
  },
  {
    type: "list",
    name: "manager",
    message: "Who will be the manager?",
    choices: []
  }
]

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Gemini1989*",
    database: "top_songsDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
  });

  