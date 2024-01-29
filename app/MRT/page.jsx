"use client";
import useSWR from 'swr';
import React from 'react';
const fetcher = (...args) => fetch(...args).then ((res) => res.json());


export default function App(){
  const {data, isLoading, error} =  useSWR('/MRT/api', fetcher); 
  if (error) {
    return <h1>Failed to load</h1>
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return(
    <div>help{data.value[0].Station}</div>
  );
}

return (
  <div>
    <Stack gap={4}>
      <Row className="d-flex justify-content-center">
        <Form.Control
          className={styles.input}
          type="text"
          placeholder="Enter MRT Line Abbreviation"
          value={busStopCode}
          onChange={(event) => setBusStopCode(event.target.value)}
        />
      </Row>
      <Row className="d-flex justify-content-center">
        <Button className={styles.button} variant="outline-secondary" onClick={handleButtonClick}>
          Get MRT Line
        </Button>
      </Row>
    </Stack>
    </div>
)