import connection from "../database.js";
import Joi from "joi";

export const createSubClub = (req, res) => {
  const clubName = req.body.clubName;
  const clubDescription = req.body.clubDescription;
  const clubNumber = req.body.clubNumber;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const mainClubId = req.body.mainClubId;
  const studentsType = req.body.studentsType;
  const subClubType = req.body.subClubType;
  const theoriticalGrades = req.body.theoriticalGrades;
  const practicalGrades = req.body.practicalGrades;
  const attendenceGrades = req.body.attendenceGrades;
  const behaviourGrades = req.body.behaviourGrades;
  const placement = req.body.placement;
  const totalGrades =
    parseInt(theoriticalGrades) +
    parseInt(practicalGrades) +
    parseInt(attendenceGrades) +
    parseInt(behaviourGrades);

  connection
    .promise()
    .query(
      `INSERT INTO sub_club(sub_club_name, sub_club_description,
         sub_club_number, start_date, end_date, main_club_id,
         students_type, sub_club_type, theoritical_grades, practical_grades,
         attendence_grades, behaviour_grades, total_grades, placement)
          VALUES(
           '${clubName}','${clubDescription}','${clubNumber}',
           '${startDate}', '${endDate}', '${mainClubId}',
           '${studentsType}', '${subClubType}', '${theoriticalGrades}',
           '${practicalGrades}', '${attendenceGrades}', '${behaviourGrades}',
           '${totalGrades}', '${placement}')`
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

export const editSubClub = (req, res) => {
  const clubName = req.body.clubName;
  const clubDescription = req.body.clubDescription;
  const clubNumber = req.body.clubNumber;
  const clubId = req.body.clubId;

  const schema = Joi.object().keys({
    clubName: Joi.string().required(),
    clubDescription: Joi.string().required(),
    clubNumber: Joi.allow(),
    clubId: Joi.allow(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  connection
    .promise()
    .query(
      `
            UPDATE main_club
            SET club_name = '${clubName}',
            club_description = '${clubDescription}',
            club_number = '${clubNumber}'
            WHERE club_id = '${clubId}'
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

export const deleteSubClub = (req, res) => {
  const clubId = req.query.clubId;

  connection
    .promise()
    .query(
      `
              UPDATE sub_club 
              SET is_deleted = '1'
              WHERE club_id = '${clubId}'
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

export const getSubClubs = async (req, res) => {
  const mainClubId = req.query.mainClubId;
  let clubs = [];
  let isError = false;
  await connection
    .promise()
    .query(
      `SELECT * FROM sub_club WHERE main_club_id = ${mainClubId}  ORDER BY sub_club_number ASC;`
    )
    .then((data) => {
      res.status(200).json({
        clubs: data[0],
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
  //   for (let i = 0; i < clubs.length; i++) {
  //     await connection
  //       .promise()
  //       .query(
  //         `SELECT COUNT(*) as count FROM sub_club WHERE main_club_id = ${clubs[i].club_id} `
  //       )
  //       .then((data) => {
  //         Object.assign(clubs[i], {
  //           number_of_sub_clubs: data[0][0].count,
  //         });
  //       })
  //       .catch((error) => {
  //         isError = true;
  //         console.log(error);
  //         res.status(500).json({
  //           status: "error",
  //           msg: "500 internal server error",
  //         });
  //       });
  //   }

  //   if (!isError) {
  //     res.status(200).json({
  //       clubs: clubs,
  //     });
  //   }
};

export const getSingleSubClub = async (req, res) => {
  const clubId = req.query.clubId;

  await connection
    .promise()
    .query(`SELECT * FROM sub_club WHERE sub_club_id = '${clubId}'`)
    .then((data) => {
      res.status(200).json({
        club: data[0],
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

export const getSubClubStudents = async (req, res) => {
  const subClubId = req.query.subClubId;
  let isError = false;
  await connection
    .promise()
    .query(
      `SELECT * FROM examinee_has_sub_club 
       JOIN examinee ON examinee_has_sub_club.examinee_id = examinee.examinee_id
       WHERE examinee_has_sub_club.sub_club_id = ${subClubId}`
    )
    .then((data) => {
      res.status(200).json({
        students: data[0],
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
};

export const createSubject = async (req, res) => {
  try {
    const subjectName = req.body.subjectName;
    const subjectDescription = req.body.subjectDescription;
    const subClubId = req.body.subClubId;
    const subjectGrade = req.body.subjectGrade;
    const subjectType = req.body.subjectType;
    let subClubStudents;

    const addSubjectRecordForEachExaminee = async (subjectId) => {
      for (let i = 0; i < subClubStudents.length; i++) {
        const examineeId = subClubStudents[i].examinee_id;
        try {
          await connection.promise().query(
            `INSERT INTO examinee_has_subject(subject_id, examinee_id, sub_club_id)
              VALUES('${subjectId}','${examineeId}','${subClubId}')`
          );
        } catch (error) {
          // Handle the error, you can log it or send a specific error response
          console.error(
            `Error inserting examinee_has_subject for subjectId ${subjectId} and examineeId ${examineeId}: ${error}`
          );
        }
      }
    };

    const addSubject = async () => {
      try {
        const result = await connection.promise().query(
          `INSERT INTO subject(subject_name, subject_description, subject_grade, subject_type, sub_club_id)
            VALUES('${subjectName}','${subjectDescription}','${subjectGrade}', '${subjectType}','${subClubId}')`
        );
        const subjectId = result[0].insertId;
        await addSubjectRecordForEachExaminee(subjectId);
        res.status(201).json({
          status: "ok",
          msg: "Created",
        });
      } catch (error) {
        // Handle the error, you can log it or send a specific error response
        console.error(`Error inserting subject: ${error}`);
        res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      }
    };

    const studentsQueryResult = await connection.promise().query(
      `SELECT * FROM examinee_has_sub_club 
        JOIN examinee ON examinee_has_sub_club.examinee_id = examinee.examinee_id
        WHERE examinee_has_sub_club.sub_club_id = ${subClubId}`
    );
    subClubStudents = studentsQueryResult[0];

    await addSubject();
  } catch (error) {
    // Handle any uncaught errors, you can log them or send a generic error response
    console.error(`Unhandled error: ${error}`);
    res.status(500).json({
      status: "error",
      msg: "500 Internal Server Error",
    });
  }
};

export const editSubject = (req, res) => {
  const subjectId = req.body.subjectId;
  const subjectName = req.body.subjectName;
  const subjectDescription = req.body.subjectDescription;
  const subjectGrade = req.body.subjectGrade;
  const subjectType = req.body.subjectType;

  connection
    .promise()
    .query(
      `
            UPDATE subject
            SET subject_name = '${subjectName}',
            subject_description = '${subjectDescription}',
            subject_grade = '${subjectGrade}',
            subject_type = '${subjectType}'
            WHERE subject_id = '${subjectId}'
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
          msg: "No subject with that ID",
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

export const deleteSubject = (req, res) => {
  const subjectId = req.query.subjectId;

  connection
    .promise()
    .query(
      `
              UPDATE subject 
              SET is_deleted = '1'
              WHERE subject_id = '${subjectId}'
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

export const getClubSubjects = async (req, res) => {
  const subClubId = req.query.subClubId;
  let clubs = [];
  let isError = false;

  await connection
    .promise()
    .query(
      `SELECT * FROM subject WHERE sub_club_id = '${subClubId}' AND is_deleted = '0'`
    )
    .then((data) => {
      res.status(200).json({
        subjects: data[0],
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
};

export const getSubClubStudentsSubjects = async (req, res) => {
  const subClubId = req.query.subClubId;
  let clubs = [];
  let isError = false;
  let subClubSubjects;
  let grades;
  let theoreticalTotal = 0;
  let practicalTotal = 0;
  let total = 0;
  let clubFitnessLevelMeasurement;

  await connection
    .promise()
    .query(
      `SELECT * FROM subject WHERE sub_club_id = ${subClubId} AND is_deleted = '0' ORDER BY subject_id`
    )
    .then((data) => {
      subClubSubjects = data[0];
    });

  await connection
    .promise()
    .query(
      `SELECT * FROM examinee_has_subject JOIN subject ON subject.subject_id = examinee_has_subject.subject_id
      WHERE examinee_has_subject.sub_club_id = ${subClubId} AND subject.is_deleted = '0' ORDER BY examinee_has_subject.subject_id`
    )
    .then((data) => {
      grades = data[0];

      for (let i = 0; i < grades.length; i++) {
        if (grades[i].subject_type === "نظري") {
          theoreticalTotal += grades[i].examinee_grade;
          grades.theoreticalTotal = theoreticalTotal;
        } else if (grades[i].subject_type === "عملي") {
          practicalTotal += grades[i].examinee_grade;
          grades.practicalTotal = practicalTotal;
        }
        total += grades[i].examinee_grade;
      }
      // console.log(grades, "GRADESSS", grades.length);
    });

  await connection
    .promise()
    .query(
      `SELECT * FROM fitness_level_measurement WHERE sub_club_id = ${subClubId} ORDER BY sub_club_id`
    )
    .then((data) => {
      clubFitnessLevelMeasurement = data[0];
    });

  await connection
    .promise()
    .query("CALL GetExamineesWithSubjects(116)")
    .then((data) => {
      // console.log(subClubSubjects, "AHHAHAHAHAH");
      res.status(200).json({
        subjects: data[0],
        subClubSubjects: subClubSubjects,
        grades: grades,
        clubFitnessLevelMeasurement,
      });
      // console.log(data[0], subClubSubjects);
    })
    .catch((error) => {
      isError = true;
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};

export const getExamineeSubjectsGrades = async (req, res) => {
  const examineeId = req.query.examineeId;
  let clubs = [];
  let isError = false;
  let theoreticalTotal = 0;
  let practicalTotal = 0;
  let total = 0;

  const calculateTotalGrades = (grades) => {
    for (let i = 0; i < grades.length; i++) {
      if (grades[i].subject_type === "نظري") {
        theoreticalTotal += grades[i].examinee_grade;
      } else if (grades[i].subject_type === "عملي") {
        practicalTotal += grades[i].examinee_grade;
      }
      total += grades[i].examinee_grade;
    }
  };

  await connection
    .promise()
    .query(
      `
      SELECT * FROM examinee_has_subject
      JOIN subject ON subject.subject_id = examinee_has_subject.subject_id
      WHERE examinee_id = ${examineeId} AND subject.is_deleted = '0'

      `
    )
    .then((data) => {
      calculateTotalGrades(data[0]);
      console.log(
        theoreticalTotal,
        practicalTotal,
        total,
        "############################"
      );
      res.status(200).json({
        examineeGrades: data[0],
        theoreticalTotal,
        practicalTotal,
        total,
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
};

export const editExamineeSubjectGrade = async (req, res) => {
  const examineeId = req.body.examineeId;
  const gradesObject = req.body.gradesObject;
  const subClubId = req.body.subClubId;
  let clubs = [];
  let isError = false;
  console.log(gradesObject[0].examinee_grade, "LOLOLO");

  try {
    for (let i = 0; i < gradesObject.length; i++) {
      await connection.promise().query(
        `
        INSERT INTO examinee_has_subject (examinee_id, sub_club_id, subject_id, examinee_grade)
        VALUES ('${examineeId}', '${subClubId}', '${gradesObject[i].subject_id}', '${gradesObject[i].examinee_grade}')
        ON DUPLICATE KEY UPDATE
        examinee_id = VALUES(examinee_id),
        sub_club_id = VALUES(sub_club_id),
        subject_id = VALUES(subject_id),
        examinee_grade = VALUES(examinee_grade);        
        `
      );
    }
    res.status(200).json({ status: "ok", msg: "Grades updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "500 Internal Server Error" });
  }
};

export const getSubject = async (req, res) => {
  const subjectId = req.query.subjectId;
  let clubs = [];
  let isError = false;

  await connection
    .promise()
    .query(`SELECT * FROM subject WHERE subject_id = ${subjectId} `)
    .then((data) => {
      res.status(200).json({
        subject: data[0],
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
};

export const createPlacement = (req, res) => {
  const placementName = req.body.placementName;
  const placementDescription = req.body.placementDescription;
  const subClubId = req.body.subClubId;

  connection
    .promise()
    .query(
      `INSERT INTO placement(placement_name, placement_description, sub_club_id)
      VALUES('${placementName}', '${placementDescription}', '${subClubId}')`
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

export const editPlacement = (req, res) => {
  const placementId = req.body.placementId;
  const placementName = req.body.placementName;
  const placementDescription = req.body.placementDescription;

  connection
    .promise()
    .query(
      `
            UPDATE subject
            SET placement_name = '${placementId}',
            placement_description = '${placementName}',
            WHERE placement_id = '${placementDescription}'
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
          msg: "No subject with that ID",
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

export const deletePlacement = (req, res) => {
  const placementId = req.query.placementId;

  connection
    .promise()
    .query(`DELETE FROM placement WHERE placement_id = '${placementId}' `)
    .then((data) => {
      if (data[0].affectedRows != 0) {
        res.status(200).json({
          status: "Ok",
          msg: "Deleted",
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "No placement with this ID",
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

export const getSubClubPlacements = async (req, res) => {
  const subClubId = req.query.subClubId;

  await connection
    .promise()
    .query(`SELECT * FROM placement WHERE sub_club_id =' ${subClubId}' `)
    .then((data) => {
      res.status(200).json({
        placements: data[0],
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

export const getPlacement = async (req, res) => {
  const placementId = req.query.placementId;

  await connection
    .promise()
    .query(`SELECT * FROM placement WHERE placement_id = ${placementId} `)
    .then((data) => {
      res.status(200).json({
        placement: data[0],
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

export const addPlacementOption = async (req, res) => {
  const placementId = req.body.placementId;
  const optionName = req.body.optionName;
  const subClubId = req.body.subClubId;
  let clubStudents;
  let isError = false;

  try {
    await connection
      .promise()
      .query(
        `SELECT examinee_id 
    FROM examinee_has_sub_club WHERE sub_club_id = '${subClubId}'`
      )
      .then((data) => {
        clubStudents = data[0];
        console.log(clubStudents);
      });

    await connection
      .promise()
      .query(
        `INSERT INTO placement_option(option_name, placement_id)
      VALUES('${optionName}', '${placementId}')`
      )
      .then(async (data) => {
        for (let i = 0; i < clubStudents.length; i++) {
          await connection.promise()
            .query(`INSERT INTO examinee_placement (placement_option_id, placement_id, examinee_id)
        VALUES ('${data[0].insertId}', '${placementId}', '${clubStudents[i].examinee_id}')        
        `);
        }
      });
  } catch (error) {
    isError = true;
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "500 Internal Server Error",
    });
  }

  if (!isError) {
    res.status(201).json({
      status: "ok",
      msg: "Created",
    });
  }
};

export const removePlacementOption = (req, res) => {
  const placementOptionId = req.query.placementOptionId;

  connection
    .promise()
    .query(
      `DELETE FROM placement_option
      WHERE placement_option_id = '${placementOptionId}'`
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
          msg: "No placement with this ID",
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

export const getPlacementOptions = async (req, res) => {
  const placementId = req.query.placementId;

  await connection
    .promise()
    .query(
      `SELECT * FROM placement_option WHERE placement_id = ${placementId} `
    )
    .then((data) => {
      res.status(200).json({
        placementOptions: data[0],
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

export const fillExamineePlacementData = async (req, res) => {
  const optionsObject = req.body.optionsObject;
  let isError = false;

  console.log(optionsObject);

  try {
    if (optionsObject.length > 0) {
      for (let i = 0; i < optionsObject.length; i++) {
        await connection
          .promise()
          .query(
            `SELECT * FROM examinee_placement WHERE 
          examinee_id = '${optionsObject[i].examinee_id}' AND 
          placement_option_id = '${optionsObject[i].placement_option_id}' AND 
          placement_id = '${optionsObject[i].placement_id}'`
          )
          .then(async (data) => {
            if (data[0].length > 0) {
              await connection
                .promise()
                .query(
                  `DELETE FROM examinee_placement
              WHERE 
              placement_option_id = '${optionsObject[i].placement_option_id}' AND
              examinee_id = '${optionsObject[i].examinee_id}' AND
              placement_id = '${optionsObject[i].placement_id}'
              `
                )
                .then((data) => {
                  connection.promise().query(
                    `INSERT INTO examinee_placement(examinee_id, placement_id,
                 placement_option_id, value_before, value_after)
                 VALUES('${optionsObject[i].examinee_id}',
                       '${optionsObject[i].placement_id}',
                       '${optionsObject[i].placement_option_id}',
                       '${optionsObject[i].value_before}',
                       '${optionsObject[i].value_after}'
                )`
                  );
                });
            } else {
              connection.promise().query(
                `INSERT INTO examinee_placement(examinee_id, placement_id,
               placement_option_id, value_before, value_after)
               VALUES('${optionsObject[i].examinee_id}',
                     '${optionsObject[i].placement_id}',
                     '${optionsObject[i].placement_option_id}',
                     '${optionsObject[i].value_before}',
                     '${optionsObject[i].value_after}'
              )`
              );
            }
          });
      }
    }
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
      status: "Ok",
      msg: "created",
    });
  }
};

export const getPlacementOptionsValues = async (req, res) => {
  const placementId = req.query.placementId;
  const examineeId = req.query.examineeId;
  await connection
    .promise()
    .query(
      `SELECT * FROM placement_option
      JOIN examinee_placement ON
      examinee_placement.placement_option_id = placement_option.placement_option_id
      AND examinee_placement.examinee_id = '${examineeId}'
       WHERE placement_option.placement_id = ${placementId} `
    )
    .then((data) => {
      res.status(200).json({
        placementOptions: data[0],
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
