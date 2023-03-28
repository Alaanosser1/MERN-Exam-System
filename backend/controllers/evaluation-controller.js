import express from "express";
import connection from "../database.js";

const app = express();

export const evaluateQuestions = async (req, res) => {
  const examineeId = req.query.examineeId;
  const examId = req.query.examId;
  let examineeAnswers;
  let isError = false;
  let result = null;

  const getExamineeAnswers = async () => {
    await connection
      .promise()
      .query(
        `
      SELECT examinee_id, examinee_answer.exam_id, question.question_id, question_type,
       examinee_answer, correct_answer, question_header, answer_option_1, answer_option_2, answer_option_3,
       answer_option_4, answer_option_5, answer_option_6, answer_option_7, answer_option_8,grade
        FROM examinee_answer JOIN question
         ON examinee_answer.question_id = question.question_id 
         JOIN exam_has_question
         ON exam_has_question.question_id = examinee_answer.question_id
          WHERE examinee_id = "${examineeId}" AND examinee_answer.exam_id = "${examId}" 
      `
      )
      .then((data) => {
        examineeAnswers = data[0];
      })
      .catch((error) => {
        isError = true;
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  };

  const insertAnswerEvaluation = async (examineeAnswers, Result, i) => {
    await connection
      .promise()
      .query(
        `INSERT INTO answer_evaluation(exam_id, examinee_id, question_id,
             examinee_answer, correct_answer, result, question_type, grade,
              question_header, answer_option_1, answer_option_2,
              answer_option_3, answer_option_4, answer_option_5, answer_option_6,
             answer_option_7, answer_option_8)
          VALUES('${examineeAnswers[i].exam_id}','${examineeAnswers[i].examinee_id}','${examineeAnswers[i].question_id}',
          '${examineeAnswers[i].examinee_answer}','${examineeAnswers[i].correct_answer}','${Result}',
           '${examineeAnswers[i].question_type}','${examineeAnswers[i].grade}','${examineeAnswers[i].question_header}','${examineeAnswers[i].answer_option_1}',
           '${examineeAnswers[i].answer_option_2}','${examineeAnswers[i].answer_option_3}','${examineeAnswers[i].answer_option_4}',
          '${examineeAnswers[i].answer_option_5}','${examineeAnswers[i].answer_option_6}','${examineeAnswers[i].answer_option_7}',
          '${examineeAnswers[i].answer_option_8}'
          )`
      )
      .catch((error) => {
        console.log(error);
        isError = true;
      });
  };
  await getExamineeAnswers();
  for (let i = 0; i < examineeAnswers.length; i++) {
    // console.log(examineeAnswers[i]);
    if (examineeAnswers[i].question_type == "Mcq") {
      if (
        examineeAnswers[i].examinee_answer == examineeAnswers[i].correct_answer
      ) {
        result = "correct";
        await insertAnswerEvaluation(examineeAnswers, result, i);
        console.log("true");
      } else {
        result = "incorrect";
        await insertAnswerEvaluation(examineeAnswers, result, i);
        console.log("false");
      }
    } else {
      await insertAnswerEvaluation(examineeAnswers, result, i);
    }
  }
  if (isError) {
    res.status(500).json({
      status: "error",
      msg: "500 Internal Server Error",
    });
  } else {
    res.status(201).json({
      status: "ok",
      msg: "evaluation done",
    });
  }
};

export const evaluateExam = async (req, res) => {
  const examId = req.query.examId;
  const examineeId = req.query.examineeId;
  let examineeName;
  let examineeType;
  let seniorityNumber;
  let policeNumber;
  let codeNumber;
  let examineeRank;
  let examGrade;
  let examineeTotalGrade = 0;
  let totalCorrectAnswer = 0;
  let totalIncorrectAnswers = 0;
  let totalQuestions = 0;
  let examName;
  let examineeAnswersEvaluation;
  let isError = false;

  try {
    await connection
      .promise()
      .query(
        `
    SELECT * FROM 
    answer_evaluation
    WHERE exam_id = ${examId} AND examinee_id = ${examineeId} 
    `
      )
      .then((data) => {
        examineeAnswersEvaluation = data[0];
        console.log(examineeAnswersEvaluation);
      });
    await connection
      .promise()
      .query(
        `
    SELECT * FROM
    exam_has_question
    WHERE exam_id = ${examId}
    `
      )
      .then((data) => {
        totalQuestions = data[0].length;
      });

    await connection
      .promise()
      .query(
        `
      SELECT * FROM exam
      WHERE exam_id = ${examId}
      `
      )
      .then((data) => {
        examName = data[0][0].exam_name;
        examGrade = data[0][0].exam_grade;
        console.log(examGrade);
      });

    await connection
      .promise()
      .query(
        `
          SELECT * FROM examinee_attempt
          WHERE examinee_id = ${examineeId}
          `
      )
      .then((data) => {
        examineeName = `${data[0][0].examinee_name}`;
        examineeType = `${data[0][0].examinee_type}`;
        seniorityNumber = `${data[0][0].examinee_seniority_number}`;
        policeNumber = `${data[0][0].examinee_police_number}`;
        codeNumber = `${data[0][0].examinee_civilian_number}`;
        examineeRank = `${data[0][0].examinee_rank}`;
        console.log(examineeRank);
      });

    for (let i = 0; i < examineeAnswersEvaluation.length; i++) {
      if (examineeAnswersEvaluation[i].question_type == "Mcq") {
        console.log("mcq");
        if (examineeAnswersEvaluation[i].result == "correct") {
          totalCorrectAnswer += 1;
          examineeTotalGrade += examineeAnswersEvaluation[i].grade;
          console.log(examineeTotalGrade);
        }
      } else if (examineeAnswersEvaluation[i].question_type == "Essay") {
        console.log("essay");
        if (
          examineeAnswersEvaluation[i].grade ==
          examineeAnswersEvaluation[i].manual_grade
        ) {
          totalCorrectAnswer += 1;
          console.log(examineeAnswersEvaluation[i].result);
          examineeTotalGrade += examineeAnswersEvaluation[i].grade;
          console.log(examineeTotalGrade);
        }
      }
    }

    //     console.log(examineeTotalGrade);

    totalIncorrectAnswers = totalQuestions - totalCorrectAnswer;

    await connection.promise().query(`
          INSERT INTO exam_evaluation (exam_id, examinee_id, exam_grade, examinee_total_grade,
               total_exam_questions, total_correct_answers, total_wrong_answers,
                exam_name, examinee_grade, examinee_name, examinee_type, examinee_seniority_number,
                examinee_police_number, examinee_civilian_number, examinee_rank)
          VALUES('${examId}','${examineeId}','${examGrade}','${examineeTotalGrade}',
           '${totalQuestions}', '${totalCorrectAnswer}', '${totalIncorrectAnswers}',
           '${examName}', '${examineeTotalGrade}', '${examineeName}', '${examineeType}',
           '${seniorityNumber}', '${policeNumber}', '${codeNumber}', '${examineeRank}')
          `);
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
      status: 200,
      msg: "Ok evaluated",
    });
  }
};

