"use client";
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BusData from './api/route.jsx';

function FormTextExample() {
  const [busStopCode, setBusStopCode] = useState('');

  function handleInputChange(event) {
    setBusStopCode(event.target.value);
  }
  return (
    <>
      <Form.Control type="text" placeholder="Enter Bus Stop Code" value={busStopCode} onChange={handleInputChange} />
      <Button variant="outline-secondary">Get Bus Timings</Button>{' '}
    </>
  );
}

 FormTextExample;

export default function App() {
  const { data, error, isLoading } = useSWR(BusData);

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