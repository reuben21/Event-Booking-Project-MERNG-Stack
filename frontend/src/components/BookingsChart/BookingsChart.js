import React from "react";
import { Bar as BarChart } from 'react-chartjs';

const BOOKINGS_BUCKETS ={
    'cheap':{
        min:0,
        max:50
    },
    'Normal':{
        min:51,
        max:200
    },
    'Expensive':{
        min:200,
        max:1000000
    },
}

// var myBarChart = new Chart(ctx, {
//     type: 'bar',
//     data: data,
//     options: options
// });

const BookingsChart = props =>{
    const chartData ={labels:[],datasets:[]};

    let values = [];
    for (const bucket in BOOKINGS_BUCKETS){
        const filteredBookingsCount = props.bookings.reduce((prev,current)=>{
            if (
                current.event.price >BOOKINGS_BUCKETS[bucket].min
                &&
                current.event.price < BOOKINGS_BUCKETS[bucket].max
            ){
                return prev+1
            }else {
                return prev;
            }
        },0);

        values.push(filteredBookingsCount);
        chartData.labels.push(bucket);
        chartData.datasets.push({
            // label: "My First dataset",
            fillColor: 'rgba(32,106,93,1)',
            strokeColor: 'rgba(220,220,220,0.8)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: values
        })
        values = [...values];
        values[values.length - 1] = 0;

    }
    return (
        <>
            <div style={{
                textAlign:"center"
            }}>


            <BarChart data={chartData}/>
            </div>
            </>
    );
}

export default BookingsChart;