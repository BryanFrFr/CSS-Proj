"use client";
import useSWR from 'swr';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';
import Stack from 'react-bootstrap/Stack';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function App() {
  var tableStyle = {
    "border": "1px solid black",
    "textAlign": "center",
    "padding": "10px",
  };
  var headerStyle = {
    "border": "1px solid black",
    "textAlign": "center",
    "padding": "10px",
    "background": "green"
  };
  const [dist, setDist] = useState('')
  const [position, setPosition] = useState({ lat: 0, long: 0 });
  const click = () => {
    setDist(null)
  }
  const change = event =>
  {
    setDist(event.target.value);
  }
  if ("geolocation" in navigator) {
    // Prompt user for location permissions
    navigator.geolocation.watchPosition(
      // Use watchPosition instead of getCurrentPosition as it follows user's position as they move
      function (position) {
        // Get the user's latitude and longitude
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setPosition({ lat, long });
        // Returns user position
      },
      // Function for errors
      function (error) {
        // Handle errors, e.g. user denied location shaRring permissions
        console.error("Error getting user location:", error);
      }
    );
  } else {
    // Executes if Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
  }
  let lat = position.lat;
  let long = position.long;
  console.log("lat:", lat, "long:", long)
  const { data, isLoading, error } = useSWR(`/bicycle/parkingApi?Lat=${lat}&Long=${long}&dist=${dist}`, fetcher);
  if (error) {
    //return <div>failed to load {error}</div>
  }
  if (isLoading) {
    return <div>loading...</div>
  }
  else {
    console.log(data);
    return (
      <div>
        <Stack gap={4} style={{ marginTop: "20px" }}>
        <input style = {{styles}} onChange = {change} value = {dist} class = 'input'/>
        <Button type = 'button' class = 'btn' onClick = {click}>Clear Table</Button>
        <Table className="LeTable" style={tableStyle}>
          <tr><th style={headerStyle}>Description</th><th style={headerStyle}>Shelter (Y/N)</th><th style={headerStyle}>Number of Racks</th><th style={headerStyle}>Type of Rack</th></tr>
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
        </Table>
        </Stack>
      </div>
    );
  }
}