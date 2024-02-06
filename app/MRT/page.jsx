"use client";
import useSWR from 'swr';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
const fetcher = (...args) => fetch(...args).then((res) => res.json());


export default function App() {
  var tableStyle = {
    "border": "1px solid black",
    "textAlign": "center",
    "padding": "10px",
  };

  const [MRTLine, setMRTLine] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  function handleButtonClick() {
    setIsButtonClicked(prev => !prev)
  };

  const { data, isLoading, error } = useSWR(isButtonClicked ? `/MRT/api?MRTLine=${MRTLine}` : null,
    fetcher,);
  

    return (
      <div>
        <Form.Control
          type="text"
          placeholder="Enter MRT line"
          value={MRTLine}
          onChange={(event) => setMRTLine(event.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleButtonClick}>
          Get MRT Crowd
        </Button>
        {isButtonClicked && (
          console.log(data),
          <div>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (data.value.length > 0)? (
              <Table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={tableStyle}>Station</th>
                    <th style={tableStyle}>Start Time</th>
                    <th style={tableStyle}>End Time</th>
                    <th style={tableStyle}>Crowd level</th>
                  </tr>
                </thead>
                <tbody>
                  {data.value.map((val) => (
                    <React.Fragment key={val.Station}>
                      <tr>
                        <td>{val.Station}</td>
                        <td style={tableStyle}>{val.StartTime}</td>
                        <td style={tableStyle}>{val.EndTime}</td>
                        <td style={tableStyle}>{val.CrowdLevel}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
    );
}

