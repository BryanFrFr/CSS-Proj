"use client";
import useSWR from 'swr';
import React from 'react';
const fetcher = (...args) => fetch(...args).then ((res) => res.json());


export default function App(){
  var tableStyle = {
    "border": "1px solid black",
    "textAlign" : "center",
    "padding": "10px",
 };
  const {data, isLoading, error} =  useSWR('/MRT/api', fetcher); 
  if (error) {
    return <h1>Failed to load</h1>
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return(
    <div>
    <table style = {tableStyle}>
        <tr><th style={tableStyle}>Station</th><th style={tableStyle}>Start Time</th><th style={tableStyle}>End Time</th><th >Crowd level</th></tr>
      {data.value.map((val, key) => {
                    return (
                        <tr style={tableStyle} key={key}>
                            <td style={tableStyle}>{val.Station}</td>
                            <td style={tableStyle}>{val.StartTime}</td>
                            <td style={tableStyle}>{val.EndTime}</td>
                            <td style={tableStyle}>{val.CrowdLevel}</td>
                        </tr>
                    )
                })}
      </table>
      </div>
  );
}

