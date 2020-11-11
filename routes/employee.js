const express = require('express');

const router = express.Router();
const employeeControllers = require('../app/controllers/employeeController');
// middlewares

// get routes

router.get('/login', employeeControllers().login);
router.get('/dash', employeeControllers().dashboard);

// post routes
router.post('/login', employeeControllers().postLogin);
router.post('/logout', employeeControllers().logout);

module.exports = router;
