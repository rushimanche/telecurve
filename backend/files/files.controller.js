const express = require('express');
const router = express.Router();
const Joi = require('joi');
const fileService = require('./file.service');

router.post('/get-files', getFiles);
router.post('/get-temporary-url', getTemporaryURL);
router.post('/delete-file', deleteFile);
router.post('/retrieve-sound-id', retrieveSoundID);
router.post('/update-database-with-s3', updateDatabaseWithS3);


module.exports = router;


async function getFiles(req, res, next) {
    
    fileService.getFiles({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

async function deleteFile(req, res, next) {
    
    fileService.deleteFile({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

async function retrieveSoundID(req, res, next) {
    
    fileService.retrieveSoundID({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

async function updateDatabaseWithS3(req, res, next) {
    
    fileService.updateDatabaseWithS3({ data: req.body })
    res.json('File Successfully Uploaded!')
}

async function getTemporaryURL(req, res, next) {
    fileService.getTemporaryURL({ data: req.body }).then(function(val) {
        res.json(val)
    });
} 