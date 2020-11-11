function redirectToDash(req, res, next) {
  if (req.session.admin) {
    res.redirect('/dash');
  } else {
    next();
  }
}

module.exports = redirectToDash;
