// use vanilla fetch as fetcher
// deserialize the fetched data as json

export async function GET(request) {
  const res = await fetch("http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=44399", {
    headers: {
      'Content-Type': 'application/json',
      'AccountKey': '9LaRUMo3T7uWgUnDUFfJSw==',
    },
  });

  const data = await res.json();

  return Response.json(data);
}