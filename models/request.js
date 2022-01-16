const { sendFile } = require('express/lib/response');
const db = require('../util/database')

module.exports = class Request { 
  constructor(sir_name,first_name,email,phone_number,mineralName,price,amount,country,date,status,description){
    this.sir_name = sir_name;
    this.first_name = first_name;
    this.email = email;
    this.phone_number = phone_number;
    this.mineralName = mineralName;
    this.price = price;
    this.amount = amount;
    this.country = country;
    this.date = date;
    this.status = status;
    this.description = description; 
  }

  save() {
    console.log('date save: ' + this.date);
    try{
      db.execute('INSERT INTO requests (sir_name, first_name, email, phone_number, mineral_name, price, amount, country, date, status, description) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [this.sir_name, this.first_name, this.email, this.phone_number, this.mineralName, this.price, this.amount, this.country, this.date, this.status, this.description]);
    }catch(err){
      console.log('asdfasdf' + err);
    }
  }

  static fetchAll() {
    try{
       const result =db.execute('SELECT * FROM requests');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static findById(id) {
    return db.execute('SELECT * FROM requests WHERE requests.id = ?', [id]);
  }
};
