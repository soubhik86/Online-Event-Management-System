class CheckAuth {
    async chekAuth(req, res, next) {
      try {
        if (req.user) {
          console.log("✅ Welcome Dashboard");
          next();
        } else {
          console.log("❌ Unable to go to the Dashboard");
          res.redirect('/login');
        }
      } catch (error) {
        console.log(error);
        res.redirect('/login');
      }
    }
  }
module.exports=new CheckAuth