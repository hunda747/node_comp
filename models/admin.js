const { sendFile } = require('express/lib/response');
const db = require('../util/database')

module.exports = class Request { 
  constructor(username, password){
    this.username = username;
    this.password = password;
  }

  save() {
   try{
    db.execute('INSERT INTO admin (username, password) VALUES (?,?)', [this.username, this.password]);
  }catch(err){
    console.log('asdfasdf' + err);
  }
  }

  static fetchAll(username){
   return db.execute('SELECT * FROM admin WHERE username = ? ', [username]);
  }
}