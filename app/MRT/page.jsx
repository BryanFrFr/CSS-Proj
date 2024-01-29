"use client";
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then ((res) => res.json());


export default function App(){
  const {data, isLoading, error} =  useSWR('/MRT/api', fetcher); 
  if (error) {
    return <h1>Failed to load</h1>
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return(
    <div>
      {MyComponent()}
      {data.value[0].Station}</div>
  );
}