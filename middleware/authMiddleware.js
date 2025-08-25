export const verifyToken = (req,res,next)=>{
    try {
        const token = req.headers.authentication?.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "no token provided"});
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                return res.status(403).json({ message: "invalid token" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({message:"internal server error"});
    }
}