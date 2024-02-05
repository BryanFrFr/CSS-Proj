export async function GET(request) { 
  const { searchParams } = new URL(request.url)
  const MRTLine = searchParams.get('MRTLine');
    const res = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/PCDRealTime?TrainLine=${MRTLine}`, {
      headers: {
        'Content-Type': 'application/json',
        'AccountKey': 'qKpobOWvRHywqHj9eT/UvQ==',
      },
    });
    const data = await res.json();
    return Response.json(data);
  }