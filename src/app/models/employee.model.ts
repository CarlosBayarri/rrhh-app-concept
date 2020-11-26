export class Employee {

    constructor( 
        public id: string, 
        public name: string, 
        public last_name: string, 
        public age: number,
        public department: string,
        public date_discharge: Date) {}
}