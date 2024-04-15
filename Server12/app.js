const express = require('express');
require('dotenv').config()
const app = express();
const port = 8000;
const cors= require('cors')


// db connection
const dbConnection = require('./db/dbConfig')

// user routes middleware file
const userRoutes = require('./routes/userRoute')

// user routes middleware file
const questionsRoutes = require('./routes/questionRoute')
const answersRoutes = require('./routes/answerRoute')
app.use(cors())

// json middleware to extract json data
app.use(express.json())

// user routes middleware
app.use ('/api/users', userRoutes)

// questions routes middleware??
    app.use("/api/questions", questionsRoutes)

// answer routes middleware??
app.use("/api/answers", answersRoutes)

async function start() {
try{
    const result = await dbConnection.execute("select 'test' ")
    app.listen(port)
    console.log('database connection established')
    console.log(`listening on ${port}`)
        }catch (Error) {
            
    console.log(Error.message)
    }
}

start()




