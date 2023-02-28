import express from "express"
import {addInstructor} from '../controllers/instructor-controller.js'

const instructorRouter = express.Router()
instructorRouter.get('/addInstructor', addInstructor)


export default instructorRouter
