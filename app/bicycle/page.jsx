'use client';
import {FetchAPI} from './api/route.js';
import useSWR from 'swr';
import {useState , useEffect} from 'react';
const parkingData = FetchAPI();
export default function App(){
    /*const [data, FetchAPI] = useState("");
    useEffect(()=>{
        let data = FetchAPI();
        return data;
    },[data]);*/
    const {data,err,loading} = useSWR(parkingData)
    return(
        <div>{parkingData}</div>
    );
}