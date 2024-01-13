"use client";
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormTextExample() {
  const [busStopCode, setBusStopCode] = useState('');
  const handleInputChange = (event) => {
    setBusStopCode(event.target.value);
  };
  return (
    <>
      <Form.Control type="text" placeholder="Enter Bus Stop Code" value={busStopCode} onChange={handleInputChange}/>
      <Button variant="outline-secondary">Get Bus Timings</Button>{' '}
    </>
  );
}

export default FormTextExample;

// use vanilla fetch as fetcher
// deserialize the fetched data as json
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      'AccountKey': '9LaRUMo3T7uWgUnDUFfJSw==', 
    },
  }).then((res) => res.json());

function App() {
  const BUS_ARRIVAL_API_URL = "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=44399";
  const { data, error, isLoading } = useSWR(BUS_ARRIVAL_API_URL, fetcher);

  if (error) {
    return <h1>Error loading bus arrival data: {error.message}</h1>;
  }
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // render data
  return (
    <section>
      <h1>Bus Arrival Timings</h1>
      <h1>{data.BusStopCode}</h1>
    </section>
  );
}