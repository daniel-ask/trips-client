import React, {useEffect, useState} from 'react'
import {fetchData, updateRequest} from '../utils/apiRequest';
import EditableField from './EditableField';

export default function Trip({ match }) {

	const [trip, setTrip] = useState({});

	const fetchTrip = async () => {
		const data = await fetchData(`http://localhost:3000/trips/${match.params.id}`)
		console.log(data);
		setTrip(data);
	}

	const updateData = (attributeName, newValue) =>{
		console.log(newValue);
		const updatedData = {
			trip:{
				[attributeName]: newValue
			}
		}
		updateRequest(`http://localhost:3000/trips/${trip.id}`, updatedData)
	}

	useEffect(() => {
		fetchTrip();
	}, [])

	return (
		<div>
			<EditableField value={trip.name} updateData={updateData} attribute='name'/>
			Country: <EditableField value={trip.country} updateData={(newData) => updateData('country', newData)} />
			<h3>Days: {trip.length}</h3>
			<ul>
				{trip.activities && trip.activities.map(activity => {
					return (
						<li key={activity.id}>
							<h4>{activity.name}</h4>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
