const User = require('../models/user');

function userControllers() {
  return {
    redirect(req, res) {
      res.redirect('/employee/login');
    },
    dashboard(req, res) {
      res.render('Employee/dashboard');
    },
    login(req, res) {
      res.render('Employee/login');
    },
    postLogin(req, res) {
      const { empID, password } = req.body;
      User.findOne({ empID }, (err, emp) => {
        if (err) throw err;
        if (emp) {
          if (emp.password === password) {
            req.session.employee = empID;
            res.redirect('/employee/dash');
          } else {
            req.flash('error', 'Invalid EmpID or Password');
            res.redirect('/employee/login');
          }
        } else {
          req.flash('error', 'Invalid EmpID or Password');
          res.redirect('/employee/login');
        }
      });
    },
    logout(req, res) {
      req.session.destroy();
      res.clearCookie('EmployeeCookie');
      res.redirect('/');
    },
  };
}
module.exports = userControllers;
