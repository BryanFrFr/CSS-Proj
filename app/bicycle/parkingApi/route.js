 export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat');
  const long = searchParams.get('long');
    const res = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BicycleParkingv2?Lat=${lat}&Long=${long}&Dist=1`, {
      headers: {
        'Content-Type': 'application/json',
        'AccountKey': 'gnT3uIc4Q4G151/hKaMiAg==',
      },
    });
    const data = await res.json();
    return Response.json(data);
  }
