let userFirstName='Kamala' //over the variable it's defined as a string
let userLirstName='Kamala'
let userAge=60

//userFirstName = 100//number not assignable to type string
//JavaScript does not prevent from changing the types of the data assigned to the variable while the TypeScript doing that

let address: string = 'Trump Tower'
// let room: number= '666'

//own type
type Customer = {
    firstName: string,
    lastName: string,
    active: boolean
}

let newCustomer: Customer = { //the value that can be assign to this variable should only match the type Customer
    firstName: 'Kamala',
    lastName: 'Kamala',
    active: true,
    occupation: 'President'
}
//Type: reduce the number of mistakes that can be makes during the scripting.
//Helps to control the data integrity to make sure that a wrong values not assigned to the variables
//so code will be better protected from crashing during the execution.