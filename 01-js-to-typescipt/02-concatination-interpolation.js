let squad = 'MME'
let nbr = 12
let autom = 'QA'
let messageToPrint1 = 'Dans la squad MME, 12 tests ont été automatisés par les QA'
let messageToPrint2 = 'Dans la squad '+squad+', '+nbr+' tests ont été automatisés par les '+autom // concatenation
let messageToPrint3 = `Dans la squad ${squad}, ${nbr} tests ont été automatisés par les ${autom}` // interpolation
console.log(messageToPrint1)
console.log(messageToPrint1)
console.log(messageToPrint3)
