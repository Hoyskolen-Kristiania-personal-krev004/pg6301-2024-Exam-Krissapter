import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function LoginNavLink(){
    const [username, setUsername] = useState("");

    async function loadUser(){
        const res = await fetch("/api/login");
        if (!res.ok){
            throw new Error("Something went wrong while fetching the user " + res.status + res.statusText);
        }
        const user = await res.json();
        setUsername(user.username);
    }

    useEffect(() => {
        loadUser();
    }, []);

    if (username){
        console.log("Bingbong");
        return <Link to={"/profile"}>{username}</Link>
    }
    return <Link to={"/login"}>Log In</Link>
}