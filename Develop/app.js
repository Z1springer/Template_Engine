const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const finalArray = [];

function generateTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Finished adding members to your team?",
        name: "out",
        choices: ["YES", "NO"],
      },
    ])
    .then((confirm) => {
      if (confirm.out === "NO") {
        inquirer
          .prompt([
            {
              type: "list",
              message: "Employee Role:",
              choices: ["Manager", "Engineer", "Intern"],
              name: "role",
              default: "Manager, Engineer, Intern",
            },
            {
              type: "input",
              message: "Employee Name:",
              name: "name",
              default: "Name of Employee",
            },
            {
              type: "input",
              message: "Employee Email:",
              name: "email",
              default: "email@email.com",
            },
            {
              type: "input",
              message: "Employee ID:",
              name: "id",
              default: "1,2,3,4,5",
            },
          ])
          .then((data) => {
            if (data.role === "Manager") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "Office Number:",
                    name: "officeNum",
                    default: "###",
                  },
                ])
                .then((manage) => {
                  const manager = new Manager(
                    data.name,
                    data.id,
                    data.email,
                    manage.officeNum
                  );
                  if (
                    finalArray.find((element) => element.role === "Manager")
                  ) {
                    console.log("One Manager at a time please!");
                    generateTeam();
                  } else {
                    finalArray.push(manager);
                    generateTeam();
                  }
                });
            } else if (data.role === "Engineer") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "GitHub User:",
                    name: "github",
                    default: "GitHubUser",
                  },
                ])
                .then((engine) => {
                  const engineer = new Engineer(
                    data.name,
                    data.id,
                    data.email,
                    engine.github
                  );
                  finalArray.push(engineer);
                  generateTeam();
                });
            } else if (data.role === "Intern") {
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "School and Degree:",
                    name: "school",
                    default: "Graduate of SchoolName with a DegreeName",
                  },
                ])
                .then((student) => {
                  const intern = new Intern(
                    data.name,
                    data.id,
                    data.email,
                    student.school
                  );
                  finalArray.push(intern);
                  generateTeam();
                });
            }
          });
      } else {
        produceHTML(render(finalArray));
      }
    });
}
generateTeam();

const produceHTML = (savingString) => {
  fs.writeFile("./output/team.html", savingString, (err) => {
    if (err) throw err;
    console.log(`File successfully saved`);
  });
};
