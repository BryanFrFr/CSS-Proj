"use client";
import useSWR from 'swr';
import React ,{useState} from 'react';
const fetcher = (...args) => fetch(...args).then ((res) => res.json());
export default function App(){
  if ("geolocation" in navigator) {
    // Prompt user for location permissions
    navigator.geolocation.watchPosition(
      // Use watchPosition instead of getCurrentPosition as it follows user's position as they move
      function(position) {
        // Get the user's latitude and longitude
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setPosition({lat,long});
        // Returns user position
      },
      // Function for errors
      function(error) {
        // Handle errors, e.g. user denied location sharing permissions
        console.error("Error getting user location:", error);
      }
    );
  } else {
    // Executes if Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
  }
  const [position, setPosition] = useState({lat: 0, long: 0})
  let lat = position.lat;
  let long = position.long;
  console.log("lat:",lat,"long:",long)
  const {data, isLoading, error} =  useSWR(`/bicycle/parkingApi?Lat=${lat}&Long=${long}`, fetcher);
  if (error) {
    return <div>failed to load</div>
  }
  if (isLoading) {
    return <div>loading...</div>
  }
  else {
  console.log(data);
  return(
    <div>hello</div>
  );
  }
}