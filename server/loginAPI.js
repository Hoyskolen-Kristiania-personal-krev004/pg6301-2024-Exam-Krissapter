import express from "express";

export const loginAPI = express.Router();
loginAPI.post("/api/login", (req, res) => {
    res.cookie("username", req.body.username);
    res.sendStatus(204);
});