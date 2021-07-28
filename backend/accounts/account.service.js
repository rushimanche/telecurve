const config = require('config.json');
const mysql = require('mysql');
require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    createUser,
    getUsers
};

const { host, port, user, password, database } = config.database;
let con = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
});
con.connect(function(err) {
  if (err) throw err;
});

function createUser({ data }) {
  const organizationName = data['organizationName'];
  const organizationEmail = data['organizationEmail'];
  const phoneNumber = data['phoneNumber'];
  const firstName = data['firstName'];
  const lastName = data['lastName'];
  const email = data['email'];
  const username = data['username'];
  const unsalted_password = data['password'];
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO customers (name, email, did) VALUES ('${organizationName}', '${organizationEmail}', ${phoneNumber})`;
    con.query(sql, function (err, result) {
        if (err) resolve(false)
        var sql2 = `SELECT id FROM customers WHERE email = '${organizationEmail}'`;
        con.query(sql2, function (err, result) {
            if (err) resolve(false)
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(unsalted_password, salt, function(err, hash) {
                    var sql3 = `INSERT INTO people (customer, fname, lname, email, user, secret) VALUES (${result[0].id}, '${firstName}', '${lastName}', '${email}', '${username}', '${hash}')`;
                    con.query(sql3, function (err, result) {
                    if (err) resolve(false)
                    resolve(true);
                    });
                });
            });        
        });

    });
  });
}

function getUsers() {
    return new Promise((resolve, reject) => {
      var sql = `SELECT customer, user FROM people`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
  }