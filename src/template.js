const createEmployee = employee => {
    let listItem3 = ''
      switch (employee.getRole()) {
        case 'Manager':
            listItem3 = `Office number: ${employee.getOffice()}`
            break;
        case 'Engineer':
            listItem3 = `GitHub: <a href="https://github.com/${employee.getGitHub()}" target="_blank">${employee.getGitHub()}</a>`
            break;
        case 'Intern':
            listItem3 = `School: ${employee.getSchool()}`
            break;
      }
    return `
    <div class="employee-card col-7 col-md-5 d-flex flex-wrap justify-content-center mb-3">
        <div class="employee-header col-12 text-left">
            <h2>${employee.getName()}</h2>
            <h3>${employee.getRole()}</h3>
        </div>
        <div class="pt-1 pb-1">
            <ul class="list-group">
                <li class="list-group-item">
                ID: ${employee.getId()}
                </li>
                <li class="list-group-item">
                email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a>
                </li>
                <li class="list-group-item">
                ${listItem3}
                </li>
            </ul>
        </div>
    </div>
    `
  }
  
  const generateHTML = employeeData => {
      let employeeCards = [];
      employeeCards.push(createEmployee(employeeData.Manager))
      employeeData.Engineers.map(engineer => {
        employeeCards.push(createEmployee(engineer));
          return;
      })
      employeeData.Interns.map(intern => {
        employeeCards.push(createEmployee(intern));
        return;
    })
      return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <link rel="stylesheet" type ="text/css" href="assets/style.css">
            <title>Team Profiles</title>
        </head>
        <body>
            <nav class="navbar d-flex justify-content-center mb-4">
                <span class="h3 text-center">My Team</span>
            </nav>
            <div class="employee-cards d-flex row justify-content-around flex-wrap"> 
            ${employeeCards.join('')}
            </div>
        </body>
        </html>
      `
  }

  module.exports = generateHTML;