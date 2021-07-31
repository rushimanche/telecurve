const config = require('config.json');
const mysql = require('mysql');
require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    createUser,
    getUsers,
    patchUser
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
      var sql = `SELECT p.customer, p.fname, p.lname, p.email, p.user, c.name AS organizationName, c.email AS organizationEmail, c.did AS phoneNumber FROM people AS p LEFT JOIN customers AS c ON c.id = p.customer`;
      con.query(sql, function (err, result) {
        if (err) throw err; 
        resolve(result); 
      }); 
    });
}

function patchUser({ data }) {
  const customer_id = data['customer_id'];

  const organizationName = data['organizationName'];
  const organizationEmail = data['organizationEmail'];
  const phoneNumber = data['phoneNumber'];
  const firstName = data['firstName'];
  const lastName = data['lastName'];
  const email = data['email'];
  const username = data['username'];
  const unsalted_password = data['password'];

  if(organizationName) {
    var sql = `UPDATE customers SET name = '${organizationName}' WHERE id = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err; 
    });
  }

  if(organizationEmail) {
    var sql = `UPDATE customers SET email = '${organizationEmail}' WHERE id = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err; 
    });
  }

  if(phoneNumber) {
    var sql = `UPDATE customers SET did = '${phoneNumber}' WHERE id = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err; 
    });
  }

  if(firstName) {
    var sql = `UPDATE people SET fname = '${firstName}' WHERE customer = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err; 
    });
  }

  if(lastName) {
    var sql = `UPDATE people SET lname = '${lastName}' WHERE customer = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err; 
    });
  }

  if(email) {
    var sql = `UPDATE people SET email = '${email}' WHERE customer = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err; 
    });
  }

  if(username) {
    var sql = `UPDATE people SET user = '${username}' WHERE customer = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err; 
    });
  }

  if(unsalted_password) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(unsalted_password, salt, function(err, hash) {
          var sql = `UPDATE people SET secret = '${hash}' WHERE customer = ${customer_id}`;
          con.query(sql, function (err, result) {
          if (err) throw err
          });
      });
    });        
  }
}
