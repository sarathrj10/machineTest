function empProtectDash(req, res, next) {
  if (req.session.employee) {
    next();
  } else {
    res.redirect('/employee/login');
  }
}

module.exports = empProtectDash;
