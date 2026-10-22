//keyword 'export': function can be used outside of this file
export function printAge(age){
    console.log(age)
}

//class and method is another form of abstraction in JavaScript similarly like to the function to create reusable components of the code, 
//but organize it a little bit differently.

export class CustomerDetails {
// class CustomerDetails {

    printFirstName(firstName) {
        console.log(`FirstName is: ${firstName}`)
    }

    /**
     * This method will print the last name
     * @param {string} lastName 
     */
    printLastName(lastName) {
        console.log(`LastName is:  ${lastName}`)
    }
}

// export const customerDetails = new CustomerDetails()