const express = require('express');
const router = express.Router();
const Joi = require('joi');
const fileService = require('./file.service');

router.post('/retrieve-sound-id', retrieveSoundID);

module.exports = router;

async function retrieveSoundID(req, res, next) {
    
    fileService.retrieveSoundID({ data: req.body }).then(function(val) {
        res.json(val)
    });
}
