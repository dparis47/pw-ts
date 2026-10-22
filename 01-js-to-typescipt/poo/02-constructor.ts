import { Employee } from "./employee";

const employee1 = new Employee('Antoine', 'Dupont');
console.log(`Full name method: ${employee1.getFullName()}`);

console.log(`Full name property: ${employee1.fullName}`);

