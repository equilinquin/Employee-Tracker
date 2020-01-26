const mysql = require("mysql");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const figlet = require("figlet");
const addQuestions = require("./lib/addQuestions");
const viewQuestions = require("./lib/viewQuestions");

const qGeneral = [
  {
    type: "list",
    name: "general",
    message: "What do you want to do?",
    choices: [
      "Add Pirate Crew",
      "Add Roles",
      "Add Crew Member",
      "View Pirate Crews",
      "View Roles",
      "Veiw All Members",
      "Quit"
    ]
  }
];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "liz2007",
  database: "onepiece_db"
});

connection.connect(function(err) {
  if (err) throw err;
  pretty();
  start();
});

function pretty() {
  console.clear();
  figlet("One  Piece", function(err, data) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log(data);
  });
  figlet("Become  a  Pirate!", function(err, data) {
    if (err) {
      console.dir(err);
      return;
    }
    console.log(data);
  });
}

function start() {
  inquirer.prompt(qGeneral).then(ans => {
    switch (ans.general) {
      case "Add Pirate Crew":
        addPirateCrew();
        break;

      case "Add Roles":
        addRoles();
        break;

      case "Add Crew Member":
        addCrewMember();
        break;
      case "View Pirate Crews":
        viewPirateCrew();
        break;

      case "View Roles":
        viewRoles();
        break;

      case "View All Members":
        viewallMembers();
        break;

      case "Quit":
        quit();
        break;
    }
  });
}
