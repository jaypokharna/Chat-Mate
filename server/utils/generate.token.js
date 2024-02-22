import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId,res) => {

     const token = jwt.sign({userId},process.env.SECRET_TOKEN,{ expiresIn: "15d" });  //Sign the userId with JWT and
 
     res.cookie("jwt",token,{
          maxAge: 15 * 24 * 60 * 60 * 1000, // cookie expires after a day  
          httpOnly:true,
          secure : false
     })
}

export default generateTokenAndSetCookie;