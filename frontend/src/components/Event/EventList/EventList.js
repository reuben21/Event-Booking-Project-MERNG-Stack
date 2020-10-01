import React from "react";
import EventItem from './EventItem/EventItem.js';
const eventList=props => {
    const event = props.events.map(event=>{
        return (

            <EventItem key={event._id}
                       eventid={event._id}
                       price={event.price}
                       description={event.description}
                       title={event.title}
                        userId={props.authUserId}
                       date={event.date}
                    //    creatorId={event.creator._id}
                       creatorId={"Secret"}
                    
                    

            />
        );


    });
return (
    <>
        {event}
        </>
);

}

export default eventList;