import { createConnection } from "mysql2";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const connection = createConnection({
  host: "127.0.0.1",
  password: process.env.DATABASE_PASSWORD,
  database: "hemaya-exam-system",
  port: "3306",
  user: "root",
});

export default connection;
