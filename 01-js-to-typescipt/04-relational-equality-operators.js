// Relations or comparison operators

// >  more than
// <  less than
// >= more than equal
// <= less than equal

var result = 10 > 5
console.log(result)

result = 10 < 5
console.log(result)

result = 10 < 10
console.log(result)

result = 10 <= 10
console.log(result)

// Equal operators
var x = 1
//Double equal sign means it's a loose comparison. 
//If value on the left is equal to the value on the right, without validation of the data type
console.log(x == '1') // lose comparison

//Triple equals is more strict comparison when the value on the left should be equal by the value to the right
//and the data type should be the same as the value on the left.
console.log(x === '1') // strict comparison
console.log(x === 1)
