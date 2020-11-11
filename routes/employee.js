const express = require('express');

const router = express.Router();
const employeeControllers = require('../app/controllers/employeeController');
// middlewares
const redirectToDash = require('../app/middlewares/empRedirectToDash');
const protectDash = require('../app/middlewares/empProtectDash');
// get routes

router.get('/', employeeControllers().redirect);
router.get('/login', redirectToDash, employeeControllers().login);
router.get('/dash', protectDash, employeeControllers().dashboard);

// post routes
router.post('/login', employeeControllers().postLogin);
router.post('/logout', employeeControllers().logout);

module.exports = router;
