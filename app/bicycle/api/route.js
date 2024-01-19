  export async function GET() {
    const res = await fetch("http://datamall2.mytransport.sg/ltaodataservice/BicycleParkingv2?Lat=1.364897&Long=103.766094", {
      headers: {
        'Content-Type': 'application/json',
        'AccountKey': 'gnT3uIc4Q4G151/hKaMiAg==',
      },
    });
  
    const data = await res.json();
    return data; // Return the data directly
  }
