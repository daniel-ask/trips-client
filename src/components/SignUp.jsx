import React, { useState, useContext } from 'react';
import {AuthContext} from '../contexts/AuthProvider';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';

export function Login({history}) {
	
	const [auth,setAuth] = useContext(AuthContext);
	const [signUpForm, setSignUpForm] = useState({
		user:{
			username: '',
			email: '',
			password: '',
			password_confirmation: ''
		}
	})

	const [errorMessage, setErrorMessage] = useState('')

	const changeInput = e => {
		setSignUpForm({
			user:{
				...signUpForm.user,
				[e.target.name] : e.target.value
			}
		})
	}

	const postSignUp = async () => {
		const response = await fetch('http://localhost:3000/sign-up',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(signUpForm)
		})

		const data = await response.json();
		if(data.token){
			localStorage.setItem('token', data.token)
			localStorage.setItem('username', data.username)
      setAuth({
        ...auth,
        username: data.username,
        email: data.email,
        loggedIn: true,
      });
			history.push('/')
		}else{
			setErrorMessage(data)
		}
		console.log(data)
	}

	const signUpUser = e => {
		e.preventDefault()
		postSignUp()
	}
	
	const {username, email, password, password_confirmation} = signUpForm.user
	return (
		<div>
		{errorMessage && Object.keys(errorMessage).map((key) => <li key={key}>{key} {errorMessage[key][0]}</li>)}
		<form onSubmit={signUpUser}>
			<label>Username</label>
			<input type="text" value={username} onChange={changeInput} name='username'/>
			<label>Email</label>
			<input type="email" value={email} onChange={changeInput} name='email'/>
			<label>Password</label>
			<input type="password" value={password} onChange={changeInput} name='password'/>
			<label>Confirm Password</label>
			<input type="password" value={password_confirmation} onChange={changeInput} name='password_confirmation'/>
			<input type="submit" value="Sign Up" />
		</form>
		</div>
	)
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ history }) {
  const classes = useStyles();

	const [auth,setAuth] = useContext(AuthContext);
	const [signUpForm, setSignUpForm] = useState({
		user:{
			username: '',
			email: '',
			password: '',
			password_confirmation: ''
		}
	})

	const [errorMessage, setErrorMessage] = useState('')

	const changeInput = e => {
		setSignUpForm({
			user:{
				...signUpForm.user,
				[e.target.name] : e.target.value
			}
		})
	}

	const postSignUp = async () => {
		const response = await fetch('http://localhost:3000/sign-up',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(signUpForm)
		})

		const data = await response.json();
		if(data.token){
			localStorage.setItem('token', data.token)
			localStorage.setItem('username', data.username)
      setAuth({
        ...auth,
        username: data.username,
        email: data.email,
        loggedIn: true,
      });
			history.push('/')
		}else{
			setErrorMessage(data)
		}
		console.log(data)
	}

	const signUpUser = e => {
		e.preventDefault()
		postSignUp()
	}
	
	const {username, email, password, password_confirmation} = signUpForm.user
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EnhancedEncryptionOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
					Sign Up
        </Typography>
        <Typography component="h1" variant="h6" style={{color: 'darkred'}}>
          {errorMessage}
        </Typography>
        <form className={classes.form} noValidate onSubmit={signUpUser}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={changeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="current-password"
            value={email}
            onChange={changeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={changeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            id="password_confirmation"
            autoComplete="current-password"
            value={password_confirmation}
            onChange={changeInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}