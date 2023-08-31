const {verify} = require("jsonwebtoken");
const validateToken = (req , res , next)=>{
const validToken = req.header("accessToken");
if(!validToken){res.json({error:"You are not logged in"})};
try{
    const accessToken = verify(validToken,"secret");
    req.user = accessToken;
    if(accessToken){
        next();
    }
}catch(err){
    res.json({error:"Token invalid , register and log in"});
}
}
module.exports = {validateToken};