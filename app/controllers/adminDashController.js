const User = require('../models/user');

function adminDashControllers() {
  return {
    dashboard(req, res) {
      User.find({}, (err, employees) => {
        res.render('Admin/dashboard', { employees });
      });
    },
    async addEmployee(req, res) {
      const {
        firstName, lastName, empID, password,
      } = req.body;
      await User.exists({ empID }, (err, result) => {
        if (result) {
          req.flash('error', 'Employee already exists');
          res.redirect('/dash');
        } else {
          const user = new User({
            firstName, lastName, empID, password,
          });
          user.save().then(() => {
            res.redirect('/dash');
          });
        }
      });
    },
    async employeeDelete(req, res) {
      const { empID } = req.body;
      await User.findOneAndDelete({ empID }, (err) => {
        if (err) throw err;
        res.redirect('/dash');
      });
    },
  };
}
module.exports = adminDashControllers;
