import express from "express";

const port = process.env.PORT || 3000;
const app = express();

app.listen(port);

app.use(express.static("../client/dist"));

console.log(`Server started and is listening on port ${port}`);