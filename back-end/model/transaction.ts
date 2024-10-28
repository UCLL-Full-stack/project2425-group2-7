export class Transaction{
    id: number;
    type: 'Purchase'| 'Sale' | 'Trade';
    date: Date;
    constructor(transaction:{id: number, type:'Purchase'| 'Sale' | 'Trade',date:Date}){
        this.id = transaction.id;
        this.type = transaction.type;
        this.date = transaction.date;
    }
    getId(): number{
        return this.id
    }
    getType(): 'Purchase'| 'Sale' | 'Trade'{
        return this.type
    }
    getDate(): Date{
        return this.date
    }

}