// Done by: See Wai Kee, Audrey

"use client";
import React, { useState } from 'react';
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
      refreshInterval: 60000,   // refresh the data every minute  
      revalidateOnFocus: true,  // revalidates data when a page is re-focused or switched between tabs
    }
  );

  function handleButtonClick() {
    // Update isButtonClick to true when users clicks on the button
    setIsButtonClicked(true);
  };

  function calculateBusArrivalTime(arrivalTime) {
    const currentTime = new Date();
    const timeToBusArrival = new Date(arrivalTime) - currentTime;
    const arrivalTimeInMinutes = Math.floor(timeToBusArrival / 60000);
    return arrivalTimeInMinutes <= 0 ? 'Arr' : arrivalTimeInMinutes;
  }

  function getBusType(BusType) {
    if (BusType === 'DD') {    // 'DD' stands for 'Double Decker (Bus)'
      return (
        <Image src="/double decker.svg" alt="Double Decker Bus Icon" width={20} height={25} />
      );
    } else if (BusType === 'SD') {    // 'SD' stands for 'Single Decker (Bus)'
      return (
        <Image src="/single decker.svg" alt="Single Decker Bus Icon" width={20} height={20} />
      );
    } else {     // bus type is Articulated Bus (Bendy Bus)
      return (
        <div>AB</div>
      )
    }
  }

  function getBusLoad(BusLoad) {
    if (BusLoad === 'SEA') {    // 'SEA' stands for 'Seats Available'
      return (
        <div className={styles.sea}></div>
      );
    } else if (BusLoad === 'SDA') {     // 'SDA' stands for 'Standing Available'
      return (
        <div className={styles.sda}></div>
      );
    } else {     // no seats are available and only limited standing space, i.e. Limited Standing (lsd)
      return (
        <div className={styles.lsd}></div>
      )
    }
  }

  function getBusAccessibility(BusFeature) {
    if (BusFeature === 'WAB') {    // 'WAB' equals to 'Wheelchair accessible'
      return (
        <Image src="/wheelchair.svg" alt="Wheelchair Icon" width={25} height={20} />
      )
    }
  }

  function handleBusInput(event) {
    // Update busStopCode state with the value entered by the user
    setBusStopCode(event.target.value);

    // Sets isButtonClick to false everytime the user clickes on the 'Get Bus Timings' buttom but the bus stop code entered 
    // is not 5 digits long or when the data has loaded and the user changes the input for the bus stop code. 
    // Prevents multiple fetches from the API
    if (busStopCode.length !== 5) {
      setIsButtonClicked(false);
    }
  }

  function DisplayLegend() {
    return (
      <Container>
        <Row className={styles.legend}>
          <Col className={styles.centralise}>
            <Image src="/wheelchair.svg" alt="Wheelchair Icon" width={25} height={20} />
          </Col>
          <Col className={styles.centralise}>
            <div className={styles.sea}></div>
          </Col>
          <Col className={styles.centralise}>
            <div className={styles.sda}></div>
          </Col>
          <Col className={styles.centralise}>
            <div className={styles.lsd}></div>
          </Col>
          <Col className={styles.centralise}>AB</Col>
        </Row>
        <Row className={styles.space}>
          <Col className={styles.centralise}>Wheelchair Accessible</Col>
          <Col className={styles.centralise}>Seats Available</Col>
          <Col className={styles.centralise}>Standing Available</Col>
          <Col className={styles.centralise}>Limited Standing</Col>
          <Col className={styles.centralise}>Articulated Bus</Col>
        </Row>
      </Container>
    )
  }

  function DisplayBusTimings({ estimatedArrival, busType, busLoad, busAccessibility }) {
    return (
      <>
        {estimatedArrival !== '' ? (
          <Container className={styles.table}>
            <div className={styles.timing}>{estimatedArrival != null ?
              calculateBusArrivalTime(estimatedArrival) : "None"}
            </div>
            <div className={styles.type}>{getBusType(busType)}</div>
            <div className={styles.load}>{getBusLoad(busLoad)}</div>
            <div className={styles.accessibility}>{getBusAccessibility(busAccessibility)}</div>
          </Container>
        ) : (
          <Container className={styles.table}>-</Container>
        )}
      </>
    );
  }

  return (
    <div>
      <Stack gap={4} className={styles.stack}>
        <Row className={styles.centralise}>
          <Form.Control
            className={styles.input}
            type="text"
            placeholder="Enter Bus Stop Code"
            value={busStopCode}
            onChange={handleBusInput}
          />
        </Row>
        <Row className={styles.centralise}>
          <Button className={styles.button} variant="outline-secondary" onClick={handleButtonClick}>
            Get Bus Timings
          </Button>
        </Row>
      </Stack>

      {isButtonClicked && (
        console.log(data),
        <>
          {error ? (
            <h1>Error loading bus arrival data: {error.message}</h1>
          ) : isLoading ? (
            <div className={styles.centralise}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (data.Services !== undefined && data.BusStopCode.length === 5 && data.Services.length > 0) ? (
            <div>
              <DisplayLegend />
              <Table bordered>
                <thead>
                  <tr className={styles.text}>
                    <th>Service</th>
                    <th>Next Arrival</th>
                    <th>Subsequent Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {data.Services.map((service) => (
                    <React.Fragment key={service.ServiceNo}>
                      <tr>
                        <td>
                          <Container className={styles.table}>{service.ServiceNo}</Container>
                        </td>
                        <td>
                          <DisplayBusTimings estimatedArrival={service.NextBus.EstimatedArrival} busType={service.NextBus.Type}
                            busLoad={service.NextBus.Load} busAccessibility={service.NextBus.Feature} />
                        </td>
                        <td>
                          <DisplayBusTimings estimatedArrival={service.NextBus2.EstimatedArrival} busType={service.NextBus2.Type}
                            busLoad={service.NextBus2.Load} busAccessibility={service.NextBus2.Feature} />
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