// Object: is an entity that can hold multiple values at the same time.

let customer = {
    firstName: 'John', // pair of key/value
    lastName: 'Doe',
    //a ajouter après avoir vu les array
    items: ['item 1', 'item 2', 'item 3']
}

console.log(customer)
console.log(customer.firstName)
console.log(customer['lastName'])

console.log(`First name: ${customer.firstName}`)

//how to change any values inside our object?
customer.firstName = 'Paul'
console.log(`First name: ${customer.firstName}`)
customer['lastName'] = 'Silver'
console.log(`Last name: ${customer.lastName}`)

console.log(`Full name: ${customer.firstName} ${customer.lastName}`)

// Arrays :  is another type of the entity, which is a list of items that you want to save, 
//           and they are just placed inside of the array as an order

let items = ['item 1', 'item 2', 'item 3'] // index [0, 1, 2]
console.log(items[0])
console.log(items[1])
console.log(items[2])
// console.log(items[3])
console.log('---')
items[1] = 'new item 2'
console.log(items[1])

console.log(customer.items[0])