"use client";
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Image2 from 'next/image';
import useSWR from 'swr';
import styles from './page.module.css';
import { Row } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';


const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BusTimings() {
  const [busStopCode, setBusStopCode] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { data, error, isLoading } = useSWR(
    isButtonClicked ? `/bus/api?busStopCode=${busStopCode}` : null,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    /*
    if (isButtonClicked === true) {
      setIsButtonClicked(false);
    } else if (isButtonClicked === false && busStopCode.toString().length === 5) {
      setIsButtonClicked(true);
    }*/
  };

  function CalculateBusArrivalTime(arrivalTime) {
    const currentTime = new Date();
    const timeToBusArrival = new Date(arrivalTime) - currentTime;
    const arrivalTimeInMinutes = Math.floor(timeToBusArrival / 60000);
    return arrivalTimeInMinutes <= 0 ? 'Arriving' : arrivalTimeInMinutes;
  }

  function DisplayBusType(BusType) {
    if (BusType === 'DD') {
      return (
        <Image src="/double decker.svg" alt="Double Decker Bus Icon" width={20} height={25} />
      );
    } else if (BusType === 'SD') {
      return (
        <Image src="/single decker.svg" alt="Single Decker Bus Icon" width={20} height={20} />
      );
    } else {
      return <Image src="/wheelchair.svg" alt="Wheelchair Icon" width={25} height={20} />;
    }
  }

  return (
    <div>
      <Stack gap={4}>
        <Row className="d-flex justify-content-center">
          <Form.Control
            className={styles.input}
            type="text"
            placeholder="Enter Bus Stop Code"
            value={busStopCode}
            onChange={(event) => setBusStopCode(event.target.value)}
          />
        </Row>
        <Row className="d-flex justify-content-center">
          <Button className={styles.button} variant="outline-secondary" onClick={handleButtonClick}>
            Get Bus Timings
          </Button>
        </Row>
      </Stack>

      {isButtonClicked && (
        <>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : error ? (
            <h1>Error loading bus arrival data: {error.message}</h1>
          ) : data.Services != undefined ? (
            <div>
              <h1>Bus Arrival Information</h1>
              <Table bordered className={styles.table} style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Next Arrival</th>
                    <th>Subsequent Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {data.Services.map((service) => (
                    <React.Fragment key={service.ServiceNo}>
                      <tr>
                        <td>{service.ServiceNo}</td>
                        <td>
                          {console.log(service.NextBus.EstimatedArrival)}
                          {service.NextBus.EstimatedArrival != null
                          ? CalculateBusArrivalTime(service.NextBus.EstimatedArrival) 
                          : "None"}
                          {DisplayBusType(service.NextBus.Type)}
                          <Image src="holder.js/171x180" width={10} height={10} className={styles.placeholder}/>
                          <Image src="/wheelchair.svg" alt="Wheelchair Icon" width={25} height={20} />
                        </td>
                        <td>
                          {CalculateBusArrivalTime(service.NextBus2.EstimatedArrival)}
                          {DisplayBusType(service.NextBus.Type)}
                          <Image src="/wheelchair.svg" alt="Wheelchair Icon" width={25} height={20} />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}
    </div>
  );
}


/*
      <Row>
        <Col md={{ offset: 4 }}>
          <Form.Control
            className={styles.input}
            type="text"
            placeholder="Enter Bus Stop Code"
            value={busStopCode}
            onChange={(event) => setBusStopCode(event.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={{ offset: 4 }}>
          <Button className={styles.button} variant="outline-secondary" onClick={handleButtonClick}>
            Get Bus Timings
          </Button>
        </Col>
      </Row>
*/