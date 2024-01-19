import { GET } from './api/route.js';

async function fetchData() {
  try {
    const res = await GET(); // Use the imported GET function
    console.log(res); // Assuming you want to log the data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default function App() {
  fetchData(); // Call the fetchData function

  return (
    <div>
      {}
    </div>
  );
}