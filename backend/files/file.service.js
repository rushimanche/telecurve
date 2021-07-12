const config = require('config.json');
const { custom } = require('joi');
const mysql = require('mysql');

module.exports = {
    retrieveSoundID
};

function retrieveSoundID({ data }) {

  const customer_id = data['customer-id'];
  const file_name = data['file-name'];
  return new Promise((resolve, reject) => {
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
        console.log("Connected to database!");
        var sql = `INSERT INTO sounds (customer, name) VALUES (${customer_id}, '${file_name}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          var sql2 = `SELECT * FROM sounds WHERE customer = ${customer_id} AND name = '${file_name}'`;
          con.query(sql2, function (err2, result2) {
            if (err2) throw err2;
            resolve(result2.slice(-1).pop().id);
          });
        });
    });
  });
}

