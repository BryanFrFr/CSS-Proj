"use client";
import Container from 'react-bootstrap/Container';
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./page.module.css";
import Table from 'react-bootstrap/Table';
import Image from 'next/image';

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
      <Button className={styles.button} variant="outline-secondary" onClick={handleButtonClick}>Get Bus Timings</Button>
    </>
  );
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function handleButtonClick() {
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

  function CalculateBusArrivalTime(arrivalTime) {
    const currentTime = new Date();
    const timeToBusArrival = new Date(arrivalTime) - currentTime;
    console.log(arrivalTime);
    console.log(timeToBusArrival /60000);
    return timeToBusArrival;
  }

  // render data
  return (
    <div>
      <h1>Bus Arrival Information</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Service</th>
            <th>Next Arrival</th>
            <th>Subsequent Arrival</th>
          </tr>
        </thead>
        <tbody>
          {data.Services.map(service => (
            <React.Fragment key={service.ServiceNo}>
              <tr>
                <td>{service.ServiceNo}</td>
                <td>
                  {CalculateBusArrivalTime(service.NextBus.EstimatedArrival)}
                </td>
                <td>{service.NextBus2.EstimatedArrival}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}