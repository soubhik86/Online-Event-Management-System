const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config()

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

 

module.exports=createToken
 