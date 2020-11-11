function empRedirectToDash(req, res, next) {
  if (req.session.employee) {
    res.redirect('/employee/dash');
  } else {
    next();
  }
}

module.exports = empRedirectToDash;
