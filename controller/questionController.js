const dbConnection = require('../db/dbConfig')

async function postQuestion(req,res){
    const {questionid,usersid,title,description,tag}=req.body;
    if(!questionid || !usersid || !title || !description || !tag){
       return res.status(400).json({msg:"please provide all required fields"})
    }

 try {
 await dbConnection.query("INSERT INTO questions (questionid,usersid,title,description,tag) VALUES (?,?,?,?,?)",[questionid,usersid,title,description,tag])
 return res.status(201).json({msg:"question posted redirected to home"})
    
 } catch (error) {
    console.log(error.message)
    return res.status(500).json({msg:"something went wrong, try again later"})
 }

}
async function allQuestion(req,res){
    
    try {
  
      const [allquestion] = await dbConnection.query(`
      SELECT q.questionid, q.usersid, q.title, q.description, u.username
      FROM questions q
      JOIN users u ON q.usersid = u.usersid
      ORDER BY q.id DESC
  `);

 
     return res.status(200).json({msg:"all question retrieved succesfully",allquestion})
     
    } catch (error) {
     console.log(error.message)
     return res.status(500).json({msg:"something went wrong, try again later"})
    }
  
  }


module.exports = {postQuestion,allQuestion};