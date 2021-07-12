import React, { useEffect, useState, useCallback } from "react";
import { fetchData, updateRequest } from "../utils/apiRequest";
import EditableField from "./EditableField";

export default function Trip({ match }) {
  const [trip, setTrip] = useState({});

  const fetchTrip =  useCallback(async () => {
    const data = await fetchData(
      `${process.env.REACT_APP_API_URL}/trips/${match.params.id}`
    );
    setTrip(data);
  },[match.params.id]);

  const updateData = (attributeName, newValue) => {
    console.log(newValue);
    const updatedData = {
      trip: {
        [attributeName]: newValue,
      },
    };
    updateRequest(`${process.env.REACT_APP_API_URL}/trips/${trip.id}`, updatedData);
  };

  useEffect(() => {
    fetchTrip();
  }, [fetchTrip]);

  return (
    <div>
      <EditableField
        value={trip.name}
        updateData={updateData}
        attribute="name"
      />
      Country:{" "}
      <EditableField
        value={trip.country}
        updateData={(newData) => updateData("country", newData)}
      />
      <h3>Days: {trip.length}</h3>
      <ul>
        {trip.activities &&
          trip.activities.map((activity) => {
            return (
              <li key={activity.id}>
                <h4>{activity.name}</h4>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
