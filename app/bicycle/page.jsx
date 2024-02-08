"use client";
import useSWR from 'swr';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';
import Stack from 'react-bootstrap/Stack';
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function App() {

  const [dist, setDist] = useState('') //creates distance variable
  const [position, setPosition] = useState({ lat: 0, long: 0 }); //creates latitude and longitude variable
  const click = () => {
    setDist(null) // clears the distance variable upon button click
  }
  const change = event =>
  {
    setDist(event.target.value); //updates distance variable when new numbers are added to the input field
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
  const { data, isLoading, error } = useSWR(`/bicycle/parkingApi?Lat=${lat}&Long=${long}&dist=${dist}`, fetcher); //fectches API data
  if (error) {
    return <div>failed to load {error}</div> //displays error message  when API fails to fetch
  }
  if (isLoading) {
    return <div>loading...</div> //displays when API is in the process of fetching
  }
  else {
    return (
      <div>
        <Stack gap={4} style={{ marginTop: "20px" }}>  {/* Creates stack adjust spacing of elements */}
        <input placeholder = "Enter Radius:" className = {styles.input} onChange = {change} value = {dist}/> {/* Creates input field */} 
        <Button type = 'button' className = {styles.btn} onClick = {click}>Clear Table</Button> {/* Creates button to clear table*/}
        <Table class = 'table'>
          <tr><th className={styles.headerStyle}>Description</th><th className={styles.headerStyle}>Shelter (Y/N)</th><th className={styles.headerStyle}>Number of Racks</th><th className={styles.headerStyle}>Type of Rack</th></tr> {/*table headings*/}
          {data.value.map((val, key) => { {/* mapping data valyes to be able to output array into table */}
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