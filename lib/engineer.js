class Engineer {
    constructor(name, id, email){
      this.name = name;
      this.id = id;
      this.email = email;
    };
    getName() {
        return this.name;
    };
    getRole() {
        return 'Engineer';
    };
    getEmail() {
        return this.email;
    };
    getId () {
        return this.id;
    };
}

module.exports = Engineer;