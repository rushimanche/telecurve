const config = require('config.json');
const mysql = require('mysql');
const AWS = require('aws-sdk');
require('dotenv').config()

module.exports = {
    retrieveSoundID,
    updateDatabaseWithS3
};

const s3 = new AWS.S3()
AWS.config.update({accessKeyId: process.env.NODE_APP_ACCESS_ID, secretAccessKey: process.env.NODE_APP_ACCESS_KEY})

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
});

function retrieveSoundID({ data }) {

  const customer_id = data['customer-id'];
  const file_name = data['file-name'];
  return new Promise((resolve, reject) => {
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
}

function getPresignedURL(customer_id, sound_id){

  return new Promise((resolve, reject) => {
    //get presigned url

    var myBucket = process.env.NODE_APP_BUCKET_NAME;
    var myKey = "sounds/" + customer_id + "/" + sound_id + ".wav"; 
    const signedUrlExpireSeconds = 60 * 5;
    try {
      const url = s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds
      });
      resolve(url)
    }
    catch {
      console.log('S3 Object does not exist');
      resolve('');
    }
  });

}
function updateDatabaseWithS3({ data }) {

  const customer_id = data['customer-id'];
  const sound_id = data['sound-id'];
  const s3_location = "s3://" + process.env.NODE_APP_BUCKET_NAME + "/sounds/" + customer_id + "/" + sound_id + ".wav"; 
  const object_url = "https://" + process.env.NODE_APP_BUCKET_NAME + ".s3.amazonaws.com/sounds/" + customer_id + "/" + sound_id + ".wav";

  getPresignedURL(customer_id, sound_id).then(function(url) {
    if(url) {
      console.log(url);
      var s3_acess_key = url.substring(url.lastIndexOf("Id=") + 3, url.lastIndexOf("&Expires"));
      var s3_signature = url.substring(url.lastIndexOf("ture=") + 5);
      var s3_expiration = url.substring(url.lastIndexOf("pires=") + 6, url.lastIndexOf("&Signatur"));
      return new Promise((resolve, reject) => {
        var sql = `UPDATE sounds SET s3_location = '${s3_location}', s3_url = '${object_url}', s3_acess_key = '${s3_acess_key}', s3_signature= '${s3_signature}', s3_expiration= '${s3_expiration}' WHERE id = ${sound_id}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          var output = 'File S3 Data Succesfully Updated!'
          resolve(output);
        });
      });
    }
  });

}

