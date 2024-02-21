import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./loginContext";
import { useNavigate } from "react-router-dom";

export function LoginCallBack() {
  const [debug, setDebug] = useState();
  const { loadUser } = useContext(LoginContext);
  const navigate = useNavigate();

  async function handleCallback() {
    const hashObject = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1)),
    );
    const { access_token } = hashObject;
    const res = await fetch("/api/login/access_token", {
      method: "POST",
      body: JSON.stringify({ access_token }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(
        "Something went wrong " + res.status + " " + res.statusText,
      );
    }
    await loadUser();
    navigate("/");
  }
  useEffect(() => {
    handleCallback();
  }, []);
  return (
    <>
      <div>Please Wait</div>
      <pre>{debug}</pre>
    </>
  );
}
