import express from "express"
import connection from '../database.js'
import Joi from 'joi'

const app = express()

//Add new Instructor
export function createQuestionBank(req, res) {
    const questionBankName = req.body.questionBankName
    const questionBankDescription = req.body.questionBankDescription
    const schema = Joi.object().keys({
        questionBankName: Joi.string().min(3).required(),
        questionBankDescription: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
    connection.promise()
        .query(`INSERT INTO question_bank(question_bank_name, question_bank_description)
        VALUES('${questionBankName}','${questionBankDescription}')`)
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
export function getQuestionBanks (req, res){

         connection.promise().query(`SELECT * FROM question_bank`)
            .then(data => {
                console.log(data[0])
                res.status(200).send(data[0])
            }).catch(error=>{
                res.status(500).json({
                status: "error",
                msg: "500 internal server error"
            }) 
        })

}

export function getQuestions (req, res){
    const questionBankId = req.query.questionBank

    connection.promise().query(`SELECT * FROM question WHERE question_bank_id = '${questionBankId}'`)
       .then(data => {
           console.log(data[0])
           res.status(200).send(data[0])
       }).catch(error=>{
        console.log(error)
           res.status(500).json({
           status: "error",
           msg: "500 internal server error"
       })
   })
}

export function deleteQuestionBank (req, res){
    const questionBankId = req.query.questionBankId
     connection.promise().query(`
        DELETE FROM question_bank
        WHERE question_bank_id = '${questionBankId}'
        `)
        .then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "Ok",
                    msg: "Deleted"
                })
            } else {
                res.status(404).json({
                    status: "error",
                    msg: "No Question Bank with this ID"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({

                status: "error",
                msg: "500 internal server error"
            })
        })
}
export function editQuestionBank (req, res){
    const questionBankName = req.body.questionBankName
    const questionBankDescription = req.body.questionBankDescription
    const questionBankId = req.query.questionBank
    const schema = Joi.object().keys({
        questionBankName: Joi.string().min(3).required(),
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
     connection.promise()
        .query(`
        UPDATE questionbank
        SET question_bank_name = '${questionBankName}',
        question_bank_description = ${questionBankDescription}
        WHERE QuestionBank_ID = '${questionBankId}'
        `)
        .then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "ok",
                    msg: "Updated"
                })
            } else {
                res.status(404).json({
                    msg: "No Question Bank with that ID"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

