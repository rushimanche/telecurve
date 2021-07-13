const express = require('express');
const router = express.Router();
const Joi = require('joi');
const fileService = require('./file.service');

router.post('/retrieve-sound-id', retrieveSoundID);
router.post('/update-database-with-s3', updateDatabaseWithS3);


module.exports = router;

async function retrieveSoundID(req, res, next) {
    
    fileService.retrieveSoundID({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

async function updateDatabaseWithS3(req, res, next) {
    
    fileService.updateDatabaseWithS3({ data: req.body })
    res.json('File Successfully Uploaded!')
}

