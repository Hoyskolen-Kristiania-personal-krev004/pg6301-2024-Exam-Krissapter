import React, {useState} from "react";

export function AddArticle(){
    const [headline, setHeadline] = useState("");
    const [article, setArticle] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        await fetch("/api/articles", {
            method: "POST",
            body: JSON.stringify({ headline, article, category, author }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    return(
        <form onSubmit={handleSubmit}>
            <h1>Add Article</h1>
            <div>
                Headline:<br/>
                <input value={headline} onChange={(e) => setHeadline(e.target.value)}/><br/>
                Article:<br/>
                <textarea value={article} onChange={(e) => setArticle(e.target.value)}/><br/>
                Category:<br/>
                <select name={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value={"Tech"}>Tech</option>
                    <option value={"Literature"}>Literature</option>
                    <option value={"World"}>World</option>
                </select><br/>
                Author:<br/>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    );
}