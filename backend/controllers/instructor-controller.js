import express from "express"
import connection from '../database.js'

const app = express()

//Add new Instructor
export function addInstructor(req, res) {
     connection.promise().query(`INSERT INTO instructor(instructor_fname,instructor_lname,instructor_username,instructor_password)
            VALUES('alaa','nosser','alaanosser','pass')`)
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
