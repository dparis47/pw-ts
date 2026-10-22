
//loop -100 à 100
for(let index = -100; index <= 100; index++) {
    console.log(`index = ${index}`);
}

let array1 = ['item 1', 'item 2', 'item 3']; // index [0, 1, 2]
console.log(array1.length);

for(let index = 0; index < array1.length; index++) {
    console.log(`index = ${index} and item = ${array1[index]}`);
}

for(let item of array1){
    console.log(item);
    if(item == 'item 2') {
        break;
    }
}

let nbrs = [1, 5, 8, 9, 15, 33]; 
// loop afficher les nombres pairs


//ES6 syntax for each loop
array1.forEach( item => {
    console.log(item);
    if(item == 'item 2') {
        console.log('Found!!!');
        // break;
    }
})

