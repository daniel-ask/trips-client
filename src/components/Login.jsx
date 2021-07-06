import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Login() {
  const classes = useStyles();

	const changeInput = e =>{
		setLoginForm({
			...loginForm,
			[e.target.name] : e.target.value
		})
	}

	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

	const sendLoginRequest = async () => {
		const response = await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(loginForm)
		})

		const data = await response.json()
		console.log(data);
	}

	const submitLogin = e => {
		e.preventDefault();
		sendLoginRequest()
	}

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitLogin}>
      <TextField id="standard-basic" label="Username" value={loginForm.username} onChange={changeInput} name='username' />
      <TextField id="standard-basic" label="Password" value={loginForm.password} onChange={changeInput} name='password' />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
    </form>
  );
}
