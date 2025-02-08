import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authMiddleware = async(req, res, next) =>{
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({ message: 'No token, authorization denied' });
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    if(!decode) return res.status(401).json({ message:"User is not authorized"});

    const user = await User.findById(decode._id).select("-password");
    if(!user) return res.status(401).json({ message:"User is not authorized"});
    req.user = user;
    next();
}