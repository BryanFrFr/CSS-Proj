export async function GET() {
    const res = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=Singapore,SG&appid=a5d2b58210fd53d653df7d197e551f21");
    const data = await res.json();
    return Response.json(data);
  }