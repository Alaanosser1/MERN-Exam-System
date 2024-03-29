import connection from "../database.js";

export const createExam = (req, res) => {
  const examName = req.body.examName;
  const examDescription = req.body.examDescription;
  const mainClubId = req.body.mainClubId;
  const subClubId = req.body.subClubId;
  const subjectId = req.body.subjectId;
  const startDate = new Date(req.body.startDate);
  const showTimeOption = req.body.showTimeOption;
  // const startDate = req.body.startDate.replace("Z", " ").replace("T", " ");
  const endDate = new Date(req.body.endDate);
  const examTime = Math.floor(req.body.examTime / 60000);

  let startDateFormatted =
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    startDate.getDate() +
    " " +
    startDate.getHours() +
    ":" +
    startDate.getMinutes() +
    ":" +
    startDate.getSeconds();

  let endDateFormatted =
    endDate.getFullYear() +
    "-" +
    (endDate.getMonth() + 1) +
    "-" +
    endDate.getDate() +
    " " +
    endDate.getHours() +
    ":" +
    endDate.getMinutes() +
    ":" +
    endDate.getSeconds();

  console.log(startDateFormatted, endDateFormatted);

  connection
    .promise()
    .query(
      `INSERT INTO exam(exam_name,exam_description,
         main_club_id, sub_club_id, start_date_time, end_date_time, exam_time, subject_id, show_time)
        VALUES('${examName}','${examDescription}','${mainClubId}', '${subClubId}',
         '${startDateFormatted}', '${endDateFormatted}', '${examTime}', '${subjectId}',
          '${showTimeOption}')`
    )
    .then((data) => {
      res.status(201).json({
        status: "ok",
        msg: "Created",
        data: data,
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

export const editExam = (req, res) => {
  const examName = req.body.examName;
  const examDescription = req.body.examDescription;
  const examGrade = req.body.examGrade;
  const examId = req.body.examId;
  const schema = Joi.object().keys({
    examName: Joi.string().min(3).required(),
    examDescription: Joi.string().min(3).required(),
    examGrade: Joi.allow(),
    examId: Joi.allow(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  connection
    .promise()
    .query(
      `
        UPDATE exam
        SET exam_name = '${questionBankName}',
        exam_description = '${questionBankDescription}',
        exam_grade = '${questionBankDescription}'
        WHERE exam_id = '${examId}'
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
          msg: "No exam with that ID",
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

export const deleteExam = (req, res) => {
  const examId = req.query.examId;
  console.log(examId, "IDIDIDI");
  connection
    .promise()
    .query(
      `
          UPDATE exam
          SET is_deleted = '1'
          WHERE exam_id = '${examId}'
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
          msg: "No exam with this ID",
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

export const getExams = async (req, res) => {
  // const subClubId = req.query.subClubId;
  let exams = [];
  let isError = false;
  await connection
    .promise()
    .query(
      `SELECT * FROM exam JOIN sub_club ON exam.sub_club_id = sub_club.sub_club_id `
    )
    .then((data) => {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].is_deleted == 0) {
          exams.push(data[0][i]);
        }
      }
      console.log(exams, "EXAMS");
    })
    .catch((error) => {
      isError = true;
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
  for (let i = 0; i < exams.length; i++) {
    await connection
      .promise()
      .query(
        `SELECT COUNT(*) as count FROM exam_has_question WHERE exam_id = ${exams[i].exam_id} `
      )
      .then((data) => {
        Object.assign(exams[i], {
          NumberOfQuestions: data[0][0].count,
        });
      })
      .catch((error) => {
        isError = true;
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 internal server error",
        });
      });
  }

  if (!isError) {
    res.status(200).json({
      exams: exams,
    });
  }
};

export const getExamsOfClub = async (req, res) => {
  const subClubId = req.query.subClubId;
  let exams = [];
  let isError = false;
  await connection
    .promise()
    .query(
      `SELECT * FROM exam 
      JOIN subject ON  exam.subject_id = subject.subject_id 
      WHERE exam.sub_club_id = '${subClubId}'`
    )
    .then((data) => {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].is_deleted == 0) {
          exams.push(data[0][i]);
        }
      }
      console.log(exams, "EXAMS");
    })
    .catch((error) => {
      isError = true;
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
  for (let i = 0; i < exams.length; i++) {
    await connection
      .promise()
      .query(
        `SELECT COUNT(*) as count FROM exam_has_question WHERE exam_id = ${exams[i].exam_id} `
      )
      .then((data) => {
        Object.assign(exams[i], {
          NumberOfQuestions: data[0][0].count,
        });
      })
      .catch((error) => {
        isError = true;
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 internal server error",
        });
      });
  }

  if (!isError) {
    res.status(200).json({
      exams: exams,
    });
  }
};

export const getExamQuestions = (req, res) => {
  const examId = req.query.examId;

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  connection
    .promise()
    .query(
      `
    SELECT * FROM exam_has_question 
    JOIN question ON question.question_id = exam_has_question.question_id
    WHERE exam_has_question.exam_id = ${examId}
    `
    )
    .then((data) => {
      console.log(data[0], "examQUESTIONS");
      res.status(200).json({
        questions: shuffleArray(data[0]),
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};

export const removeQuestionFromExam = (req, res) => {
  const examId = req.query.examId;
  const questionId = req.query.questionId;

  connection
    .promise()
    .query(
      `
    DELETE FROM exam_has_question
    WHERE exam_id = ${examId} AND question_id = ${questionId}
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
          msg: "No Question in this exam with this ID",
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

export const assignQuestionToExam = (req, res) => {
  const questionId = req.body.questionId;
  const examId = req.body.examId;
  const grade = req.body.grade;

  connection
    .promise()
    .query(
      `
      INSERT INTO exam_has_question(exam_id, question_id, grade)
      VALUES('${examId}','${questionId}', '${grade}')
               `
    )
    .then((data) => {
      res.status(201).json({
        status: "ok",
        msg: "Assigned",
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

export const getQuestionBankQuestionsToAddQuestionsToExam = (req, res) => {
  const questionBankId = req.query.questionBankId;
  const examId = req.query.examId;
  let questionBankQuestions;
  let examQuestions;

  const combineQuestionBankQuestionsAndExamQuestions = () => {
    for (let i = 0; i < questionBankQuestions.length; i++) {
      Object.assign(questionBankQuestions[i], {
        isQuestionInExam: false,
      });
      for (let j = 0; j < examQuestions.length; j++) {
        if (
          questionBankQuestions[i].question_id == examQuestions[j].question_id
        ) {
          Object.assign(questionBankQuestions[i], {
            isQuestionInExam: true,
          });
          console.log(
            questionBankQuestions[i].question_id,
            examQuestions[j].question_id,
            "FOUND"
          );
        }
      }
    }
    return questionBankQuestions;
  };

  connection
    .promise()
    .query(
      `SELECT * FROM question WHERE question_bank_id = '${questionBankId}'`
    )
    .then((data) => {
      questionBankQuestions = data[0];
      connection
        .promise()
        .query(
          `
        SELECT * FROM exam_has_question 
        WHERE exam_id = ${examId}
        `
        )
        .then(async (data) => {
          examQuestions = data[0];
          await combineQuestionBankQuestionsAndExamQuestions();
          res.status(200).json({
            questionBankQuestions:
              combineQuestionBankQuestionsAndExamQuestions(),
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            status: "error",
            msg: "500 internal server error",
          });
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

export const calculateExamTotalGrade = (req, res) => {
  const examId = req.query.examId;
  let examQuestions;
  let totalGrade = 0;

  const calculate = async (examQuestions) => {
    for (let i = 0; i < examQuestions.length; i++) {
      totalGrade += examQuestions[i].grade;
    }
  };

  const updateExamGrade = async () => {
    connection
      .promise()
      .query(
        `
      UPDATE exam
      SET
      exam_grade = '${totalGrade}'
      WHERE exam_id = '${examId}'
      `
      )
      .then((data) => {
        res.status(200).json({
          status: "ok",
          msg: "Updated",
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

  connection
    .promise()
    .query(
      `
  SELECT * FROM exam_has_question 
  WHERE exam_id = ${examId}
  `
    )
    .then(async (data) => {
      examQuestions = data[0];
      await calculate(examQuestions);
      await updateExamGrade();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};

export const getExam = (req, res) => {
  const examId = req.query.examId;

  connection
    .promise()
    .query(
      `
  SELECT * FROM exam
  WHERE exam_id = ${examId}
  `
    )
    .then((data) => {
      res.status(200).json({
        status: "ok",
        exam: data[0],
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
