import express from "express";
import bodyParser from "body-parser";
import * as path from "path";
import {articleAPI} from "./articleAPI.js";

const port = process.env.PORT || 3000;
const app = express();

app.listen(port);

app.use(express.static("../client/dist"));
app.use(bodyParser.json());
app.use(articleAPI);

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

console.log(`Server started and is listening on  http://localhost:${port}`);