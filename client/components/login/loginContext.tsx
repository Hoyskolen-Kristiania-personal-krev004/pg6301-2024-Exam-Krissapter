import React from "react";

export const LoginContext = React.createContext({
    username: "",
    client_id:"",
    user:undefined,
    loadUser: async () => {}
});