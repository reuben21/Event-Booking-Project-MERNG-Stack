import React, {Component} from "react";
import AuthContext from "../context/auth-context";
import Typography from "@material-ui/core/Typography";
import EventItemCSS from "../components/Event/EventList/EventItem/EventItem.module.css";
// import {withStyles} from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Spinner from "../components/Spinner/Spinner";
import Bookings from "../components/Bookings/Bookings";
// const ColorButton = withStyles((theme) => ({
//     root: {
//         color: '#81b214',
//         backgroundColor: "#206a5d",
//         '&:hover': {
//             backgroundColor: "#206a5d",
//         },
//     },
// }))(Button);

class BookingsPage extends Component {

    state = {
        isLoading: false,
        bookings: []
    }

    componentDidMount() {
        this.fetchBookings()
    }

    onDeleteHandler =(bookingId)=>{
        const requestBody = {
            query: `
          mutation CancelBooking($id:ID!){
            cancelBooking(bookingId: $id) {
                  _id
                title
            }
          }
          
        `,
            variables:{
                id:bookingId
            }
        };


        const token = this.context.token;
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        }).then(resData => {
            this.setState(prevState=>{
                const updatedBookings =  prevState.bookings.filter(booking=>{
                    return booking._id !== bookingId
                });
                return { bookings:updatedBookings,isLoading:false}
            })
        }).catch(err => {
            console.log(err);

        })
    }

    static contextType = AuthContext;


    fetchBookings = () => {
        this.setState({isLoading: true})
        const requestBody = {
            query: `
            query {
                bookings {
                  _id
                  createdAt
                  event {
                  _id
                  title
                  date
                    }
            }
          }
        `
        };

        const token = this.context.token;
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        }).then(resData => {

            const events = resData.data.bookings;
            this.setState({bookings: events, isLoading: false})
        }).catch(err => {
            console.log(err);
            this.setState({isLoading: false})
        })
    }

    render() {
        return (
            <>
                <Typography style={{
                    color: "#206a5d",
                    fontSize:"40px",
                    textAlign:"center"

                }} component="p">
                    <div className={EventItemCSS.fontClassOpenSans}>
                        Your Booked Events
                    </div>
                </Typography>

                {this.state.isLoading? (<Spinner/>):(<> <Bookings bookings={this.state.bookings}
                                                                    onDelete={this.onDeleteHandler}/>
                                                                    </>
                )
                    }




            </>


        );

    }
}

export default BookingsPage;