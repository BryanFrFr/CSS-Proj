export async function GET() {
    const res = await fetch("http://datamall2.mytransport.sg/ltaodataservice/PCDRealTime?TrainLine=DTL", {
      headers: {
        'Content-Type': 'application/json',
        'AccountKey': 'qKpobOWvRHywqHj9eT/UvQ==',
      },
    });
    const data = await res.json();
    return Response.json(data);
  }