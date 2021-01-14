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
            {
              type: "list",
              message: "Employee Role:",
              choices: [Manager, Engineer, Intern],
              name: "role",
              default: "Manager, Engineer, Intern",
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
                  finalArray.push(manager);
                  generateTeam();
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
// After the user has input all employees desired, call the `render` function (required
generateTeam();
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const produceHTML = (savingString) => {
  fs.writeFile("./output/team.html", savingString, (err) => {
    if (err) throw err;
    console.log(`File successfully saved`);
  });
};
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
