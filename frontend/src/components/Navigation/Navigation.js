import React, {useState} from 'react'
import {
    AppBar,
    Toolbar,
    ListItem,
    IconButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Divider,
    List,
    Typography,
    Box
} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import MovieImage from './Movie Night-amico.png'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import navbarCss from './Navbar.module.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import image1 from '../Assets/Images/Nerd-amico.svg'
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import MobilRightMenuSlider from '@material-ui/core/Drawer';
import AuthContext from '../../context/auth-context'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// CSS STYLES
const useStyles = makeStyles(
    theme => ({
        menuSliderContainer: {
            width: 250,
            background: "#206a5d",
            height: "100%",

        }
        ,
        avatar: {
            display: "block",
            margin: "0.5rem auto",
            width: theme.spacing(13),
            height: theme.spacing(13),

        },
        darkBlue: {
            color: "#206a5d",

        },
        lightBlue: {
            color: "#81b214",

        },
        whiteColor: {
            color: "#81b214",

        },
        iconColor: {
            color: "#81b214",


        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        icon: {
            minWidth: '30px',
        }
    })
)

// const menuItems = [
//     {
//         listIcon: <EventSeatIcon/>,
//         listText: "Events",
//         listPath: "/events"
//     },
//
//     {
//         listIcon: <ConfirmationNumberIcon/>,
//         listText: "Bookings",
//         listPath: "/bookings"
//     }
// ]

const Navbar = props => {


    const [state, setState] = useState({
        left: false
    })
    const toggleSlider = (slider, open) => () => {
        setState({...state, [slider]: open})
    }
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:775px)');
    const slideList = slider => (
        <AuthContext.Consumer>
            {context => {
                return (
                    <Box className={classes.menuSliderContainer}
                         component="div"
                         onClick={toggleSlider(slider, false)}>
                        {/*<Avatar className={classes.avatar} src={image1} alt="Reuben Coutinho"/>*/}
                        <Avatar className={classes.avatar} src={MovieImage} alt="Reuben Coutinho"/>

                        <Divider/>
                        <List>


                            <ListItem button component={NavLink} to={"/events"}>
                                <ListItemIcon className={classes.iconColor}>
                                    <EventSeatIcon/>
                                </ListItemIcon>
                                <ListItemText className={classes.whiteColor}>
                                    <div className={navbarCss.fontBitter}>
                                        Events
                                    </div>

                                </ListItemText>

                            </ListItem>
                            {!context.token &&
                            (<ListItem button component={NavLink} to={"/auth"}>

                                <ListItemIcon className={classes.iconColor}>
                                    <SupervisorAccountIcon/>
                                </ListItemIcon>
                                <ListItemText className={classes.whiteColor}>
                                    <div className={navbarCss.fontBitter}>
                                        Authenticate
                                    </div>

                                </ListItemText>

                            </ListItem>)}
                            {context.token && (
                                <>
                                    <ListItem button component={NavLink} to={"/bookings"}>
                                        <ListItemIcon className={classes.iconColor}>
                                            <ConfirmationNumberIcon/>
                                        </ListItemIcon>
                                        <ListItemText className={classes.whiteColor}>
                                            <div className={navbarCss.fontBitter}>
                                                Bookings
                                            </div>
                                        </ListItemText>
                                    </ListItem>

                                    <ListItem button onClick={context.logout}>
                                        <ListItemIcon className={classes.iconColor}>
                                            <ExitToAppIcon/>
                                        </ListItemIcon>
                                        <ListItemText className={classes.whiteColor}>
                                            <div className={navbarCss.fontBitter}>
                                                Log Out
                                            </div>
                                        </ListItemText>
                                    </ListItem>
                                </>
                            )
                            }

                        </List>
                    </Box>
                )
            }}
        </AuthContext.Consumer>
    )
    if (!matches) {

        return (
            <>

                <Box component="nav">
                    <div className={classes.root}>
                        <AppBar position="static" style={{background: "#206a5d"}}>
                            <Toolbar>
                                <IconButton onClick={toggleSlider("left", true)}>
                                    <MenuRoundedIcon className={classes.whiteColor}></MenuRoundedIcon>
                                </IconButton>

                                <Typography variant="h5" style={{flexGrow: 1}}>
                                    <div className={navbarCss.fontBitter} style={{color: "#81b214"}}>
                                        Go To Events
                                    </div>
                                </Typography>
                                <MobilRightMenuSlider open={state.left}
                                                      onClose={toggleSlider("left", false)}>
                                    {slideList("left")}
                                </MobilRightMenuSlider>

                            </Toolbar>
                        </AppBar>
                    </div>
                </Box>

            </>

        );
    }


    return (


        <AuthContext.Consumer>
            {context => {

                return (
                    <Box component="nav">
                        <div className={classes.root}>
                            <AppBar position="static" style={{background: "#206a5d"}}>
                                <Toolbar>

                                    <div></div>
                                    <Typography variant="h5" style={{flexGrow: 1}}>
                                        <div className={navbarCss.fontBitter} style={{color: "#81b214"}}>
                                            Go To Events
                                        </div>
                                    </Typography>
                                    {!context.token &&
                                    (<Button size="medium" style={{marginLeft: "5px"}} component={NavLink}
                                             to={"/auth"}>
                                        <ListItemIcon className={`${classes.whiteColor} ${classes.icon}`}>
                                            <SupervisorAccountIcon/>
                                        </ListItemIcon>
                                        <ListItemText className={classes.whiteColor}>
                                            <div>
                                                Authenticate
                                            </div>

                                        </ListItemText>
                                    </Button>)
                                    }

                                    <Button size="medium" style={{marginLeft: "5px"}}
                                            component={NavLink} to={"/events"}>
                                        <ListItemIcon className={`${classes.whiteColor} ${classes.icon}`}>
                                            <EventSeatIcon/>
                                        </ListItemIcon>
                                        <ListItemText className={classes.whiteColor}>
                                            <div>
                                                Events
                                            </div>

                                        </ListItemText>
                                    </Button>

                                    {context.token && (
                                        <>
                                            <Button size="medium" style={{marginLeft: "5px"}}
                                                    component={NavLink} to={"/bookings"}>
                                                <ListItemIcon className={`${classes.whiteColor} ${classes.icon}`}>
                                                    <ConfirmationNumberIcon/>
                                                </ListItemIcon>
                                                <ListItemText className={classes.whiteColor}>
                                                    <div>
                                                        Bookings
                                                    </div>

                                                </ListItemText>
                                            </Button>



                                            <Button size="medium" style={{marginLeft: "5px"}}
                                                    onClick={context.logout}>
                                                <ListItemIcon className={`${classes.whiteColor} ${classes.icon}`}>
                                                    <ExitToAppIcon/>
                                                </ListItemIcon>
                                                <ListItemText className={classes.whiteColor}>
                                                    <div>
                                                        Log Out
                                                    </div>

                                                </ListItemText>
                                            </Button>
                                        </>

                                    )
                                    }
                                    <MobilRightMenuSlider open={state.left}
                                                          onClose={toggleSlider("left", false)}>
                                        {slideList("left")}
                                    </MobilRightMenuSlider>

                                </Toolbar>
                            </AppBar>
                        </div>
                    </Box>
                );

            }}
        </AuthContext.Consumer>
    );
}

export default Navbar;