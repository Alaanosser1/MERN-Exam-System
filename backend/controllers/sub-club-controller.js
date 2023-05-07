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
    .query(`SELECT * FROM sub_club WHERE main_club_id = ${mainClubId}`)
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

export const createSubject = (req, res) => {
  const subjectName = req.body.subjectName;
  const subjectDescription = req.body.subjectDescription;
  const subClubId = req.body.subClubId;
  const subjectGrade = req.body.subjectGrade;

  connection
    .promise()
    .query(
      `INSERT INTO subject(subject_name, subject_description,subject_grade, sub_club_id)
          VALUES(
           '${subjectName}','${subjectDescription}','${subjectGrade}',
           '${subClubId}')`
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

export const editSubject = (req, res) => {
  const subjectId = req.body.subjectId;
  const subjectName = req.body.subjectName;
  const subjectDescription = req.body.subjectDescription;
  const subjectGrade = req.body.subjectGrade;

  connection
    .promise()
    .query(
      `
            UPDATE subject
            SET subject_name = '${subjectName}',
            subject_description = '${subjectDescription}',
            subject_grade = '${subjectGrade}'
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
    .query(`SELECT * FROM placement WHERE sub_club_id = ${subClubId} `)
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

export const addPlacementOption = (req, res) => {
  const placementId = req.body.placementId;
  const optionName = req.body.optionName;

  connection
    .promise()
    .query(
      `INSERT INTO placement_option(option_name, placement_id)
      VALUES('${optionName}', '${placementId}')`
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
