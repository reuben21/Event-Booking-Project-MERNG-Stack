import React from "react";
// import EventItem from "../Event/EventList/EventItem/EventItem";
import Booking2 from "./Booking/Booking.js";
const Bookings = props =>{
    const Booking = props.bookings.map(booking=>{
        return (

            <Booking2 key={booking._id}
                       eventid={booking._id}
                       eventTitle={booking.event.title}
                       DateOfEvent={new Date(booking.createdAt).toLocaleDateString()}
                       onDelete={props.onDelete.bind(this, booking._id)}

            />
        );});
    return (
        <>
        {Booking}
        </>
    );

}
export default Bookings;