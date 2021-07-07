import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Create, Save } from "@material-ui/icons";

export default function EditableField(props) {
	const [editable, setEditable] = useState(false)
	const [data, setData] = useState(props.value)

	useEffect(() => {
		setData(props.value);
	}, [props.value])

	const toggleEditable = () =>{
		setEditable(!editable)
	}

	const changeInput = (e) => {
		setData(e.target.value)
	}

	if(editable){
		return (
			<div>
				<input type="text" value={data} onChange={changeInput}/>
				<IconButton aria-label="delete" size="small" onClick={() => {
					props.updateData(props.attribute, data)
					toggleEditable()
					}}>
					<Save fontSize="inherit" />
				</IconButton>
			</div>
		)
	}else{
		return (
			<div>
			<span>{data}</span>
				<IconButton aria-label="delete" size="small" onClick={toggleEditable}>
					<Create fontSize="inherit" />
				</IconButton>
			</div>
		);
	}
}
