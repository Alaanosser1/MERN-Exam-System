import express from "express"
import {createQuestionMcq, createQuestionEssay, editQuestion, deleteQuestion} from '../controllers/question-controller.js'

const questionRouter = express.Router()

questionRouter.post('/createQuestionMcq', createQuestionMcq)
questionRouter.post('/createQuestionEssay', createQuestionEssay)
questionRouter.put('/editQuestion', editQuestion)
questionRouter.delete('/deleteQuestion', deleteQuestion)


export default questionRouter