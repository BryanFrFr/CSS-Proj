"use client";
import useSWR from 'swr';
import React ,{useState} from 'react';
const fetcher = (...args) => fetch(...args).then ((res) => res.json());
export default function App(){
  var tableStyle = {
    "border": "1px solid black",
    "textAlign" : "center",
    "padding": "10px",
 };
  const [position, setPosition] = useState({lat: 0, long: 0});
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
  
  /*for ( let i = 0; i < data.value.length; i ++){
    if (data.value[i].ShelterIndicator === "N"){
      data.value[i].ShelterIndicator = "No";
    }else{
      data.value[i].ShelterIndicator = "Yes";
    }
  }*/
  return(
    <div>
 <table style = {tableStyle}>
        <tr><th style={tableStyle}>Description</th><th style={tableStyle}>Shelter (Y/N)</th><th style={tableStyle}>Number of Racks</th><th >Type of Rack</th></tr>
      {data.value.map((val, key) => {
                    return (
                        <tr style={tableStyle} key={key}>
                            <td style={tableStyle}>{val.Description}</td>
                            <td style={tableStyle}>{val.ShelterIndicator}</td>
                            <td style={tableStyle}>{val.RackCount}</td>
                            <td style={tableStyle}>{val.RackType}</td>
                        </tr>
                    )
                })}
      </table>
      </div>
  );
  }
}