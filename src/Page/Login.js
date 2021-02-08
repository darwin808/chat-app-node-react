import React, { useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [userName, setuserName] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/chat",
      state: {
        userName: userName,
      },
    });
  };
  return (
    <div className="Login">
      <h1>LOGIN here</h1>
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="usename...."
          value={userName}
          onChange={(e) => {
            setuserName(e.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default Login;
