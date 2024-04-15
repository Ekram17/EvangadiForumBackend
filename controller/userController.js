// db connection

const dbConnection = require('../db/dbConfig')
const bcrypt = require('bcrypt')
const {StatusCodes} = require('http-status-codes')

const jwt  = require("jsonwebtoken")


async function register(req,res) {
    const {username, firstname,lastname,email,password } = req.body;

    if (!email || !password || !firstname || !lastname || !username) {return res.status(StatusCodes.BAD_REQUEST).json({ msg:'      provide all required fields' })
    }
    

    try {

        const [user] = await dbConnection.query("select username,usersid from users where username = ? or email =?" , [username, email])
        if (user.length > 0) {
           return res.status(StatusCodes.BAD_REQUEST).json({msg: "user already existed"})
        }
        if (password.length <= 8) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "password must be atleast 8 characters"})
        }

        // encrypt the password
        const salt = await bcrypt.genSalt(10)

        const hashedpasword = await bcrypt.hash(password, salt)

    

        console.log("Before query execution");
        await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)", [username, firstname, lastname, email, hashedpasword])
        console.log("After query execution");
        return res.status(StatusCodes.CREATED).json({ msg: "user register"})


    } catch (error) {
        console.log("Error:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong, try again later",})
    }
    
    // try {
    //     await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)", [username, firstname, lastname, email, password])
    //     console.log(query);
    //     return res.status(201).json({ msg: "user created"})

    // }catch (error) {
    //     console.log(error.message)
    //     return res.status(500).json({ msg: "something went wrong, try again later"})
    // }
}


async function login(req,res) {
const {email, password} = req.body;
if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({error: "please enter all required fields"});

}
try {
    const [user] = await dbConnection.query("SELECT username,usersid, password from users where email=?",[email])
    //  return res.status(StatusCodes.OK).json({msg:user})
    if(user.length == 0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
    } 
    console.log(user)

    // compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "invalid credential"});
    }

    const username = user[0].username
    const usersid = user[0].usersid;
    const token = jwt.sign({ username, usersid}, process.env.JWT_SECRET, {expiresIn: "1d"})

    return res.status(StatusCodes.OK).json({ msg: "user login successful", token})


} catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "something went wrong, try again later!"})
    
}

}

async function checkuser(req,res) {
    const username = req.user.username
    const usersid = req.user.usersid
console.log(req.user)
  res.status(StatusCodes.OK).json({ msg: "valid user",username,usersid})

}

module.exports = {register, login, checkuser}