"use client";
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Image from 'next/image';
import useSWR from 'swr';
import styles from './page.module.css';

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
      <Form.Control
        className={styles.input}
        type="text"
        placeholder="Enter Bus Stop Code"
        value={busStopCode}
        onChange={(event) => setBusStopCode(event.target.value)}
      />
      <Button className={styles.button} variant="outline-secondary" onClick={handleButtonClick}>
        Get Bus Timings
      </Button>
    
      {isButtonClicked && (
        <>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : error ? (
            <h1>Error loading bus arrival data: {error.message}</h1>
          ) : (
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
                          {CalculateBusArrivalTime(service.NextBus.EstimatedArrival)}
                          {DisplayBusType(service.NextBus.Type)}
                          <Image src="/wheelchair.svg" alt="Wheelchair Icon" width={25} height={20} />
                        </td>
                        <td>
                          {CalculateBusArrivalTime(service.NextBus2.EstimatedArrival)}
                          {DisplayBusType(service.NextBus.Type, styles.icon)}
                          <Image src="/wheelchair.svg" alt="Wheelchair Icon" width={25} height={20} />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
