function adminAuthControllers() {
  return {
    login(req, res) {
      res.render('Admin/login');
    },
    postLogin(req, res) {
      const { username, password } = req.body;
      if (username === 'admin' && password === 'admin') {
        req.session.admin = username;
        res.redirect('/dash');
      } else {
        req.flash('error', 'Invalid username or password');
        res.redirect('/');
      }
    },
    logout(req, res) {
        
    },
  };
}
module.exports = adminAuthControllers;
