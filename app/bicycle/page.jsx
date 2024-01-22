"use client";
import useSWR from 'swr';
import React from 'react';
const fetcher = (...args) => fetch(...args).then ((res) => res.json());

export default function App(){
  const {data, isLoading, error} =  useSWR('/bicycle/api', fetcher); 
  console.log(data.RackCount);
  console.log("hi")
  if (error) {
    return <div>failed to load</div>
  }
  if (isLoading) {
    return <div>loading...</div>
  }
  return(
    <div>hello</div>
  );
}