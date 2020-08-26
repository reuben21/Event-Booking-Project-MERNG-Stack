import React from "react";
import EventItem from './EventItem/EventItem.js';
const eventList=props => {
    const event = props.events.map(event=>{
        return (

            <EventItem key={event._id} eventid={event._id} description={event.description} title={event.title}/>
        );


    });
return (
    <>
        {event}
        </>
);

}

export default eventList;