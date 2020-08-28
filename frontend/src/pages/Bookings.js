import React, {Component} from "react";
import AuthContext from "../context/auth-context";
import Typography from "@material-ui/core/Typography";
import EventItemCSS from "../components/Event/EventList/EventItem/EventItem.module.css";
import Spinner from "../components/Spinner/Spinner";
import Bookings from "../components/Bookings/Bookings";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import BookingsChart from "../components/BookingsChart/BookingsChart";

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #81b214',
    },
    indicator: {
        backgroundColor: '#81b214',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: "50%",
        color:"#81b214",
        fontSize:"25px",
        fontFamily: [
            'sans-serif',
                 ].join(','),
        '&:hover': {
            color: '#81b214',
            opacity: 1,
        },
        '&$selected': {
            color: '#81b214',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#81b214',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    indicator:{
      backgroundColor:"black"
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        backgroundColor: "brown",
    },
    demo2: {
        backgroundColor: '#2e1534',
    },
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class BookingsPage extends Component {

    state = {
        isLoading: false,
        bookings: [],
        value: 0
    }

    componentDidMount() {
        this.fetchBookings()
    }

    onDeleteHandler = (bookingId) => {
        const requestBody = {
            query: `
          mutation CancelBooking($id:ID!){
            cancelBooking(bookingId: $id) {
                  _id
                title
            }
          }
          
        `,
            variables: {
                id: bookingId
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
            this.setState(prevState => {
                const updatedBookings = prevState.bookings.filter(booking => {
                    return booking._id !== bookingId
                });
                return {bookings: updatedBookings, isLoading: false}
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
                  price
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
    handleChange = (event, newValue) => {
        this.setState({value: newValue})
    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <Typography style={{
                    color: "#206a5d",
                    fontSize: "40px",
                    textAlign: "center"

                }} component="p">
                    <div className={EventItemCSS.fontClassOpenSans}>
                        Your Booked Events
                    </div>
                </Typography>

                {this.state.isLoading ? (<Spinner/>) : (<>
                        <div className={classes.root}>

                                <AntTabs style={{
                                    backgroundColor:"#206a5d"
                                }} value={this.state.value} onChange={this.handleChange} aria-label="ant example">
                                    <AntTab label="Bookings"  {...a11yProps(0)}/>
                                    <AntTab label="Charts" {...a11yProps(1)} />
                                </AntTabs>

                            <TabPanel value={this.state.value} index={0}>
                                <Bookings bookings={this.state.bookings}
                                          onDelete={this.onDeleteHandler}/>
                            </TabPanel>
                            <TabPanel value={this.state.value} index={1}>
                                <BookingsChart bookings={this.state.bookings}/>
                            </TabPanel>

                        </div>

                    </>
                )
                }


            </>


        );

    }
}

export default withStyles(useStyles)(BookingsPage);