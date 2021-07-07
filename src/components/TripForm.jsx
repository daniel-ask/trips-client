import React, {useState} from 'react'
import { postData } from '../utils/apiRequest'

export default function TripForm(props) {
	const formInitialState = {
		trip: {
			name: '',
			length: 1,
			country: ''
		}
	}
	const [tripForm, setTripForm] = useState(formInitialState)

	const changeInput = (event) =>{
		setTripForm({
			trip:{
				...tripForm.trip,
				[event.target.name]: event.target.value
			}
		})
	}

	const createNewTrip = (event) =>{
		event.preventDefault();
		postData('http://localhost:3000/trips',tripForm)
		setTripForm(formInitialState)
		props.update.setUpdate(!props.update.update)
	}

	const {name, length, country} = tripForm.trip
	return (
		<form onSubmit={createNewTrip}>
			<input type="text" name="name" id="name" placeholder="name" value={name} onChange={changeInput}/>
			<input type="text" name="country" id="country" placeholder="country" value={country} onChange={changeInput}/>
			<input type="number" name="length" id="length" value={length} onChange={changeInput}/>
			<input type='submit'/>
		</form>
	)
}
