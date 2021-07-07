export const fetchData = async (url) => {
	const response = await fetch(url, {
		headers:{
			'Authorization':`Bearer ${localStorage.getItem('token')}`
		}
	})
	const data = await response.json()

	return data
} 

export const postData = async (url, body) => {
	const response = await fetch(url, {
		method: 'POST',
		headers:{
			'Authorization':`Bearer ${localStorage.getItem('token')}`,
			'Content-Type':'application/json'
		},
		body: JSON.stringify(body)
	})
	const data = await response.json();
	return data
}

export const deleteRequest = async (url) =>{
	await fetch(url, {
		method: 'DELETE',
		headers:{
			'Authorization':`Bearer ${localStorage.getItem('token')}`,
		},
	})
}

export const updateRequest = async (url, body) => {
	const response = await fetch(url, {
		method: 'PATCH',
		headers:{
			'Authorization':`Bearer ${localStorage.getItem('token')}`,
			'Content-Type':'application/json'
		},
		body: JSON.stringify(body)
	})
	const data = await response.json();
	return data;
}