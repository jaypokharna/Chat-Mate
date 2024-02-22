import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

const protectRoute =async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error : "Unauthorized Access"})
        }

        const decoded = jwt.verify(token,process.env.SECRET_TOKEN); // checking the validity of the token 

        if(!decoded){
            return res.status(401).json({error : "Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({error : "User not found"})
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware" , error.message)
        res.status(500).json({error : "Internal server erorr !"})
    }
}

export default  protectRoute;