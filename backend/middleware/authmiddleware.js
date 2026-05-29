import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistmodel.js";

export const verifyToken=async(req,res,next)=>{    

    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const isBlacklisted=await BlacklistToken.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({message:"Token is invalid"});
        }
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({message:"Unauthorized"});
    }
}