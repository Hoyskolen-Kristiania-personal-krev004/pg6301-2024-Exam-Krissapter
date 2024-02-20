import express from "express";
import * as path from "path";
import {articleAPI, createArticleRouter} from "./articleAPI.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.listen(port);

app.use(express.static("../client/dist"));
app.use(express.json());
app.use(articleAPI);
app.use(cookieParser(process.env.COOKIE_SECRET));

const url = process.env.MONGODB_URL;
const dbClient = new MongoClient(url);

dbClient.connect().then((connection) => {
    const db = connection.db("article-db");
    createArticleRouter(db);
});

const loginAPI = express.Router();
app.use("/api/login", loginAPI);


loginAPI.post("", (req, res) => {
    res.cookie("username", req.body.username, { signed: true });
    res.sendStatus(204);
});

loginAPI.get("", (req, res) => {
    const { username } = req.signedCookies;
    req.user = { username }
    res.send(req.user);
});


app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

console.log(`Server started and is listening on  http://localhost:${port}`);