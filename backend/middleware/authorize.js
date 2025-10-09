
export const authenticate = (req,res,next)=>{
    const token = req.cookies.jwt;
    console.log("token :" ,token);
    
  
next();
};



// if(!token){
  //   return res.status(401).json({message: "Unauthorized"});
  // }
  // try {
  //   const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
  //   console.log(decoded);
    
  // } catch (error) {
  //   res.status(402).json({message:""+error.message})
  // }