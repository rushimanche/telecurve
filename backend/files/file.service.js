const config = require('config.json');
const mysql = require('mysql');
const AWS = require('aws-sdk');
require('dotenv').config()

module.exports = {
    updateGreeting,
    updateMenu,
    getIVR,
    getIVRDests,
    updateIVRDest,
    getFiles,
    deleteFile,
    retrieveSoundID,
    updateDatabaseWithS3,
    getTemporaryURL,
    getVoicemail,
    updateVoicemail,
    updateS3Signatures
};

AWS.config.update({accessKeyId: process.env.NODE_APP_ACCESS_ID, secretAccessKey: process.env.NODE_APP_ACCESS_KEY})
const s3 = new AWS.S3()


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

function updateGreeting({ data }) {
  const customer_id = data['customer-id'];
  const sound_id = data['sound-id'];
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO ivrs (customer, greeting) VALUES (${customer_id}, ${sound_id}) ON DUPLICATE KEY UPDATE greeting = ${sound_id};`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      resolve('');
    });
  });
}

function updateMenu({ data }) {
  const customer_id = data['customer-id'];
  const sound_id = data['sound-id'];
  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO ivrs (customer, menu) VALUES (${customer_id}, ${sound_id}) ON DUPLICATE KEY UPDATE menu = ${sound_id};`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      resolve('');
    });
  });
}

function updateVoicemail({ data }) {
  const customer_id = data['customer-id'];
  const sound_id = data['sound-id'];
  return new Promise((resolve, reject) => {
    var sql = `UPDATE customers SET voicemail = ${sound_id} WHERE id = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      resolve('');
    });
  });
}

function getIVR({ data }) {
  const customer_id = data['customer-id'];
  return new Promise((resolve, reject) => {
    var sql = `SELECT greeting, menu FROM ivrs WHERE customer = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
}

function getIVRDests({ data }) {
  const customer_id = data['customer-id'];
  return new Promise((resolve, reject) => {
    var sql = `SELECT dtmf, sound FROM ivr_dests WHERE customer = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
}

function updateIVRDest({ data }) {
  const customer_id = data['customer-id'];
  const dtmf_id = data['dtmf-id'];
  const sound_id = data['sound-id'];

  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO ivr_dests (customer, dtmf, sound) VALUES (${customer_id}, ${dtmf_id}, ${sound_id}) ON DUPLICATE KEY UPDATE sound = ${sound_id};`;
    con.query(sql, function (err, result) { 
      if (err) throw err;
      resolve(result);
    });
  });
}



function getFiles({ data }) {
  const customer_id = data['customer-id'];
  return new Promise((resolve, reject) => {
    var sql = `SELECT id, name, s3_url FROM sounds WHERE customer = ${customer_id} ORDER BY name`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      result.unshift({
        'id': null,
        'name': 'NONE',
        's3_url': ''
      })
      resolve(result);
    });
  });
}

