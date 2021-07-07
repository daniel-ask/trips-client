import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TripForm from "./TripForm";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {deleteRequest} from '../utils/apiRequest';

export default function Dashboard() {
  const titleStyle = {
    textAlign: "center",
  };

  const [trips, setTrips] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetchTrips = async () => {
    const response = await fetch("http://localhost:3000/trips", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setTrips(data);
  };

	const deleteTrip = (tripId) =>{
		deleteRequest(`http://localhost:3000/trips/${tripId}`)
		
		setUpdate(!update);
	}

  useEffect(() => {
    fetchTrips();
  }, [update]);

  return (
    <div>
      <h1 style={titleStyle}>Dashboard</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <Link to={`/trips/${trip.id}`}>{trip.name}</Link>
            <IconButton aria-label="delete" size="small" onClick={() => deleteTrip(trip.id)}>
              <ArrowDownwardIcon fontSize="inherit" />
            </IconButton>
          </li>
        ))}
      </ul>
      <TripForm update={{ update, setUpdate }} />
    </div>
  );
}
