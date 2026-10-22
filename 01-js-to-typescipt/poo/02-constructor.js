"use strict";
exports.__esModule = true;
var employee_1 = require("./employee");
var employee1 = new employee_1.Employee('Antoine', 'Dupont');
console.log("Full name method: ".concat(employee1.getFullName()));
console.log("Full name property: ".concat(employee1.fullName));