function deleteFile({ data }) {
  const customer_id = data['customer-id'];
  const sound_id = data['sound_id'];
  return new Promise((resolve, reject) => {
    var pre_sql = `SELECT DISTINCT ivrs.* FROM ivrs INNER JOIN ivr_dests ON ivr_dests.customer = ivrs.customer WHERE ivrs.customer = ${customer_id} AND ${sound_id} in (ivrs.greeting, ivrs.menu, ivr_dests.sound)`;
    con.query(pre_sql, function (err, pre_result) {
      if (err) throw err;
      if(pre_result.length > 0){
        resolve(false)
      }
      else{
        var sql = `DELETE FROM sounds WHERE id = ${sound_id}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          var params = {  Bucket: process.env.NODE_APP_BUCKET_NAME, Key: "sounds/" + customer_id + "/" + sound_id + ".wav" };
          s3.deleteObject(params, function(err, data) {
            if (err) console.log(err, err.stack);  // error
            else     console.log();                 // deleted
          });
          resolve(true);
        });
      }
    });
  });
}


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
function updateDatabaseWithS3({ data }) {

  const customer_id = data['customer-id'];
  const sound_id = data['sound-id'];
  const s3_location = "s3://" + process.env.NODE_APP_BUCKET_NAME + "/sounds/" + customer_id + "/" + sound_id + ".wav"; 
  const object_url = "https://" + process.env.NODE_APP_BUCKET_NAME + ".s3.amazonaws.com/sounds/" + customer_id + "/" + sound_id + ".wav";

  var data = {
    'customer-id': customer_id,
    'sound-id': sound_id
  };
  
  getDatabaseTemporaryURL(data).then(function(url) {
    if(url) {
      var s3_acess_key = url.substring(url.lastIndexOf("Id=") + 3, url.lastIndexOf("&Expires"));
      var s3_signature = url.substring(url.lastIndexOf("ture=") + 5);
      s3_signature = s3_signature.substring(0, s3_signature.length - 40);
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

function getDatabaseTemporaryURL(data) {

  const customer_id = data['customer-id'];
  const sound_id = data['sound-id'];
  
  return new Promise((resolve, reject) => {
    //get presigned url

    var myBucket = process.env.NODE_APP_BUCKET_NAME;
    var myKey = "sounds/" + customer_id + "/" + sound_id + ".wav"; 
    const signedUrlExpireSeconds = 120;
    try {
      const url = s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        ResponseContentDisposition: 'attachment',
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

function getTemporaryURL({ data }) {

  const customer_id = data['customer-id'];
  const sound_id = data['sound-id'];
  
  return new Promise((resolve, reject) => {
    //get presigned url

    var myBucket = process.env.NODE_APP_BUCKET_NAME;
    var myKey = "sounds/" + customer_id + "/" + sound_id + ".wav"; 
    const signedUrlExpireSeconds = 120;
    try {
      const url = s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        ResponseContentDisposition: 'attachment',
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

function getVoicemail({ data }) {
  const customer_id = data['customer-id'];
  const sound_id = data['sound-id'];
  return new Promise((resolve, reject) => {
    var sql = `SELECT voicemail FROM customers WHERE id = ${customer_id}`;
    con.query(sql, function (err, result) {
      if (err) resolve(false);
      resolve(result);
    });
  });
}

function updateS3Signatures() {
  return new Promise((resolve, reject) => {
    var expired_vals = [];
    var sql = `SELECT id, customer, s3_location, s3_expiration FROM sounds`;
    con.query(sql, function (err, result) {
      if (err) throw err;

      
      let seventyTwoHours = 72 * 60 * 60;
      let nowInSec = parseInt(Date.now() / 1000);
  
      for (let i = 0; i < result.length; i++) {
        if (result[i].s3_expiration > nowInSec - seventyTwoHours) {
          expired_vals.push({"id": result[i].id, "customer": result[i].customer})
          //console.log("The timestamp is less than 72 hours old");
        }
      }

      for (let j = 0; j < expired_vals.length; j++) {

        let data = {
          'customer-id': expired_vals[j].customer,
          'sound-id': expired_vals[j].id
        };  


        getDatabaseTemporaryURL(data).then(function(url) {
          if(url) {
            var s3_acess_key = url.substring(url.lastIndexOf("Id=") + 3, url.lastIndexOf("&Expires"));
            var s3_signature = url.substring(url.lastIndexOf("ture=") + 5);
            s3_signature = s3_signature.substring(0, s3_signature.length - 40);
            var s3_expiration = url.substring(url.lastIndexOf("pires=") + 6, url.lastIndexOf("&Signatur"));
            return new Promise((resolve, reject) => {
              var sql = `UPDATE sounds SET s3_acess_key = '${s3_acess_key}', s3_signature= '${s3_signature}', s3_expiration= '${s3_expiration}' WHERE id = ${data['sound-id']}`;
              con.query(sql, function (err, result) {
                if (err) throw err;
              });
            });
          }
        });
      }
  
      resolve(expired_vals);
    });
  });
}
