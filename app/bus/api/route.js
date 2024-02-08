// Done by: See Wai Kee, Audrey

export async function GET(request) {
  // get the busStopCode parameter from the API call in page.jsx
  const { searchParams } = new URL(request.url)
  const busStopCode = searchParams.get('busStopCode');

  const res = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Content-Type': 'application/json',
      'AccountKey': process.env.LTA_DATAMALL_API_KEY_BUS,
    },
  });

  const data = await res.json();    // deserialize the fetched data as json

  return Response.json(data);
}