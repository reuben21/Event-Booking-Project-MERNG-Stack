import React, {StrictMode} from "react";
import 'date-fns';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AuthContext from '../context/auth-context'
const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#81b214',
            fontSize: "20px"

        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#81b214',


        },
        '& .MuiOutlinedInput-root': {
            fontSize: "20px",
            '& fieldset': {
                borderColor: '#81b214',
                fontSize: "20px"

            },
            '&:hover fieldset': {
                borderColor: '#206a5d',
                fontSize: "20px"

            },
            '&.Mui-focused fieldset': {
                borderColor: '#81b214',
                fontSize: "20px"

            },
        },
    },
})(TextField);

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#81b214',
        backgroundColor: "#206a5d",
        '&:hover': {
            backgroundColor: "#206a5d",
        },
    },
}))(Button);

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#206a5d"
        }
    },
});

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        width: "70%",
        height: "400px",
        backgroundColor: "#bfdcae",
        outlineColor:"#206a5d",
        borderColor:"#206a5d",

    };
}

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(5),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    multilineColor: {
        color: '#206a5d',
        fontSize: "20px",
        width:"250px"
    }
}));

const EventsPage = () => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [description,setDescription] = React.useState('')

    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-01-01T21:11:54'));

    AuthContext;

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // const {classes} = this.props;
    const matches = useMediaQuery('(min-width:775px)');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${title},
            Submitting Price ${price}
            Description Price ${description}
            Date is ${selectedDate.toISOString()}`)
        const requestBody = {
            query: `
            query{
                createEvent(eventInput:{title:"${title}",description:"${description}",price:${Number(price)},date:"${selectedDate.toISOString()}"){
               _id
               title
               description
               date
               price
               creator {
                    _id
                    email
                    }
                }
            }
            `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        }).then(resData => {
            // if (resData.data.login.token) {
            //     this.context.login(
            //         resData.data.login.token
            //         , resData.data.login.userId
            //         , resData.data.login.tokenExpiration)
            // }
        }).catch(err => {
            console.log(err);
        })

    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <div>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"

                    >
                        <CssTextField style={{marginTop: "20px", display: "block",}}
                                      InputProps={{
                                          className: classes.multilineColor
                                      }}
                                      label=" Title "
                                      variant="outlined"
                                      id="custom-css-outlined-input"
                                      value={title}
                                      onChange={e => setTitle(e.target.value)}
                        />
                        <CssTextField style={{marginTop: "20px", display: "block", color: "green"}}
                                      InputProps={{
                                          className: classes.multilineColor
                                      }}
                                      label=" Price "
                                      variant="outlined"
                                      id="custom-css-outlined-input"
                                      value={price}
                                      onChange={e => setPrice(e.target.value)}
                        />
                        <textarea style={{
                            backgroundColor:"#bfdcae",
                            marginTop: "20px",
                            width:"245px",
                            border:"1px solid #81b214",
                            color:"#206a5d",
                            outline:"#81b214",
                            fontSize:"20px"
                        }} rows={"4"} cols={"50"} value={description}
                                  onChange={e => setDescription(e.target.value)}  placeholder="  Description"/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker

                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </ThemeProvider>


                            </Grid>
                        </MuiPickersUtilsProvider>
                        <ColorButton style={{marginTop: "20px", display: "block", color: "#81b214"}} type="submit"
                                     variant="contained"
                                     color="primary" onClick={handleOpen}>
                            Create Event
                        </ColorButton>
                    </Grid>

                </div>

            </form>
        </div>
    );

    const bodyMobile = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <div>
                    <Grid
                        container
                        direction="column"

                        justify="center"
                        alignItems="center"

                    >
                        <CssTextField style={{marginTop: "20px", marginLeft:"-10px",display: "block",}}
                                      InputProps={{
                                          className: classes.multilineColor
                                      }}
                                      label=" Title "
                                      variant="outlined"
                                      id="custom-css-outlined-input"
                                      value={title}
                                      onChange={e => setTitle(e.target.value)}
                        />
                        <CssTextField style={{marginTop: "20px",marginLeft:"-10px",display: "block", color: "green"}}
                                      InputProps={{
                                          className: classes.multilineColor
                                      }}
                                      label=" Price "
                                      variant="outlined"
                                      id="custom-css-outlined-input"
                                      value={price}
                                      onChange={e => setPrice(e.target.value)}
                        />
                        <textarea style={{
                            backgroundColor:"#bfdcae",
                            marginTop: "20px",
                            marginLeft:"-10px",
                            width:"240px",
                            border:"1px solid #81b214",
                            color:"#206a5d",
                            outline:"#81b214",
                            fontSize:"20px"
                        }} rows={"4"} cols={"50"} placeholder="Description"/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker

                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </ThemeProvider>


                            </Grid>
                        </MuiPickersUtilsProvider>
                        <ColorButton style={{marginTop: "20px", display: "block", color: "#81b214"}} type="submit"
                                     variant="contained"
                                     color="primary" onClick={handleOpen}>
                            Create Event
                        </ColorButton>
                    </Grid>

                </div>

            </form>
        </div>
    );
    return (
        <div style={{
            margin: "80px auto",
            maxWidth: "300px",
            height: "400px",
            border: "1px solid #81b214",
            borderRadius: "20px"

        }}>
            <Grid
                container

                justify="center"
                alignItems="center"
                style={{
                    marginTop: "150px",
                    display: "flex"

                }}
            >
                <ColorButton type="submit" variant="contained"
                             color="primary" onClick={handleOpen}>
                    Create Event
                </ColorButton>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"

            >
                {matches?body:bodyMobile}
            </Modal>
        </div>
    );


}

export default EventsPage;