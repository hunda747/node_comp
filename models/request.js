const { sendFile } = require('express/lib/response');
const db = require('../util/database')

module.exports = class Request { 
  constructor(sir_name,first_name,email,phone_number,mineralName,price,amount,country,date,status,description,req_type,license_number,mineral_type){
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
    this.req_type = req_type;
    this.license_number = license_number;
    this.mineral_type = mineral_type;
  }

  save() {
    console.log('date save: ' + this.date);
    try{
      db.execute('INSERT INTO requests (sir_name, first_name, email, phone_number, mineral_name, price, amount, country, date, status, description, req_type, response,license_number, mineral_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [this.sir_name, this.first_name, this.email, this.phone_number, this.mineralName, this.price, this.amount, this.country, this.date, this.status, this.description, this.req_type, '', this.license_number, this.mineral_type]);
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
  static fetchNew() {
    try{
       const result =db.execute('SELECT * FROM requests WHERE requests.status = "pending"');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchSearch(name) {
    try{
       const result =db.execute('SELECT * FROM requests WHERE requests.mineral_name = ?', [name]);
       return result;
    }catch(err){
      console.log(err);
    }
  }
  static fetchSearchLicense(name) {
    try{
       const result =db.execute('SELECT * FROM requests WHERE requests.License_number = ?', [name]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static findById(id) {
    return db.execute('SELECT * FROM requests WHERE requests.id = ?', [id]);
  }

  static fetchType() {
    return db.execute('select mineral_type, count(*) as val from component.requests group by mineral_type');
  }

  static changeStatus(response , id) {
    try{
      return db.execute('UPDATE requests SET requests.status = "done", requests.response = ? WHERE (requests.id = ?)', [response, id]);
    }catch(err){
      console.log(err);
    }
  }

};
