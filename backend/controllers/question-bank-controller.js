import express from "express";
import connection from "../database.js";
import Joi from "joi";

const app = express();

//Add new Instructor
export const createQuestionBank = (req, res) => {
  const questionBankName = req.body.questionBankName;
  const questionBankDescription = req.body.questionBankDescription;
  const mainQuestionBankId = req.body.mainQuestionBankId;

  console.log(questionBankName, "QuestionBank");

  const schema = Joi.object().keys({
    questionBankName: Joi.string().required(),
    questionBankDescription: Joi.string().required(),
    mainQuestionBankId: Joi.allow(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  connection
    .promise()
    .query(
      `INSERT INTO question_bank(question_bank_name, question_bank_description, main_question_bank_id)
        VALUES('${questionBankName}','${questionBankDescription}', '${mainQuestionBankId}')`
    )
    .then((data) => {
      res.status(201).json({
        status: "ok",
        msg: "Created",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
};

export const getQuestionBanks = async (req, res) => {
  const mainQuestionBankId = req.query.mainQuestionBankId;
  let questionBanks = [];
  let isError = false;
  try {
    await connection
      .promise()
      .query(
        `SELECT * FROM question_bank WHERE main_question_bank_id = '${mainQuestionBankId}'`
      )
      .then((data) => {
        for (let i = 0; i < data[0].length; i++) {
          if (data[0][i].is_deleted == 0) {
            questionBanks.push(data[0][i]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 internal server error",
        });
      });
    for (let i = 0; i < questionBanks.length; i++) {
      await connection
        .promise()
        .query(
          `SELECT COUNT(*) as count FROM question WHERE question_bank_id = ${questionBanks[i].question_bank_id} `
        )
        .then((data) => {
          Object.assign(questionBanks[i], {
            NumberOfQuestions: data[0][0].count,
          });
        });
    }
    console.log(questionBanks, "QuestionBanks");
  } catch (error) {
    isError = true;
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "500 internal server error",
    });
  }
  if (!isError) {
    res.status(200).json({
      questionBanks: questionBanks,
    });
  }
};

export const getQuestions = (req, res) => {
  const questionBankId = req.query.questionBank;
  let questions = [];

  connection
    .promise()
    .query(
      `SELECT * FROM question WHERE question_bank_id = '${questionBankId}'`
    )
    .then((data) => {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].is_deleted == 0) {
          questions.push(data[0][i]);
        }
      }
      res.status(200).send(questions);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};

export const deleteQuestionBank = (req, res) => {
  const questionBankId = req.query.questionBankId;
  connection
    .promise()
    .query(
      `
        UPDATE question_bank
        SET is_deleted = '1'
        WHERE question_bank_id = '${questionBankId}'
        `
    )
    .then((data) => {
      if (data[0].affectedRows != 0) {
        res.status(200).json({
          status: "Ok",
          msg: "Deleted",
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "No Question Bank with this ID",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};

export const editQuestionBank = (req, res) => {
  const questionBankName = req.body.questionBankName;
  const questionBankDescription = req.body.questionBankDescription;
  const questionBankId = req.body.questionBankId;
  const schema = Joi.object().keys({
    questionBankName: Joi.string().min(3).required(),
    questionBankDescription: Joi.string().min(3).required(),
    questionBankId: Joi.allow(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  connection
    .promise()
    .query(
      `
        UPDATE question_bank
        SET question_bank_name = '${questionBankName}',
        question_bank_description = '${questionBankDescription}'
        WHERE question_bank_id = '${questionBankId}'
        `
    )
    .then((data) => {
      if (data[0].affectedRows != 0) {
        res.status(200).json({
          status: "ok",
          msg: "Updated",
        });
      } else {
        res.status(404).json({
          msg: "No Question Bank with that ID",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
};

export const getQuestionBank = (req, res) => {
  const questionBankId = req.query.questionBankId;

  connection
    .promise()
    .query(
      `
  SELECT * FROM question_bank
  WHERE question_bank_id = ${questionBankId}
  `
    )
    .then((data) => {
      res.status(200).json({
        status: "ok",
        questionBank: data[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};
