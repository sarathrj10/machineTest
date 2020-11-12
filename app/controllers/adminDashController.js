const moment = require('moment');
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
          const date = moment().format('DD/MM/YYYY');
          const user = new User({
            firstName, lastName, empID, password, date,
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
    dateFilter(req, res) {
      const dateArray = [];
      const from = new Date(req.body.from);
      const to = new Date(req.body.to);
      function getDates(from, to) {
        return new Promise((resolve) => {
          let currentDate = moment(from);
          const stopDate = moment(to);
          while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('DD/MM/YYYY'));
            currentDate = moment(currentDate).add(1, 'days');
          }
          resolve();
        });
      }

      function sendData(dateArray) {
        const datas = [];
        return new Promise((resolve) => {
          dateArray.forEach(async (date) => {
            await User.find({ date }, (err, data) => {
              if (data.length > 0) {
                data.forEach((ele) => {
                  if (ele != null) datas.push(ele);
                });
              }
            });
            resolve(datas);
          });
        });
      }
      getDates(from, to).then(sendData(dateArray).then((datas) => {
        res.json(datas);
      }));
    },
  };
}
module.exports = adminDashControllers;
