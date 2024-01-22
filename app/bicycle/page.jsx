"use client";
import useSWR from 'swr';
import React from 'react';
const fetcher = (...args) => fetch(...args).then ((res) => res.json());


export default function App(){
  const {data, isLoading, error} =  useSWR('/bicycle/parkingApi', fetcher);
  const {mapData, mapIsLoading, mapError} =  useSWR('/bicycle/mapApi', fetcher);
  
  if (error || mapError) {
    return <div>failed to load</div>
  }
  if (isLoading || mapIsLoading) {
    return <div>loading...</div>
  }
  else {
  console.log(mapData, "hi");
  return(
    <div>{data.value[0].RackCount}</div>
  );
  }
}