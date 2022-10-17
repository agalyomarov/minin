module.exports = function (req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};
