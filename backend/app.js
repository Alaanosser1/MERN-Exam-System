import express from "express";
import urlencoded from "body-parser";
import cors from "cors";

import instructorRouter from "./routes/instructor-route.js";
import examineeRouter from "./routes/examinee-route.js";
import questionBankRouter from "./routes/question-bank-route.js";
import mainQuestionBankRouter from "./routes/main-question-bank-route.js";
import questionRouter from "./routes/question-route.js";
import examRouter from "./routes/exam-route.js";
import evaluateRouter from "./routes/evaluation-route.js";
import mainClubRoute from "./routes/main-club-route.js";
import subClubRoute from "./routes/sub-club-route.js";
import dataEnrtyRouter from "./routes/data-entry-route.js";

const app = express();

app.use(express.json());
// app.use(
//   urlencoded({
//     extended: true,
//   })
// );

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

app.use("/instructor", instructorRouter);
app.use("/examinee", examineeRouter);
app.use("/questionBank", questionBankRouter);
app.use("/mainQuestionBank", mainQuestionBankRouter);
app.use("/question", questionRouter);
app.use("/exam", examRouter);
app.use("/evaluate", evaluateRouter);
app.use("/mainClub", mainClubRoute);
app.use("/subClub", subClubRoute);
app.use("/dataEntry", dataEnrtyRouter);

app.use((error, req, res, next) => {
  if (error.status == 404) {
    res.status(404).json({
      status: "error",
      msg: "Page not Found",
    });
  } else {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "500 internal server error",
    });
  }
});

export default app;
