import express from "express";
import bodyParser from "body-parser";
import {articleAPI} from "./articleAPI.js";

const port = process.env.PORT || 3000;
const app = express();

app.listen(port);

app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.use(articleAPI);

console.log(`Server started and is listening on  http://localhost:${port}`);