const mysql = require("mysql");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const figlet = require("figlet");

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
      "Update Role",
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

      case "Update Role":
        updateRole();
        break;

      case "Quit":
        quit();
        break;
    }
  });
}

function addPirateCrew() {
  inquirer
    .prompt({
      type: "input",
      name: "pirate_crew",
      message: "What Pirate Crew will be added?"
    })
    .then(ans => {
      const query = "INSERT INTO pirates SET ?";
      connection.query(
        query,
        {
          piratename: ans.pirate_crew
        },
        function(err, res) {
          if (err) throw err;
          start();
        }
      );
    });
}

function addRoles() {
  const query = "SELECT pirates.id, pirates.piratename FROM pirates";
  connection.query(query, function(err, res) {
    if (err) throw err;

    const pirateList = res.map(val => {
      const pirates = {
        piratename: val.piratename
      };
      return pirates;
    });

    inquirer
      .prompt(
        {
          type: "input",
          name: "roles",
          message: "What role will be added?"
        },
        {
          type: "input",
          name: "bounty",
          message: "How much is their bounty?"
        },
        {
          type: "list",
          name: "pirate_id",
          message: "Which crew are they a part of?",
          choices: pirateList
        }
      )
      .then(ans => {
        const query = `INSERT INTO roles(title, bounty, pirates_id) VALUES(${ans.roles}, "${ans.bounty}", (SELECT id FROM pirates WHERE piratename = "${ans.pirate_id}"));`
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.log(ans)
          start();
        });
      });
  });
}


