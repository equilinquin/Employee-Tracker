const mysql = require('mysql');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

const qDepartment = [
  {
    type: "list",
    name: "pirates",
    message: "What do you want to do?",
    choices: ["Add Pirate crew", "Add Roles", "Add Crew Member", "View Pirate Crews", "View Roles", "Veiw All Members"]
  }
]

const  qRole = [
  {
    type: "list",
    name: "role",
    message: "What role will filled?",
    choices: ["Captain", "Crew Member"]
  },
  {
    type: "input",
    name: "bounty",
    message: "What is the recent bounty?"
  }
]

const qCrew = [
  {
    type: "input",
    name: "fname",
    message: "What is the crew's first name?"
  },
  {
    type: "input",
    name: "lname",
    message: "What is the crew's last name?"
  },
  {
    type: "list",
    name: "captain",
    message: "Who will be theie Captain?",
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

  