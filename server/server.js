import express from "express";
import * as path from "path";
import {articleAPI, createArticleRouter} from "./articleAPI.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cookieParser from "cookie-parser";
import {WebSocketServer} from "ws";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const server = app.listen(port);

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

const DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration";

app.use(async (req, res, next) => {
    const { username, access_token } = req.signedCookies;

    if (access_token){
        const res = await fetch(DISCOVERY_URL);
        const discoveryDoc = await res.json();

        const userInfoRes = await fetch(discoveryDoc.userinfo_endpoint, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        if (!userInfoRes.ok){
            throw new Error("Error" + userInfoRes.status + " " + userInfoRes.statusText);
        }

        const userInfo = await userInfoRes.json();
        req.user = {userInfo, username: userInfo.email};
    }else {
        req.user = { username };
    }
    next();
})


const loginAPI = express.Router();
app.use("/api/login", loginAPI);


loginAPI.post("", (req, res) => {
    res.cookie("username", req.body.username, { signed: true });
    res.sendStatus(204);
});

loginAPI.get("", (req, res) => {
    res.send(req.user);
});
loginAPI.delete("", (req, res) => {
    res.clearCookie("username");
    res.clearCookie("access_token");
    res.sendStatus(204);
});

loginAPI.post("/access_token", (req, res) => {
    res.cookie("access_token", req.body.access_token, { signed: true });
    res.sendStatus(204);
})

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});


//Websockets
const wsServer = new WebSocketServer({ noServer: true });
const sockets = [];

server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
        sockets.push(socket);
        socket.send("Hello from server");

        socket.on("message", (message) => {
            console.log(message.toString());
            for (const s of sockets){
                s.send("update");
            }
        });
    });
});

console.log(`Server started and is listening on  http://localhost:${port}`);