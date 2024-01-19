import { GET } from './api/route.js';
import React from 'react';

async function fetchData() {
  try {
    const res = await GET(); // Use the imported GET function
    console.log(res); // Assuming you want to log the data
    return res;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const data = GET();
export default function App() {
   // Call the fetchData function
  
  return (
    <div>
    <h1>Bicycle Parking Locations</h1>
    <ul>
      {data.value.map((location, index) => (
        <li key={index}>
          <p>Description: {location.Description}</p>
          <p>Latitude: {location.Latitude}</p>
          <p>Longitude: {location.Longitude}</p>
          <p>Rack Type: {location.RackType}</p>
          <p>Rack Count: {location.RackCount}</p>
          <p>Shelter Indicator: {location.ShelterIndicator}</p>
          <hr />
        </li>
      ))}
    </ul>
  </div>
  );
}