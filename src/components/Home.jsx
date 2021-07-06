import React, {useContext} from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { Container } from '@material-ui/core';

export default function Home() {
	const [auth, setAuth] = useContext(AuthContext);

	return (
		<Container maxWidth='sm'>
				{auth.loggedIn ? (
					<div style={{textAlign: 'center'}}>
					<h1>LOGGED IN</h1>
					<h2>Welcome {auth.username}</h2>
					</div>
					) : <h1 style={{textAlign: 'center'}}> NOT LOGGED IN</h1>}
		</Container>
	)
}
