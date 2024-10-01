const locals = function(req, res, next) {
    
      res.locals.isAuth = req.session.isAuth,
      res.locals.fullname = req.session.fullname,
    
    next();
  }
  module.exports = locals;