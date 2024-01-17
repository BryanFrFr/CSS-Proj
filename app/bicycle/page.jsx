'use client';
import parkingData from './api/route.js';
import useSWR from 'swr';
import {useState , useEffect} from 'react';
export default function App(){
    /*const [data, GET] = useState("");
    useEffect(()=>{
        let data = GET();
        return data;
    },[data]);*/
    return(
        <div>{parkingData.RackCount}</div>
    );
}