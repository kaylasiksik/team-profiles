const inquirer = require('inquirer');
const generateHTML = require('./src/page-template')
const { writeFile, copyFile } = require('./utils/generate-site.js')

const Employee = require('./lib/Intern')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

let globalTeamDetails = {
    Manager: {},
    Engineers: [],
    Interns: []
}

const employeePromptDetails = (employeeType) => {
    const employeeName = {
        type: 'input',
        name: 'name',
        message: `Please enter ${employeeType} name`,
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter manager name');
              return false;
            }
        }
      }
    const employeeId = {
        type: 'input',
        name: 'id',
        message: `Enter ${employeeType}'s employee ID`,
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log("Enter manager's employee ID");
              return false;
            }
        }
      }
    const employeeEmail = {
        type: 'input',
        name: 'email',
        message: `Enter ${employeeType}'s email address`,
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log(`Enter ${employeeType}'s email address`);
              return false;
            }
        }
      }

    return {employeeName, employeeId, employeeEmail}
}

const managerPrompts = () => {
    const employeePrompts = employeePromptDetails('Manager')

    return inquirer
        .prompt([
            employeePrompts.employeeName,
            employeePrompts.employeeId,
            employeePrompts.employeeEmail,
            {
                type: 'input',
                name: 'office',
                message: `Please enter manager's office number`,
                validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log('Please enter manager name');
                      return false;
                    }
                }
              },
              {
                type: 'list',
                name: 'nextEmployee',
                message: 'Choose to add an Engineer, an Intern, or complete your team',
                choices: ['Engineer', 'Intern', 'My team is complete!']
              }
        ])
}

const engineerPrompts = () => {
    const employeePrompts = employeePromptDetails('Engineer')

    return inquirer
        .prompt([
            employeePrompts.employeeName,
            employeePrompts.employeeId,
            employeePrompts.employeeEmail,
            {
                type: 'input',
                name: 'github',
                message: `Please enter engineer's github username`,
                validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log(`Please enter engineer's github username`);
                      return false;
                    }
                }
              },
              {
                type: 'list',
                name: 'nextEmployee',
                message: 'Choose to add an Engineer, an Intern, or complete your team',
                choices: ['Engineer', 'Intern', 'My team is complete!']
              }
        ])
}

const internPrompts = () => {
    const employeePrompts = employeePromptDetails('Intern')

    return inquirer
        .prompt([
            employeePrompts.employeeName,
            employeePrompts.employeeId,
            employeePrompts.employeeEmail,
            {
                type: 'input',
                name: 'school',
                message: `Please enter intern's school`,
                validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log(`Please enter intern's school`);
                      return false;
                    }
                }
              },
              {
                type: 'list',
                name: 'nextEmployee',
                message: 'Choose to add an Engineer, an Intern, or complete your team',
                choices: ['Engineer', 'Intern', 'My team is complete!']
              }
        ])
}

const userPrompt= (employeeType) => {
    switch(employeeType){
        case 'Manager':
            return managerPrompts();
        case 'Intern':
             return internPrompts();
        case 'Engineer':
             return engineerPrompts();
    }
}

const updateGlobalData = (employeeType, employee) => {
    switch(employeeType) {
        case 'Manager':
            const manager = new Manager(employee.name, employee.id, employee.email,employee.office);
            globalTeamDetails.Manager = manager;
            break;
        case 'Intern':
            const intern = new Intern(employee.name, employee.id, employee.email,employee.school);
            globalTeamDetails.Interns.push(intern);
            break;
        case 'Engineer':
            const engineer = new Engineer(employee.name, employee.id, employee.email,employee.github);
            globalTeamDetails.Engineers.push(engineer);
            break;
    }
}

const recursiveFunction = (employeeType) => {
    userPrompt(employeeType).then(results => {
        updateGlobalData(employeeType, results);
        console.log(`${results.name} has been added as a ${employeeType}`);
        if (results.nextEmployee !== 'My team is complete!') {
            recursiveFunction(results.nextEmployee)
        } else {
            console.log('Your team is complete! Please find your team portfolio in dist/index.html');
            const myHTML = generateHTML(globalTeamDetails);
            writeFile(myHTML).then(copyFile())

        }
    })
}

recursiveFunction('Manager');