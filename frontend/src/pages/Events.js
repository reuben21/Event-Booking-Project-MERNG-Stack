import React, {Component} from "react";
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
//code updated
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import useMediaQuery from "@material-ui/core/useMediaQuery";
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
    },
    modalStyle:{
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        width: "70%",
        height: "400px",
        backgroundColor: "#bfdcae",
        outlineColor:"#206a5d",
        borderColor:"#206a5d",
    }
}));

class EventsPage extends Component {

    constructor(props) {
        super(props);
        this.title = React.createRef();
        this.price = React.createRef();
        this.description = React.createRef();
    }
    state={
        open:false,
        selectedDate:new Date()

    }

    static contextType = AuthContext;
    //
    handleDateChange = (date) => {
       this.setState({selectedDate:date})
    };

    // const {classes} = this.props;


    handleOpen = () => {
        this.setState({open:true})
    };

   handleClose = () => {
       this.setState({open:false})
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const title = this.title.current.value;
        const price = this.price.current.value;
        const description = this.description.current.value;
        const selectedDate = this.state.selectedDate.toISOString()
        //
        // alert(`Submitting Name ${title},
        //     Submitting Price ${price}
        //     Description Price ${description}
        //     Date is ${selectedDate.toISOString()}`)
        const requestBody = {
            query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${selectedDate}"}) {
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
        console.log(requestBody)

        const token = this.context.token;
        console.log("The Token is:- ",token)

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        }).then(resData => {
            console.log(resData)
        }).catch(err => {
            console.log(err);
        })

    }

   getModalStyle=()=> {

        return {
            margin:"100px auto",
            padding:"100px",
            width: "70%",
            height: "400px",
            backgroundColor: "#bfdcae",
            outlineColor:"#206a5d",
            borderColor:"#206a5d",

        };
    }
    getModalStyleMobile=()=> {
       return {
           margin:"60px auto",

        padding: "25px",
           width: "280px",
           height: "400px",
            backgroundColor: "#bfdcae",
            outlineColor:"#206a5d",
            borderColor:"#206a5d",

        };
    }
    render(){
        const {
            selectedDate
        } = this.state;
        const matches = window.innerWidth < 800;
        console.log(matches)
        const {classes} = this.props;
        return (
            <>
            {this.context.token && (
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
                                     color="primary" onClick={this.handleOpen}>
                            Create Event
                        </ColorButton>
                    </Grid>


                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"

                >
                    {!matches ? <div style={this.getModalStyle()} className={classes.paper}>
                            <form onSubmit={this.handleSubmit}>
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
                                                      inputRef={this.title}

                                        />
                                        <CssTextField style={{marginTop: "20px", display: "block", color: "green"}}
                                                      InputProps={{
                                                          className: classes.multilineColor
                                                      }}
                                                      label=" Price "
                                                      variant="outlined"
                                                      id="custom-css-outlined-input"
                                                      inputRef={this.price}
                                        />
                                        <textarea style={{
                                            backgroundColor:"#bfdcae",
                                            marginTop: "20px",
                                            width:"262px",
                                            border:"1px solid #81b214",
                                            color:"black",
                                            outline:"#81b214",
                                            fontSize:"20px"
                                        }} rows={"4"} cols={"50"} ref={this.description}  placeholder="  Description"/>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <KeyboardDatePicker

                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Date picker dialog"
                                                        format="MM/dd/yyyy"
                                                        value={selectedDate}
                                                        onChange={this.handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </ThemeProvider>


                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                        <ColorButton style={{marginTop: "20px", display: "block", color: "#81b214"}} type="submit"
                                                     variant="contained"
                                                     color="primary" onClick={this.handleOpen}>
                                            Create Event
                                        </ColorButton>
                                    </Grid>

                                </div>

                            </form>
                        </div>

                    :  <div style={this.getModalStyleMobile()} className={classes.paper}>
                            <form onSubmit={this.handleSubmit}>
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
                                                      inputRef={this.title}
                                        />
                                        <CssTextField style={{marginTop: "20px",marginLeft:"-10px",display: "block", color: "green"}}
                                                      InputProps={{
                                                          className: classes.multilineColor
                                                      }}
                                                      label=" Price "
                                                      variant="outlined"
                                                      id="custom-css-outlined-input"
                                                      inputRef={this.price}
                                        />
                                        <textarea style={{
                                            backgroundColor:"#bfdcae",
                                            marginTop: "20px",
                                            marginLeft:"-10px",
                                            width:"260px",
                                            border:"1px solid #81b214",
                                            color:"black",
                                            outline:"#81b214",
                                            fontSize:"20px"
                                        }} rows={"4"} cols={"50"} ref={this.description} placeholder="Description"/>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <KeyboardDatePicker

                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Date picker dialog"
                                                        format="MM/dd/yyyy"
                                                        value={selectedDate}
                                                        onChange={this.handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </ThemeProvider>


                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                        <ColorButton style={{marginTop: "20px", display: "block", color: "#81b214"}} type="submit"
                                                     variant="contained"
                                                     color="primary" onClick={this.handleOpen}>
                                            Create Event
                                        </ColorButton>
                                    </Grid>

                                </div>

                            </form>
                        </div>}
                </Modal>
            </div>  )}
            </>
        );
    }




}

export default withStyles(useStyles)(EventsPage);