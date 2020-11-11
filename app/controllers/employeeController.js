function userControllers() {
  return {
    dashboard(req, res) {
      res.render('Employee/dashboard');
    },
    login(req, res) {
      res.render('Employee/login');
    },
    postLogin(req, res, next) {
     
    },
    logout(req, res) {
      
    },
  };
}
module.exports = userControllers;
