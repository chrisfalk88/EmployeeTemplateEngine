// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// i am not 100% how super works? is this taking from the Employee class so i dont need to this.name etc on here? except for github?
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getRole() {

    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;