import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),

        },
    },
    header: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "10vh",
        textAlign: "center",
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passworldEl = React.createRef();
    }

    state = {
        isLogin: true
    };

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passworldEl.current.value;
        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }
        let requestBody = {
            query: `
            query{
                login(email:"${email}",password:"${password}"){
                userId
                token
                tokenExpiration
                }
            }
            `
        };
        if(this.state.isLogin){
           requestBody = {
                query: `
            mutation {
            createUser(userInput:{ email:"${email}",password:"${password}"}){
                _id
                email
                }
            }
            `
            };
        }

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
            console.log(resData);
        })
            .catch(err => {
                console.log(err);
            })
    }
    switchModeHandler = () => {
  this.setState(prevState=>{
      return {isLogin:!prevState.isLogin}
      }

  )
    }

 render() {
     const { classes } = this.props;

    return (

        <div className={classes.header}>
            <Typography component="div"
                        style={{backgroundColor: '#cfe8fc', padding: "50px", margin: "20px", borderRadius: "10px",minWidth:"350px"}}>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"

                    >
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={this.submitHandler}>

                        <TextField style={{marginTop:"10px",display:"block"}} id="outlined-basic" label="Email-ID" variant="outlined" inputRef={this.emailEl}/>

                        <TextField style={{marginTop:"20px",display:"block"}}
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                                   variant="outlined"
                                   inputRef={this.passworldEl}
                        />

                        <div className={classes.buttonGroup}>


                        <ButtonGroup  style={{marginTop:"30px"}} color="primary" aria-label="outlined secondary button group">
                            <Button type="submit">Sign {this.state.isLogin ? 'Up!' : 'In!' }</Button>
                            <Button onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Login ' : 'Sign Up' }</Button>

                        </ButtonGroup>
                        </div>
                        </form>

                </Grid>


        </Typography>


</div>

);

    }
}

export default withStyles(useStyles)(AuthPage);