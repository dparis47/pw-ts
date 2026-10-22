// Functions are used to organize code into reusable components.
// To use the same feature (i.e. code) over and over again, there's no need to copy and paste the code to invoke that feature, 
// simply call the function responsible for that feature.

helloOne();

//Declarative function
function helloOne() {
    console.log('1- Hello Padawans');
}

helloOne(); // invoking the function 
helloOne();
helloOne();

// helloTwo(); NOT WORKING

//Anonymousfunction
// But in order for this function to work, we need to assign the result of this function to certain variable.
let helloTwo = function() {
    console.log('2- Hello Padawans');
}

helloTwo();
helloTwo();
//The difference between declarative function and anonymous function 
//that declarative function can be called in the beginning of the file,
//even if the function declared in the file a little bit later on.


//ES6 function syntax or arrow function
let helloThree = () => {
    console.log('3- Hello Padawans');
}

helloThree();

//Function with arguments
function printMessage(message, date) {
    console.log(`${date}: ${message}`);
}

printMessage('Hello Padawans from function with argument', '01-01-2025');

//Function with return
function multiplyByTwo(number) {
    const result = number * 2;
    return result
}

const myResult = multiplyByTwo(5)
console.log(myResult)

// l'intérêt d'une fonction, c'est qu'on peut la déclarer et l'utiliser n'importe où dans le projet
// créer un dossier 'helpers'

// import function
import { printAge } from './utils/print-helper.js'
printAge(25) //Error : cannot use import statement outside a module => package.json add "type": "module",

//import entire file
import * as printer from './utils/print-helper.js'
printer.printAge(12)