// logical "AND"
// L'opérateur logique AND, défini par une double esperluette &, ' +
// Il permet de combiner deux ou plusieurs expressions logiques.
// On peut définir comme "toutes les valeurs doivent être vraies pour que l'expression soit vraie"

console.log(true && true) // all values have to be TRUE for expression to be TRUE
console.log(true && false)

// logical "OR"
console.log(true || false) // any value should be TRUE for the expression to be TRUE

let isMoreThanSeventeen = true
let isUECitizen = true

let isEligilityForDriverLicense = isMoreThanSeventeen && isUECitizen
console.log('He is eligible for license driver: ' + isEligilityForDriverLicense)

let havePassport = true
let havePI = true
let hasPIOrPassport = havePassport || havePI
console.log('has an identity card or passport: ' + hasPIOrPassport)

let isValid = true
let canPassCheckpoint1 = hasPIOrPassport && isValid
let canPassCheckpoint2 = (havePassport || havePI) && isValid
console.log('Can pass the checkpoint: ' + canPassCheckpoint)