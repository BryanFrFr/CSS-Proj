// use vanilla fetch as fetcher
// deserialize the fetched data as json

export async function GET(request) {
  const busStopCode = request.query.get('busStopCode');
  const res = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`, {
    headers: {
      'cache': 'no-store',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Content-Type': 'application/json',
      'AccountKey': '9LaRUMo3T7uWgUnDUFfJSw==',
    },
    });

  const data = await res.json();

  return Response.json(data);
}