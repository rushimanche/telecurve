const express = require('express');
const router = express.Router();
const Joi = require('joi');
const accountService = require('./account.service');

router.post('/create-user', createUser);
router.get('/get-users', getUsers);
router.post('/patch-user', patchUser);

module.exports = router;

async function createUser(req, res, next) {

    accountService.createUser({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

async function getUsers(req, res, next) {

    accountService.getUsers().then(function(val) {
        res.json(val)
    });
}

async function patchUser(req, res, next) {

    accountService.patchUser({ data: req.body })
    res.send('Success!')
}
