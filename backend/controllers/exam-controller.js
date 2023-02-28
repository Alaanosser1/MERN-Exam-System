import express from "express"
import connection from '../database.js'

const app = express()

//Add new Instructor
export function createExam(req, res) {
    const examName = 'req.body.examName'
    const examDescription = 'req.body.examDescription'
    const examGrade = 'req.body.examGrade'
    
    connection.promise()
        .query(`INSERT INTO exam(exam_name,exam_description, exam_grade)
        VALUES('${examName}','${examDescription}','${examGrade}')`)
        .then(data => {
            res.status(201).json({
                status: "ok",
                msg: "Created"
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}
