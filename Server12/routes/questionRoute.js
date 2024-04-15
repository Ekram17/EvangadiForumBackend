// const express = require('express')
// const router = express.Router()
// const {postQuestion,allQuestion}= require('../controller/questionController')


// router.post("/postquestions",postQuestion)

// router.get("/all-questions",allQuestion)

// module.exports= router


const express = require("express");
const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// userController
const { postQuestion ,allQuestion } = require("../controller/questionController");

// question route
router.post("/postquestions", postQuestion);
router.get("/getquestions", allQuestion);

// router.post("/questions", authMiddleware, postQuestion);

module.exports = router;