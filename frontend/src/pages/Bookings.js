import React, {Component} from "react";
import AuthContext from "../context/auth-context";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EventItemCSS from "../components/Event/EventList/EventItem/EventItem.module.css";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Spinner from "../components/Spinner/Spinner";

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#81b214',
        backgroundColor: "#206a5d",
        '&:hover': {
            backgroundColor: "#206a5d",
        },
    },
}))(Button);

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
          mutation {
            cancelBooking(bookingId:"${bookingId}") {
                  _id
                title
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

                {this.state.isLoading? (<Spinner/>):(<> {this.state.bookings.map(booking => {
                        return (
                            <>
                                <Card key={this.props.eventid} style={{
                                    margin: "10px auto",
                                    backgroundColor: "#bfdcae",
                                    width: "90%",
                                    borderRadius: "20px",
                                    alignContent: "center",
                                    border: "1px solid #206a5d",
                                    display: "flex",
                                    justifyContent: "space-evenly"
                                }}>
                                    <CardContent style={{
                                        display: "flex",
                                    }}>

                                        <Typography style={{
                                            color: "#206a5d",
                                            fontSize:"30px",
                                            marginBottom: "10px"
                                        }} variant="h4" component="h2">
                                            <div className={EventItemCSS.fontClassCursive}>
                                                {booking.event.title}
                                            </div>


                                            <br/>
                                            <Typography style={{
                                                color: "#206a5d",
                                                display:"block !important",

                                            }} component="p">
                                                <div className={EventItemCSS.fontClassOpenSans}>
                                                    Event Date: {new Date(booking.createdAt).toLocaleDateString()}

                                                </div>
                                            </Typography>



                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        {/*{this.props.userId === this.props.creatorId ?<p>Your the owner of this Event</p>: */}
                                        <ColorButton style={{color: "#81b214",width: "80px",
                                            borderRadius:"10px",
                                            justifyContent:'justify-center'
                                        }}
                                                     type="submit"
                                                     variant="contained"
                                                     color="primary" onClick={()=>{
                                                         this.onDeleteHandler(booking._id

                                                         )
                                                     }
                                        }>
                                            <div className={EventItemCSS.fontClassSans}>
                                                Cancel Booking
                                            </div>

                                        </ColorButton>

                                    </CardContent>

                                </Card>

                            </>
                        )})}</>)



                    }




            </>


        );

    }
}

export default BookingsPage;