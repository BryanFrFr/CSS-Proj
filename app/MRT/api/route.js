// Done by: Ayden See

export async function GET(request) { 
  const { searchParams } = new URL(request.url)
  const MRTLine = searchParams.get('MRTLine');
  //fetch the data from the datamall website to display
    const res = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/PCDRealTime?TrainLine=${MRTLine}`, {
      headers: {
        'Content-Type': 'application/json',
        
        //qKpobOWvRHywqHj9eT/UvQ== (Ayden 1st key)
        //9Kvtj7kzQdyOgqeR4K1Bfg== (Ayden 2nd key)
        //gnT3uIc4Q4G151/hKaMiAg== (Bryan key)
        'AccountKey': process.env.LTA_DATAMALL_API_KEY_MRT,
      },
    });
    const data = await res.json();
    return Response.json(data);
  }