import express from "express"
import connection from '../database.js'
import Joi from "joi"

const app = express()

//Add new Instructor
export function createQuestionMcq(req, res) {
    const questionType = req.body.questionType
    const questionHeader = req.body.questionHeader
    const correctAnswer = req.body.correctAnswer
    const questionBankId = req.body.questionBankId
    const options = req.body.options


    connection.promise()
        .query(`INSERT INTO question(question_type, question_header, correct_answer,
             answer_option_1, answer_option_2, answer_option_3,
              answer_option_4, answer_option_5, answer_option_6,
               answer_option_7, answer_option_8, question_bank_id)
        VALUES('${questionType}','${questionHeader}', '${correctAnswer}',
         '${options.option_1}', '${options.option_2}', '${options.option_3}',
          '${options.option_4}', '${options.option_5}', '${options.option_6}',
           '${options.option_7}', '${options.option_8}', '${questionBankId}')`)
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

export function createQuestionEssay(req, res) {
    const questionType = req.body.questionType
    const questionHeader = req.body.questionHeader
    const correctAnswer = req.body.correctAnswer
    const questionBankId = req.body.questionBankId

    connection.promise()
        .query(`INSERT INTO question (question_type, question_header,
             correct_answer, question_bank_id)
        VALUES('${questionType}','${questionHeader}', '${correctAnswer}', '${questionBankId}')`)
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

export function deleteQuestion (req, res){
    const questionId = req.query.questionId

     connection.promise().query(`
        DELETE FROM question
        WHERE question_id = '${questionId}'
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
                    msg: "No Question with this ID"
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

export function editQuestion (req, res){
    const questionId = req.query.question
    const questionHeader = req.body.questionHeader
    const correctAnswer = req.body.correctAnswer
    const answerOption_1 = req.body.answerOption_1
    const answerOption_2 = req.body.answerOption_2
    const answerOption_3 = req.body.answerOption_3
    const answerOption_4 = req.body.answerOption_4
    const answerOption_5 = req.body.answerOption_5
    const answerOption_6 = req.body.answerOption_6
    const answerOption_7 = req.body.answerOption_7
    const answerOption_8 = req.body.answerOption_8

    const schema = Joi.object().keys({
        questionHeader: Joi.string().required(),
        correctAnswer: Joi.string().required(),
        answerOption_1: Joi.allow(),
        answerOption_2: Joi.allow(),
        answerOption_3: Joi.allow(),
        answerOption_4: Joi.allow(),
        answerOption_5: Joi.allow(),
        answerOption_6: Joi.allow(),
        answerOption_7: Joi.allow(),
        answerOption_8: Joi.allow(),
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
     connection.promise()
        .query(`
        UPDATE question
        SET question_header = '${questionHeader}',
        correct_answer = '${correctAnswer}',
        answer_option_1 = '${answerOption_1}',
        answer_option_2 = '${answerOption_2}',
        answer_option_3 = '${answerOption_3}',
        answer_option_4 = '${answerOption_4}',
        answer_option_5 = '${answerOption_5}',
        answer_option_6 = '${answerOption_6}',
        answer_option_7 = '${answerOption_7}',
        answer_option_8 = '${answerOption_8}'
        WHERE question_id = '${questionId}'
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
