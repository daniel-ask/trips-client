import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../contexts/AuthProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Login({ history }) {
  const classes = useStyles();

  const [auth, setAuth] = useContext(AuthContext);

  const changeInput = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const sendLoginRequest = async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
			localStorage.setItem('username', data.username)
      setAuth({
        ...auth,
        username: data.username,
        email: data.email,
        loggedIn: true,
      });
      history.push("/");
    } else {
      setErrorMessage(data.error);
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    sendLoginRequest();
  };

  return (
    <div>
      {errorMessage && <h5>{errorMessage}</h5>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={submitLogin}
      >
        <TextField
          id="standard-basic"
          label="Username"
          value={loginForm.username}
          onChange={changeInput}
          name="username"
        />
        <TextField
          id="standard-basic"
          label="Password"
          value={loginForm.password}
          onChange={changeInput}
          name="password"
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      </form>
    </div>
  );
}
