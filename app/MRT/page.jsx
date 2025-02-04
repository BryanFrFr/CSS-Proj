// Done by: Ayden See

"use client";
import useSWR from 'swr';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import styles from './page.module.css';
import Stack from 'react-bootstrap/Stack';
import { Row } from 'react-bootstrap';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

//creating the table with the black borders around each variable
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
    
    //create the input box for the user to enter the data
    //create the button for the user to click to set the variable to obtain the data from datamall
    //display all the information in a table form
    return (
      <div>
        <Stack gap={4} style={{ marginTop: "20px" }}> 
          <Row className="d-flex justify-content-center">
            <Form.Control
              className={styles.input}
              type="text"
              placeholder="Enter MRT line [DTL/NSL/EWL/CCL/NEL/BPL]"
              value={MRTLine}
              onChange={(event) => setMRTLine(event.target.value)}
            />
          </Row>          
          <Row className="d-flex justify-content-center">
            <Button className={styles.button} variant="outline-secondary" onClick={handleButtonClick}>
              Get MRT Crowd
            </Button>
          </Row>
        </Stack>
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
              <h1>Incorrect Input</h1>
            )}
          </div>
        )}
      </div>
    );
}