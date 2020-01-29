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
      "View All Members",
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
  // start();
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
  start();
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
        viewAllMembers();
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
    .prompt(
      {
      type: "input",
      name: "pirate_crew",
      message: "What Pirate Crew will be added?"
    }
    )
    .then(ans => {
      const query = `INSERT INTO pirates(piratename) VALUES(${ans.pirate_crew})`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("You added a Pirate Crew");
        start();
      });
    });
};

function addRoles() {
  const query = "SELECT pirates.piratename FROM pirates";
  connection.query(query, function(err, res) {
    if (err) throw err;
    const pirateList = [];
    res.map(val => {
      const pirates = {
        name: val.piratename
      };
      pirateList.push(pirates.name);
    });
    inquirer
      .prompt([
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
      ])
      .then(ans => {
        const query = `INSERT INTO roles(title, bounty, pirates_id) 
        VALUES("${ans.roles}", ${ans.bounty}, (SELECT id FROM pirates WHERE piratename = "${ans.pirate_id}"))`;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.log("You added new role");
          start();
        });
      });
  });
};

function addCrewMember() {
  const query = "SELECT title FROM roles";
  connection.query(query, function(err, res) {
    if (err) throw err;
    const rolesList = [];
    res.map(val => {
      const roles = {
        name: val.title
      };
      rolesList.push(roles.name);
    });

    const query =
      "SELECT first_name, last_name FROM crew WHERE captain_id IS NULL";
    connection.query(query, function(err, res) {
      if (err) throw err;

      const capList = [];
      res.map(val => {
        const cap = {
          name: val.first_name
        };
        capList.push(cap.name);
      });
      console.log(capList);

      inquirer
        .prompt([
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
            name: "role",
            message: "What will their role be?",
            choices: rolesList
          },
          {
            type: "list",
            name: "captain_id",
            message: "Who will be their Captain?",
            choices: capList
          }
        ])
        .then(ans => {
          const role = `SELECT id FROM roles WHERE title = "${ans.role}"`;
          const captain = `SELECT id FROM (SELECT * FROM (SELECT id FROM crew WHERE first_name = "${ans.captain_id}")AS X) AS X`;
          const query = `INSERT INTO crew(first_name, last_name, roles_id, captain_id)
        VALUES ("${ans.fname}", "${ans.lname}"(${role}), (${captain}))`;
          connection.query(query, function(err, res) {
            if (err) throw err;
            console.log("You added new Crew Member");
            start();
          });
        });
    });
  });
};

function viewPirateCrew() {
  const query = "SELECT * FROM pirates";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

function viewRoles() {
  const query = "SELECT * FROM roles";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllMembers() {
  const query = 'SELECT * FROM crew';
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

function updateRole() {
  const query = 'SELECT title FROM roles'
  connection.query(query, function(err, res) {
    if(err) throw err;
    const rolesList = [];
    res.map(val => {
      const roles = {
        name: val.title
      };
      rolesList.push(roles.name);
    });
    const query2 = 'SELECT first_name, last_name FROM crew'
    connection.query(query2, function(err, res) {
      if(err) throw err;

      const nameList = [];
      res.map(val => {
        const names = {
          name: val.first_name + " " + val.last_name
        };
        nameList.push(names.name);
      });
      inquirer.prompt([
        {
          type: "list",
          name: "name",
          message: "Who's role will be changed?",
          choices: nameList
        },
        {
          type: "list",
          name: "role",
          message: "What role will they be?",
          choices: rolesList

        }
      ])
      .then(ans => {
        const query = `UPDATE crew SET roles_id = (SELECT id FROM roles WHERE title = "${ans.role}") WHERE first_name AND last_name = "${ans.name}"`
        connection.query(query, function(err, res) {
          if(err) throw err;
          console.log("You have updated crew member")
          start();
        })
      })
    });
  });
};

function quit() {
  connection.end();
}
