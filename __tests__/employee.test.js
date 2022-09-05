
const Employee = require('../lib/Employee');

test('create a new employee object', () => {
    const employee = new Employee('Kayla','001','kayla.annee99@gmail.com');

    expect(employee.name).toBe('Kayla');
    expect(employee.id).toBe('001');
    expect(employee.email).toBe('rkayla.annee99@gmail.com');
});

test('tests employee methods', () => {
    const employee = new Employee('Kayla','001','kayla.annee99@gmail.com');

    expect(employee.getName()).toBe('Kayla');
    expect(employee.getId()).toBe('001');
    expect(employee.getEmail()).toBe('kayla.annee99@gmail.com');
    expect(employee.getRole()).toBe('Employee');
});