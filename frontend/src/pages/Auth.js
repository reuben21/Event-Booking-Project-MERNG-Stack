import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
import AuthContext from '../context/auth-context'
// import Spinner from "../components/Spinner/Spinner";

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#81b214',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#81b214',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#81b214',
            },
            '&:hover fieldset': {
                borderColor: '#81b214',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#81b214',
            },
        },
    },
})(TextField);

const ColorButton = withStyles((theme) => ({
    root: {
        color:  '#81b214',
        backgroundColor: "#206a5d",
        '&:hover': {
            backgroundColor: "#206a5d",
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),

        }
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
    },
    margin: {
        margin: theme.spacing(5),
    },
    multilineColor:{
        color:'#206a5d',
        fontSize:"20px"
    }
}));

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passworldEl = React.createRef();
    }

    state = {
        isLogin: false
    };

    static contextType = AuthContext;

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passworldEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }
        let requestBody = {
            query: `
            query CreateUser($email:String!,$password:String!){
                login(email:$email,password:$password){
                userId
                token
                tokenExpiration
                }
            }
            `,
            variables:{
                email:email,
                password:password
            }
        };
        if (this.state.isLogin) {
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
            if (resData.data.login.token) {
                this.context.login(
                    resData.data.login.token
                    , resData.data.login.userId
                    , resData.data.login.tokenExpiration)
            }
        }).catch(err => {
            console.log(err);
        })
    }
    switchModeHandler = () => {
        this.setState(prevState => {
                return {isLogin: !prevState.isLogin}
            }
        )
    }

    render() {
        const {classes} = this.props;

        return (

            <div className={classes.header}>
                <Typography component="div"
                            style={{backgroundColor: '#bfdcae', padding: "50px", margin: "20px", borderRadius: "10px"}}>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"

                    >
                        <form noValidate autoComplete="off" onSubmit={this.submitHandler}>
                            <CssTextField style={{marginTop: "10px", display: "block", color: "green"}}
                                          className={classes.margin}
                                          InputProps={{
                                              className: classes.multilineColor
                                          }}
                                          label="Email-ID"
                                          variant="outlined"

                                          inputRef={this.emailEl}
                            />

                            <CssTextField style={{marginTop: "10px", display: "block", color: "green"}}
                                          className={classes.margin}
                                          InputProps={{
                                              className: classes.multilineColor
                                          }}
                                          label="Password"
                                          type="password"
                                          variant="outlined"

                                          inputRef={this.passworldEl}
                            />

                            <div className={classes.buttonGroup}>


                                <ColorButton type="submit" style={{ display:"block",marginTop:"20px"}} variant="contained" color="primary" className={classes.margin}>
                                    Sign {this.state.isLogin ? 'Up!' : 'In!'}
                                </ColorButton>

                                <ColorButton style={{marginTop:"20px"}} variant="contained" color="primary" className={classes.margin} onClick={this.switchModeHandler}>
                                    Switch
                                    to {this.state.isLogin ? 'Login ' : 'Sign Up'}
                                </ColorButton>

                            </div>
                        </form>

                    </Grid>


                </Typography>
            </div>

        );

    }
}

export default withStyles(useStyles, CssTextField)(AuthPage);