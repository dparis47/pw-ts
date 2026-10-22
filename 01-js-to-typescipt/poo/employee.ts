//package.json remove "type":"module",
// à la racine command pour init tsconfig.json
// tsc --init

export class Employee {//PascalCase

    //propriétés
    // firstName: string;
    // lastName: string;

    // firstName: string = 'Victor';
    // lastName: string ='Wembanyama';

    // firstName!: string;//not null ou optionnel avec ?
    // lastName!: string;
    salary!: number;
    daysOff: string[] = [];
    birthday!: Date;
    //constructor
    fullName!: string;


    // un seul constructeur
    constructor(firstName: string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.setFullName(firstName, lastName);
    }

    static group = 'MBE';
    static company = 'Prestashop';

    //1- constructeur
    firstName: string;
    lastName: string;

    // constructor() {
    //     this.firstName = 'Victor';
    //     this.lastName = 'Wembanyama';
    // }

    //static
    // static getFullName(): string {
    //     return `${Employee.firstName} ${Employee.lastName.toUpperCase()}`;
    // }


    setFullName(firstName: string, lastName:string): void {
        this.fullName = `${this.firstName} ${this.lastName.toUpperCase()}`;
    }

    //transform getter after constructor & setFullName
    getFullName(): string {
        return `${this.firstName} ${this.lastName.toUpperCase()}`;
    }


    //5
    // increaseSalary(percent: number) {
    //     if(percent > 0 && percent <= 100) {
    //         const amount = this.salary * (percent/100);
    //         this.salary+= amount;
    //     }
    // }

    //6
    // increaseSalary(percent?: number) {
    //     if(percent){
    //         if(percent > 0 && percent <= 100) {
    //             const amount = this.salary * (percent/100);
    //             this.salary+= amount;
    //         }
    //     } else {
    //         this.salary += this.salary*0.02;
    //     }
    // }

    //7
    /**
     * 
     * @param percent default 2%
     */
    increaseSalary(percent: number = 2) {
            if(percent > 0 && percent <= 100) {
                const amount = this.salary * (percent/100);
                this.salary+= amount;
            }
    }

    //8
    takeDaysOff(...days: string[]): void {
        days.forEach(day => {
            //vérifie si le jour n'a pas déjà été pris
            // let foundDay = false;
            // for(let dayOff of this.daysOff){
            //     if(dayOff === day) {
            //         foundDay = true;
            //     } 
            // }
            // if(!foundDay) {
            //     this.daysOff.push(day);
            // }

            //devient
            const availableDay = this.daysOff.every(dayOff => {
                return day !== dayOff;
            });
            if(availableDay) {
                this.daysOff.push(day);
            }
        })
    }

    //9 signature de méthode et surcharge
    setBirthday(birthday: Date): void;
    setBirthday(value: string): void;
    setBirthday(birthday: any): void {
        if(birthday instanceof Date) {
            this.birthday = birthday;
        }

        if(typeof birthday === 'string') {
            this.birthday = new Date(birthday);
        }
    };
}