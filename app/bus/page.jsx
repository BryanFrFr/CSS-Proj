"use client";
import Container from 'react-bootstrap/Container';
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./page.module.css";

function FormTextExample() {
  const [busStopCode, setBusStopCode] = useState('');

  function handleInputChange(event) {
    setBusStopCode(event.target.value);
  }
  return (
    <>
      <Form.Control
        className={styles.input}
        type="text"
        placeholder="Enter Bus Stop Code"
        value={busStopCode}
        onChange={handleInputChange} />
      <Button className={styles.button} variant="outline-secondary">Get Bus Timings</Button>{' '}
    </>
  );
}

FormTextExample;

const fetcher = (...args) =>
  fetch(...args).then((res) => res.json());

export default function App() {
  const { data, error, isLoading } = useSWR("/bus/api", fetcher);

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