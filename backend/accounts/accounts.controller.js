const express = require('express');
const router = express.Router();
const Joi = require('joi');
const accountService = require('./account.service');

router.post('/create-user', createUser);
router.get('/get-users', getUsers);
router.post('/get-email', getEmail);
router.post('/get-call-forwarding-number', getCallForwardingNumber);
router.post('/patch-user', patchUser);
router.post('/login-user', loginUser);
router.post('/update-call-forward', updateCallForward);

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

async function getEmail(req, res, next) {

    accountService.getEmail({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

async function getCallForwardingNumber(req, res, next) {

    accountService.getCallForwardingNumber({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

async function patchUser(req, res, next) {

    accountService.patchUser({ data: req.body })
    res.send('Success!')
}

async function loginUser(req, res, next) {

    accountService.loginUser({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

async function updateCallForward(req, res, next) {

    accountService.updateCallForward({ data: req.body }).then(function(val) {
        res.json(val)
    });
}

