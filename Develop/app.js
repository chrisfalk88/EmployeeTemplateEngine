const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function manager() {
    // object destructure way
    //const {managerName, managerID, managerEmail, managerOfficeNumber} = await inquirer.prompt([
  const response = await inquirer.prompt([
    // Manager Questions
    {
      type: "input",
      message: "What is the Managers name?",
      name: "managerName",
    },
    {
      type: "input",
      message: "What is the Managers ID?",
      name: "managerID",
    },
    {
      type: "input",
      message: "What is the Managers email?",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "What is the Managers office number?",
      name: "managerOfficeNumber",
    },
  ]);
  console.log(response);
  const manager1 = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOfficeNumber);
  console.log(manager1);
  teamArray.push(manager1);
  console.log(teamArray);

  async function addEmployee() {
  //wrap this in function
  const next = await inquirer.prompt({
    type: "confirm",
    message: "Would you like to add an Employee? ",
    name: "add"
  }) 
  //console.log(next);
  if (next.add) {
      //where well putt another inquirer.prompt gather employee details
      const newEmp = await inquirer.prompt([ 
          {
          type: "confirm",
          message: "Is this new Employee an Engineer?",
          name: "add"
          }
      ])
      console.log(newEmp);
      console.log(newEmp.add);
      if (newEmp.add){
        console.log("i selected an engineer and im going to add him here")

        const engineer = await inquirer.prompt([ 
          {
          type: "input",
          message: "Is the Engineer's Name?",
          name: "engName"
          },
          {
            type: "input",
            message: "What is the Engineer's ID?",
            name: "engID",
          },
          {
            type: "input",
            message: "What is the Engineer's email?",
            name: "engEmail",
          },
          {
            type: "input",
            message: "What is the Engineers GitHub username?",
            name: "engGithub"
          }
      ])
        console.log(engineer);
        const enginner1 = new Engineer(engineer.engName, engineer.engID, engineer.engEmail, engineer.engGithub);
        console.log(enginner1);

        teamArray.push(enginner1);
        console.log(teamArray);

      } else if (!newEmp.add) {
        console.log("looks like you want an intern");

        const intern = await inquirer.prompt([ 
          {
          type: "input",
          message: "Is the intern's Name?",
          name: "intName"
          },
          {
            type: "input",
            message: "What is the intern's ID?",
            name: "intID",
          },
          {
            type: "input",
            message: "What is the intern's email?",
            name: "intEmail",
          },
          {
            type: "input",
            message: "What is the intern's school?",
            name: "intSchool"
          }
      ])
        console.log(intern);
        const intern1 = new Intern(intern.intName, intern.intID, intern.intEmail, intern.intSchool);
        console.log(intern1);

        teamArray.push(intern1);
        console.log(teamArray);
      }

      // gather input until N is selected  
      addEmployee();


  } else {
      console.log(teamArray);
      writefiles();
      return 
    }
   
  }

  //call add employee after gather manager input
  addEmployee();

  //render here
 

}

manager();

 async function writefiles() {
  fs.writeFile('team.html', render(teamArray), 'utf-8', (err) => {
    if (err) throw err;
  });
}


//Another inquireer to ask about Employyes

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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
