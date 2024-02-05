"use client";
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import useSWR from 'swr';
import styles from './page.module.css';
import { Row } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';


const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BusTimings() {
  const [busStopCode, setBusStopCode] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { error, isLoading, data } = useSWR(
    isButtonClicked ? `/bus/api?busStopCode=${busStopCode}` : null,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateIfStale: true,
    }
  );

  function handleButtonClick() {
    setIsButtonClicked(prev => !prev)
  };

  function CalculateBusArrivalTime(arrivalTime) {
    if (arrivalTime === "") {
      return (
        "-"
      )
    } else {
      const currentTime = new Date();
      const timeToBusArrival = new Date(arrivalTime) - currentTime;
      const arrivalTimeInMinutes = Math.floor(timeToBusArrival / 60000);
      return arrivalTimeInMinutes <= 0 ? 'Arr' : arrivalTimeInMinutes;
    }
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
    }
  }

  function DisplayBusLoad(BusLoad) {
    if (BusLoad === 'SEA') {
      return (
        <div style={{ backgroundColor: '#008000', height: '10px', width: '10px', borderRadius: '50px' }}></div>
      );
    } else if (BusLoad === 'SDA') {
      return (
        <div style={{ backgroundColor: '#f6c226', height: '10px', width: '10px', borderRadius: '50px' }}></div>
      );
    } else {
      return (
        <div style={{ backgroundColor: '#ff0000', height: '10px', width: '10px', borderRadius: '50px' }}></div>
      )
    }
  }

  function DisplayBusAccessibility(BusFeature) {
    if (BusFeature === 'WAB') {
      return (
        <Image src="/wheelchair.svg" alt="Wheelchair Icon" width={25} height={20} />
      )
    }
  }

  return (
    <div>
      <Stack gap={4} style={{ marginTop: "20px"}}>
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
            <Spinner animation="border" role="status" className="d-flex justify-content-center">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : error ? (
            <h1>Error loading bus arrival data: {error.message}</h1>
          ) : (data.Services !== undefined && data.BusStopCode.length === 5 && data.Services.length > 0) ? (
            <div>
              <h1>Bus Arrival Information</h1>
              <Table bordered>
                <thead>
                  <tr style={{ textAlign: 'center' }}>
                    <th>Service</th>
                    <th>Next Arrival</th>
                    <th>Subsequent Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {data.Services.map((service) => (
                    <React.Fragment key={service.ServiceNo}>
                      <tr>
                        <td style={{ textAlign: 'center' }}>{service.ServiceNo}</td>

                        <td>
                          {service.NextBus.EstimatedArrival !== '' ? (
                            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ marginRight: '25px', width: '10px' }}>
                                {service.NextBus.EstimatedArrival != null ?
                                  CalculateBusArrivalTime(service.NextBus.EstimatedArrival) : "None"}
                              </div>
                              <div style={{ marginRight: '25px', width: '10px', textAlign: 'left' }}>{DisplayBusType(service.NextBus.Type)}</div>
                              <div style={{ marginRight: '8px', width: '10px' }}>{DisplayBusLoad(service.NextBus.Load)}</div>
                              <div style={{ margin: '5px', width: '10px' }}>{DisplayBusAccessibility(service.NextBus.Feature)}</div>
                            </Container>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</div>
                          )}
                        </td>

                        <td>
                          {service.NextBus2.EstimatedArrival !== '' ? (
                            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ marginRight: '25px', width: '10px' }}>
                                {service.NextBus.EstimatedArrival != null ?
                                  CalculateBusArrivalTime(service.NextBus2.EstimatedArrival) : "None"}
                              </div>
                              <div style={{ marginRight: '25px', width: '10px', textAlign: 'left' }}>{DisplayBusType(service.NextBus2.Type)}</div>
                              <div style={{ marginRight: '8px', width: '10px' }}>{DisplayBusLoad(service.NextBus2.Load)}</div>
                              <div style={{ margin: '5px', width: '10px' }}>{DisplayBusAccessibility(service.NextBus2.Feature)}</div>
                            </Container>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</div>
                          )}
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