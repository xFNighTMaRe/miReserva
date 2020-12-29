export class Restaurant {
    constructor(
        public name:string,
        public address:string,
        public addressnumber:string,
        public city:string,
        public postalcode:string,
        public mail:string,
        public telephone:string,
        public capacity:number,
        public password:string,
        public food:string,
        public banner?:string,
        public logo?:string,
        public latitude?:number,
        public longitude?:number){}
}
