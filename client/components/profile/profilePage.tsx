import React, {useContext} from "react";
import {LoginContext} from "../login/loginContext";
import {useNavigate} from "react-router-dom";

export function ProfilePage(){
    const { username, loadUser } = useContext(LoginContext);
    const navigate = useNavigate();
    async function handleLogout(e: React.SyntheticEvent){
        e.preventDefault();

        const res = await fetch("/api/login", { method: "DELETE" });

        if (!res.ok){
            throw new Error("Failed to log out " + res.status + " " + res.statusText);
        }
        await loadUser();
        navigate("/");
    }
    return(
        <>
            <h2>{ username }</h2>
            <div>Maybe list articles written here if time allows for it</div>
            <form onSubmit={handleLogout}>
                <button>Log Out</button>
            </form>
        </>
    )
}