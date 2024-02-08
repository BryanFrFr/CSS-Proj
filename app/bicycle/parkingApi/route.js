// Done by: Bryan Goh

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat');
  const long = searchParams.get('long');
  const dist = searchParams.get('dist');
  const res = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BicycleParkingv2?Lat=${lat}&Long=${long}&Dist=${dist}`, {
    headers: {
      'Content-Type': 'application/json',
      'AccountKey': process.env.LTA_DATAMALL_API_KEY_BICYCLE,
    },
  });
  const data = await res.json();
  return Response.json(data);
}
