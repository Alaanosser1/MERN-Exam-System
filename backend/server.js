import  app  from "./app.js";
const port = process.env.port || 4000

app.listen(port)

console.log("Connected on port", port);
