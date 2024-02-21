import express from "express";


export const articleAPI = express.Router();

export function createArticleRouter(db){

    articleAPI.get("/api/articles/", async (req, res) => {
        const articles = await db.collection("articles").find().toArray();
        res.json(articles);
    });

    articleAPI.post("/api/articles", async (req, res) => {
        const { headline, article, category, author } = req.body;
        const articles = await db.collection("articles").findOne({headline: headline});

        if (!articles){
            await db.collection("articles").insertOne({ headline, article, category, author });
            res.sendStatus(204);
        }else {
            res.sendStatus(400);
        }

    });
    articleAPI.get("/api/articles/:author", async (req, res) => {
        const articles = await db.collection("articles").find(req.params).toArray();
        res.json(articles);
    });
}