# Template_Engine

## Description

This application is a CLI that allows you to put your entire programming team's information in one place. Allowing a manager to enter into their employees' name, email address, ID, and role. Depending on that role it will ask you for specific information. Like your Engineers' GitHub username, which will also create a link to their GitHub account. Along with your Interns' graduate school and their accompanying degree if they have one to boste of. As well as your own office number to show which office your team is based in. It will then put each persons info onto an individual card for easy access and accessibility. All processes have built-in tests for fully fledged out functionality.

```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```

### Screenshots and Video

- Vid: https://drive.google.com/file/d/1zqoLuBRbd09DQLYuD0fy1eA95Q4apHqW/view
- Pic:

### Dependencies:

- [jest](https://jestjs.io/) for running the provided tests
- [inquirer](https://www.npmjs.com/package/inquirer) for collecting input from the user.

### File/Folder Layout

```
lib/           // classes and helper code
output/        // rendered output
templates/     // HTML template(s)
test/          // jest tests
  Employee.test.js
  Engineer.test.js
  Intern.test.js
  Manager.test.js
app.js         // Runs the application
```

### Classes and File Content

Classes: `Employee`, `Manager`, `Engineer`, `Intern`.

`Employee`

- name
- id
- email
- getName()
- getId()
- getEmail()
- getRole() // Returns 'Employee'

`Manager`

- officeNumber

- getRole() // Overridden to return 'Manager'

`Engineer`

- github // GitHub username

- getGithub()

- getRole() // Overridden to return 'Engineer'

`Intern`

- school

- getSchool()

- getRole() // Overridden to return 'Intern'

### User input

Prompts the user to build an engineering team. An engineering
team consists of a manager, and any number of engineers and interns.

### Roster output

Generates a `team.html` page in the `output` directory, that displays a nicely formatted team roster. Each team member displays the following in no particular order:

- Name

- Role

- ID

- Role-specific property (School, link to GitHub profile, or office number)
