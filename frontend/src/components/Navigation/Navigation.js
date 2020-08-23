import React,{ useState } from 'react'
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
import {

    Home,
} from "@material-ui/icons"
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import navbarCss from './Navbar.module.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import image1 from '../Assets/Images/Nerd-amico.svg'
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import MobilRightMenuSlider from '@material-ui/core/Drawer'

// CSS STYLES
const useStyles = makeStyles(
    theme => ({
        menuSliderContainer: {
            width: 250,
            background: "#96c7d8",
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
            color: "#0076a0",

        },
        lightBlue: {
            color: "#96c7d8",

        },
        whiteColor: {
            color: "white",

        },
        iconColor: {
            color: "white",


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

const menuItems = [
    {
        listIcon: <Home/>,
        listText: "Home",
        listPath: "/"
    },
    {
        listIcon: <EventSeatIcon/>,
        listText: "Events",
        listPath: "/events"
    },
    {
        listIcon: <SupervisorAccountIcon/>,
        listText: "Authenticate",
        listPath: "/auth"
    },
    {
        listIcon: <ConfirmationNumberIcon/>,
        listText: "Bookings",
        listPath: "/bookings"
    }
]

const Navbar = () => {

    const [state,setState] = useState({
        left:false
    })
    const toggleSlider=(slider,open)=>()=>{
        setState({...state,[slider]:open})
    }
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:775px)');
    const slideList = slider =>(

        <Box className={classes.menuSliderContainer}
             component="div"
             onClick={toggleSlider(slider,false)}>
            {/*<Avatar className={classes.avatar} src={image1} alt="Reuben Coutinho"/>*/}
            <Avatar className={classes.avatar}  alt="Reuben Coutinho"/>

            <Divider/>
            <List>
                {menuItems.map((lsItem, key) => (
                    <ListItem button key={key} component={Link} to={lsItem.listPath}>

                        <ListItemIcon className={classes.iconColor}>
                            {lsItem.listIcon}
                        </ListItemIcon>
                        <ListItemText className={classes.whiteColor}>
                            <div className={navbarCss.fontBitter}>
                                {lsItem.listText}
                            </div>

                        </ListItemText>

                    </ListItem>
                ))}

            </List>
        </Box>
    )
    if (!matches) {
        return (

            <>

                <Box component="nav">
                    <div className={classes.root}>
                        <AppBar position="static" style={{background: "#0076a0"}}>
                            <Toolbar>
                                <IconButton onClick={toggleSlider("left",true)}>
                                    <MenuRoundedIcon className={classes.whiteColor}></MenuRoundedIcon>
                                </IconButton>
                                <div></div>
                                <Typography variant="h5" style={{ flexGrow:1 }} >
                                    <div className={navbarCss.fontBitter}>
                                        Reuben Coutinho
                                    </div>
                                </Typography>
                                <MobilRightMenuSlider  open={state.left}
                                                       onClose={toggleSlider("left",false)}>
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

        <>

            <Box component="nav">
                <div className={classes.root}>
                    <AppBar position="static" style={{background: "#0076a0"}}>
                        <Toolbar>

                            <div></div>
                            <Typography variant="h5" style={{ flexGrow:1 }} >
                                <div className={navbarCss.fontBitter}>
                                    Go To Events
                                </div>
                            </Typography>

                            {menuItems.map((lsItem, key) => (
                                <Button size="medium" style={{ marginLeft:"5px"}} key={key} component={Link} to={lsItem.listPath}>
                                    <ListItemIcon className={ `${classes.whiteColor} ${classes.icon}`}>
                                        {lsItem.listIcon}
                                    </ListItemIcon>
                                    <ListItemText className={classes.whiteColor}>
                                        <div>
                                            {lsItem.listText}
                                        </div>

                                    </ListItemText>
                                </Button>
                            ))}


                            <MobilRightMenuSlider  open={state.left}
                                                   onClose={toggleSlider("left",false)}>
                                {slideList("left")}
                            </MobilRightMenuSlider>

                        </Toolbar>
                    </AppBar>
                </div>
            </Box>

        </>
    );
}

export default Navbar;