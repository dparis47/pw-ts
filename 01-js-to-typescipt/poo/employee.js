"use strict";
//package.json remove "type":"module",
// à la racine command pour init tsconfig.json
// tsc --init
exports.__esModule = true;
exports.Employee = void 0;
var Employee = /** @class */ (function () {
    // un seul constructeur
    function Employee(firstName, lastName) {
        this.daysOff = [];
        this.firstName = firstName;
        this.lastName = lastName;
        this.setFullName(firstName, lastName);
    }
    // constructor() {
    //     this.firstName = 'Victor';
    //     this.lastName = 'Wembanyama';
    // }
    Employee.getFullName = function () {
        return "".concat(Employee.firstName, " ").concat(Employee.lastName.toUpperCase());
    };
    Employee.prototype.setFullName = function (firstName, lastName) {
        this.fullName = "".concat(this.firstName, " ").concat(this.lastName.toUpperCase());
    };
    //transform getter after constructor & setFullName
    Employee.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName.toUpperCase());
    };
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
    Employee.prototype.increaseSalary = function (percent) {
        if (percent === void 0) { percent = 2; }
        if (percent > 0 && percent <= 100) {
            var amount = this.salary * (percent / 100);
            this.salary += amount;
        }
    };
    //8
    Employee.prototype.takeDaysOff = function () {
        var _this = this;
        var days = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            days[_i] = arguments[_i];
        }
        days.forEach(function (day) {
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
            var availableDay = _this.daysOff.every(function (dayOff) {
                return day !== dayOff;
            });
            if (availableDay) {
                _this.daysOff.push(day);
            }
        });
    };
    Employee.prototype.setBirthday = function (birthday) {
        if (birthday instanceof Date) {
            this.birthday = birthday;
        }
        if (typeof birthday === 'string') {
            this.birthday = new Date(birthday);
        }
    };
    ;
    Employee.group = 'MBE';
    Employee.company = 'Prestashop';
    return Employee;
}());
exports.Employee = Employee;
