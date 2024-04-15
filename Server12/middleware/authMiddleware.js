const jwt = require('jsonwebtoken')
async function authMiddleware (req,res,next){
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({msg:'Authentication invalid'})
  }
  const token = authHeader.split(' ')[1]
  console.log(token)
  
  try {
    //const {username,userid:usersid}=jwt.verify(token,process.env.JWT_SECRET)
    const user=jwt.verify(token,process.env.JWT_SECRET)
    req.user=user
    console.log(user)


    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({msg:'Authentication invalid........'})
  }
}

module.exports=authMiddleware