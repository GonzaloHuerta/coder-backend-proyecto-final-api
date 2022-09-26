export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Is auth true: ", req.isAuthenticated())
    console.log("User session ID: ", req.session.passport.user);
    return next();
  }else{
    console.log("Is auth false: ", req.isAuthenticated())
    res.status(401).json({ message: "No autorizado" });
  }
};
