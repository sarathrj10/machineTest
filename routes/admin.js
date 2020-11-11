const express = require('express');

const router = express.Router();
const adminAuthControllers = require('../app/controllers/adminAuthController');
const adminDashControllers = require('../app/controllers/adminDashController');
// middlewares
const redirectToDash = require('../app/middlewares/redirectToDash');
const protectDash = require('../app/middlewares/protectDash');

// get routes

router.get('/', redirectToDash, adminAuthControllers().login);
router.get('/dash', protectDash, adminDashControllers().dashboard);

// post routes

router.post('/', adminAuthControllers().postLogin);

module.exports = router;
