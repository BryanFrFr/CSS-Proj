"use client";
import useSWR from 'swr';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';
import Stack from 'react-bootstrap/Stack';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function App() {

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
        <Table class = 'table'>
          <tr><th className={styles.headerStyle}>Description</th><th className={styles.headerStyle}>Shelter (Y/N)</th><th className={styles.headerStyle}>Number of Racks</th><th className={styles.headerStyle}>Type of Rack</th></tr>
          {data.value.map((val, key) => {
            return (
              <tr key={key}>
                <td className ={styles.dataStyle}>{val.Description}</td>
                <td className ={styles.dataStyle}>{val.ShelterIndicator}</td>
                <td className ={styles.dataStyle}>{val.RackCount}</td>
                <td className ={styles.dataStyle}>{val.RackType}</td>
              </tr>
            )
          })}
        </Table>
        </Stack>
      </div>
    );
  }
}