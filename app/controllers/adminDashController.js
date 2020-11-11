function adminDashControllers() {
  return {
    dashboard(req, res) {
      res.render('Admin/dashboard');
    },
  };
}
module.exports = adminDashControllers;
