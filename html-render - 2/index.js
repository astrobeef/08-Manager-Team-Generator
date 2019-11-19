// NPM Modules
const inquirer = require("inquirer");

// Local Modules
const render = require("./lib/htmlrenderer");

// Constructors
const Manager = require("./lib/constructors/Manager");
const Engineer = require("./lib/constructors/Engineer");
const Intern = require("./lib/constructors/Intern");

// Global Variables
const test_teamMembers = [
  new Manager("Brent", 1, "brent@trilogyed.com", 200),
  new Engineer("Tucker", 2, "tbeauchamp@2u.com", "tuckerbeauchamp"),
  new Intern("Becky", 3, "becky@becky.com", "UofA"),
  new Intern("Shelly", 4, "shelly@shelly.com", "UofA")
];

const teamMembers = [];


const questions = {
  Q_Constructor: {
    type: "list",
    name: "constructor",
    message: "Who would you like to add to your team?",
    choices: ["Manager", "Engineer", "Intern", "No one"]
  },
  Q_Manager: [
    {
      type: "input",
      name: "name",
      message: "What is the name of the manager?"
    },
    {
      type: "number",
      name: "id",
      message: "What is his/her ID?"
    },
    {
      type: "input",
      name: "email",
      message: "What is his/her email?"
    },
    {
      type: "number",
      name: "officeNumber",
      message: "What is his/her office number?"
    }
  ],
  Q_Engineer: [
    {
      type: "input",
      name: "name",
      message: "What is the name of the engineer?"
    },
    {
      type: "number",
      name: "id",
      message: "What is his/her ID?"
    },
    {
      type: "input",
      name: "email",
      message: "What is his/her email?"
    },
    {
      type: "input",
      name: "github",
      message: "What is his/her github link?"
    }],
  Q_Intern: [
    {
      type: "input",
      name: "name",
      message: "What is the name of the intern?"
    },
    {
      type: "number",
      name: "id",
      message: "What is his/her ID?"
    },
    {
      type: "input",
      name: "email",
      message: "What is his/her email?"
    },
    {
      type: "input",
      name: "school",
      message: "What is his/her school name?"
    }
  ]
}

let isBuildingTeam = true;

async function promptBuild() {
  while (isBuildingTeam) {

    await inquirer.prompt(questions.Q_Constructor).then(async function (ans) {
      console.log(ans);

      let memberAnswers;
      let newMember;

      switch (ans.constructor) {
        case ("Manager"):
          memberAnswers = await buildMember(ans.constructor, questions.Q_Manager);
          newMember = new Manager(memberAnswers.name, memberAnswers.id, memberAnswers.email, memberAnswers.officeNumber);
          break;
        case ("Engineer"):
          memberAnswers = await buildMember(ans.constructor, questions.Q_Engineer);
          newMember = new Engineer(memberAnswers.name, memberAnswers.id, memberAnswers.email, memberAnswers.github);
          break;
        case ("Intern"):
          memberAnswers = await buildMember(ans.constructor, questions.Q_Intern);
          newMember = new Intern(memberAnswers.name, memberAnswers.id, memberAnswers.email, memberAnswers.school);
          break;
        case ("No one"):
          console.log("Ending loop");
          console.log("-----------");
          isBuildingTeam = false;
          return null;
      }

      console.log(newMember);
      teamMembers.unshift(newMember);
      console.log(teamMembers);
    })

  }

  init();
  
}

async function buildMember(pConstructor, pQuestions) {

  const answers = await inquirer.prompt(pQuestions).then(function (ans) {
    return ans;
  })

  return answers;
}

promptBuild();

async function init() {
  console.log("Init running");
  render(teamMembers);
}
