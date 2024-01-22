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
//import {FaWheelchair} from "react-icons/fa6";

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
      <Button className={styles.button} variant="outline-secondary" onClick={() => {
            /* 1. Navigate to the Details route with params */
            props.navigation.navigate("/bus/api", {
              otherParam: busStopCode,
            });
          }}>Get Bus Timings</Button>
    </>
  );
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function handleButtonClick() {
  //const busStopCode = 44399;
  const { data, error, isLoading } = useSWR("/bus/api", fetcher, {
    refreshInterval: 60000, 
    revalidateIfStale: true,
    //revalidateOnFocus: true,
    //revalidateOnReconnect: true,  
  });

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
    const arrivalTimeInMinutes = Math.floor(timeToBusArrival / 60000);
    return arrivalTimeInMinutes <= 0 ? "Arriving" : arrivalTimeInMinutes;
  }

  // render data
  return (
    <div>
      <h1>Bus Arrival Information</h1>
      <Table bordered className={styles.table}>
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
                  <Image src="/wheelchair.png" alt="Wheelchair Icon" width={25} height={20}/>
                </td>
                <td>{CalculateBusArrivalTime(service.NextBus2.EstimatedArrival)}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}