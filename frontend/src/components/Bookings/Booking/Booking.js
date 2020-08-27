import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EventItemCSS from "../../Event/EventList/EventItem/EventItem.module.css";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#81b214',
        backgroundColor: "#206a5d",
        '&:hover': {
            backgroundColor: "#206a5d",
        },
    },
}))(Button);

const Booking = props =>{
    return (
        <Card key={props.eventid} style={{
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
                        {props.eventTitle}
                    </div>


                    <br/>
                    <Typography style={{
                        color: "#206a5d",
                        display:"block !important",

                    }} component="p">
                        <div className={EventItemCSS.fontClassOpenSans}>
                            Event Date: {props.DateOfEvent}

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
                             color="primary" onClick={props.onDelete}>
                    <div className={EventItemCSS.fontClassSans}>
                        Cancel Booking
                    </div>

                </ColorButton>

            </CardContent>

        </Card>
    );
}

export default Booking;