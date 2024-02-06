export async function GET(request) { 
  const { searchParams } = new URL(request.url)
  const MRTLine = searchParams.get('MRTLine');
    const res = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/PCDRealTime?TrainLine=${MRTLine}`, {
      headers: {
        'Content-Type': 'application/json',
        
        //qKpobOWvRHywqHj9eT/UvQ== (Ayden 1st key)
        //9Kvtj7kzQdyOgqeR4K1Bfg== (Ayden 2nd key)
        //gnT3uIc4Q4G151/hKaMiAg== (Bryan key)
        'AccountKey': '9Kvtj7kzQdyOgqeR4K1Bfg==',
      },
    });
    const data = await res.json();
    return Response.json(data);
  }