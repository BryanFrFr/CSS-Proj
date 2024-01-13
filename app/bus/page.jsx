"use client";
import Spinner from "react-bootstrap/Spinner";
import useSWR from "swr";

// use vanilla fetch as fetcher
// deserialize the fetched data as json
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      'AccountKey': '9LaRUMo3T7uWgUnDUFfJSw==', // Replace with your actual API key
    },
  }).then((res) => res.json());

export default function App() {
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