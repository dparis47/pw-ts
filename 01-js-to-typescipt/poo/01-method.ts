import { Employee } from "./employee";

// //1- instance de class
// const employee1 = new Employee();
// const employee2 = new Employee();
// console.log(employee1 === employee2)//false chaque instance est indépendante des autres

// //2- une fois l'instance de class créée, il est possible d'assigner des valeurs aux propriétés
// employee1.firstName = 'Antoine';
// employee1.lastName = 'Dupont';

// console.log(employee1.firstName);
// console.log(employee1.lastName);

// console.log(employee2.firstName);
// console.log(employee2.lastName);

// //3- assigner des valeurs par default
// const employee3 = new Employee();
// console.log(employee3.firstName);
// console.log(employee3.lastName);

// //4- méthode
// const employee4 = new Employee();
// console.log(employee4.firstName);
// console.log(employee4.lastName);
// const fullName = employee4.getFullName();
// console.log(fullName);

// //5- méthode avec paramètre dont l'appel peut modifier l'instance qui l'appelle
// const employee5 = new Employee();
// employee5.firstName = 'Charles';
// employee5.firstName = 'Durant';
// employee5.salary = 1500;

// employee5.increaseSalary(10);
// console.log(`Le mois prochain votre salaire sera de ${employee5.salary}€`);

// //6- méthode avec paramètre optionnel
// const employee6 = new Employee();
// employee6.firstName = 'Charles';
// employee6.firstName = 'Durant';
// employee6.salary = 1500;

// employee6.increaseSalary();
// console.log(`Augmentation annuelle par defaut de 2% ${employee5.salary}€`);

// employee6.increaseSalary(5);
// console.log(`Finalement après négo, l'augmentation sera de 5% ${employee5.salary}€`);

// //7- méthode avec paramètre par default
// const employee7 = new Employee();
// employee7.firstName = 'Charles';
// employee7.firstName = 'Durant';
// employee7.salary = 1500;

// employee7.increaseSalary();//pas de valeur de paramètre mais 2% par default
// console.log(`Augmentation annuelle par defaut de 2% ${employee7.salary}€`);

// employee7.increaseSalary(5);
// console.log(`Finalement après négo, l'augmentation sera de 5% ${employee7.salary}€`);

// //8- opérateur 'rest' ...: cela permet un nombre infini de valeurs, la méthode récupère un tableau
// const employee8 = new Employee();
// employee8.firstName = 'Big';
// employee8.firstName = 'Lebowski';
// employee8.salary = 1500;

// const firstDay = "2024/12/24";
// const secondDay = "2024/12/26";
// employee8.takeDaysOff(firstDay, secondDay);

// console.log(`days off: ${employee8.daysOff}`);

// employee8.takeDaysOff(secondDay);
// employee8.takeDaysOff('2024/12/31');

// console.log(`days off NEW: ${employee8.daysOff}`);


//9- surcharge de méthode: différentes variantes de la même méthode
// une méthode est définie par sa signature (unique dans la class) ie son nom + le type de ses paramètres
// const employee9 = new Employee();
// employee9.firstName = 'The Jesus';
// employee9.firstName = 'Rolls';
// employee9.salary = 1500;

// employee9.setBirthday('December 15, 1998 08:00:00');
// console.log(employee9.birthday);

// employee9.setBirthday(new Date('April 19, 1999 10:00:00'));
// console.log(employee9.birthday);


//constructeur avec paramètres
// const employee = new Employee('Victor', 'Wembanyama');
// console.log(`Constructeur avec params ${employee.getFullName()}`)

//constructeur & methods
// const employee = new Employee('Victor', 'Wembanyama');
// console.log(`Constructeur & methods ${employee.getFullName()}`)

//methode static
// const fullName = Employee.getFullName('Victor', 'Wembanyama');
// console.log(`Appel d'une méthode static ${fullName}`)

//proriété static
// Employee.firstName = 'Victor';
// Employee.lastName =  'Wembanyama';

// console.log(`Appel des propriétés static ${Employee.getFullName()}`);