export const getExamsReport = async (req, res) => {
  //   const instructorId = req.query.instructorId;
  let instructorExams;
  let numberOfQuestions;
  let examEvaluationData;
  let numberOfExamineesExamined;
  let isError = false;
  try {
    await connection
      .promise()
      .query(
        `
      SELECT * FROM exam 
          `
      )
      .then((data) => {
        instructorExams = data[0];
      });

    for (let i = 0; i < instructorExams.length; i++) {
      await connection
        .promise()
        .query(
          `
          SELECT COUNT(question_id) AS numberOfQuestions FROM exam_has_question WHERE exam_id = ${instructorExams[i].exam_id}
              `
        )
        .then((data) => {
          // console.log(data[0])
          numberOfQuestions = data[0][0].numberOfQuestions;

          Object.assign(instructorExams[i], {
            numberOfQuestions: numberOfQuestions,
          });
        });

      await connection
        .promise()
        .query(
          `
          SELECT COUNT(exam_id) AS numberOfExamineesExamined FROM exam_evaluation WHERE exam_id = ${instructorExams[i].exam_id}
              `
        )
        .then((data) => {
          // console.log(data[0])
          numberOfExamineesExamined = data[0][0].numberOfExamineesExamined;

          Object.assign(instructorExams[i], {
            numberOfExamineesExamined: numberOfExamineesExamined,
          });
        });
    }

    console.log(instructorExams);
  } catch (error) {
    isError = true;
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "500 Internal Server Error",
    });
  }

  if (!isError) {
    res.status(200).json({
      reports: instructorExams,
    });
  }
};

export const getExamEvaluationStats = async (req, res) => {
  const examId = req.query.examId;

  await connection
    .promise()
    .query(
      `
    SELECT * FROM exam_evaluation 
    WHERE exam_id = ${examId}
    `
    )
    .then((data) => {
      res.status(200).json({
        examEvaluationStats: data[0],
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

export const getAllExamEvaluationStatsForExaminee = async (req, res) => {
  const examineeId = req.query.examineeId;

  await connection
    .promise()
    .query(
      `
    SELECT * FROM exam_evaluation 
    WHERE examinee_id = ${examineeId}
    `
    )
    .then((data) => {
      res.status(200).json({
        examEvaluationStats: data[0],
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

export const getEachQuestionEvaluationStats = async (req, res) => {
  const examId = req.query.examId;
  const examineeId = req.query.examineeId;
  let examineeAnswersEvaluation;
  let isError = false;
  let examEvaluationStats;

  try {
    await connection
      .promise()
      .query(
        `
    SELECT * FROM 
    answer_evaluation JOIN exam_has_question
    ON exam_has_question.question_id = answer_evaluation.question_id
    AND exam_has_question.exam_id = answer_evaluation.exam_id
    WHERE exam_has_question.exam_id = ${examId} AND answer_evaluation.examinee_id = ${examineeId} 
    `
      )
      .then((data) => {
        examineeAnswersEvaluation = data[0];
      });

    await connection
      .promise()
      .query(
        `
        SELECT * FROM exam_evaluation 
        WHERE exam_id = ${examId} AND examinee_id = ${examineeId}
        `
      )
      .then((data) => {
        examEvaluationStats = data[0];
      });
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
      examineeAnswersEvaluation: examineeAnswersEvaluation,
      examEvaluationStats: examEvaluationStats,
    });
  }
};

export const getExamEvaluationStatsForEachExaminee = async (req, res) => {
  const examId = req.query.examId;

  await connection
    .promise()
    .query(
      `
    SELECT * FROM exam_evaluation 
    WHERE exam_ID = ${examId}
    `
    )
    .then((data) => {
      res.status(200).json({
        examEvaluationStats: data[0],
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
