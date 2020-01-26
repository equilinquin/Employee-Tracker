const qRoles = [
    {
      type: "input",
      name: "roles",
      message: "What role will be added?"
    }
  ]
  
  const qPirates = [
    {
      type:"input",
      name:"pirate_crew",
      message: "What Pirate Crew will be added?"
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
      name: "captain_id",
      message: "Who will be their Captain?",
      choices: [1, 2, 3, 4, 5, 6]
    }
  ]

  module.exports = {qRoles, qPirates, qCrew}