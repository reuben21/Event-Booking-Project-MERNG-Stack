import React, {Component} from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import EventItemCSS from './EventItem.module.css'
// import Grid from "@material-ui/core/Grid";
import AuthContext from "../../../../context/auth-context";
const ColorButton = withStyles((theme) => ({
    root: {
        color: '#81b214',
        backgroundColor: "#206a5d",
        '&:hover': {
            backgroundColor: "#206a5d",
        },
    },
}))(Button);


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


class eventItem extends Component {

    state = {
        open: false,

           }
    static contextType = AuthContext;
    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };
    getModalStyle = () => {

        return {
            margin: "100px auto",
            padding: "100px",
            width: "70%",
            height: "400px",
            backgroundColor: "#bfdcae",
            outlineColor: "#206a5d",
            borderColor: "#206a5d",
        };
    }
    render() {

        const {classes} = this.props;
        return (
            <>
                <Card key={this.props.eventid} style={{
                    margin: "20px auto",
                    backgroundColor: "#bfdcae",
                    width: "90%",
                    borderRadius: "20px",
                    alignContent: "center",
                    border: "1px solid #206a5d",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <CardContent style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>

                        <Typography style={{
                            color: "#206a5d",
                            fontSize:"30px",
                            marginBottom: "10px"
                        }} variant="h4" component="h2">
                            <div className={EventItemCSS.fontClassCursive}>
                                {this.props.title}
                            </div>


                            <br/>
                            <Typography style={{
                                color: "#206a5d",
                                display:"block !important",

                            }} component="p">
                                <div className={EventItemCSS.fontClassOpenSans}>
                            Price: ${this.props.price} - {new Date(this.props.date).toLocaleDateString()}
                                </div>
                        </Typography>



                        </Typography>
                    </CardContent>
                    <CardContent>
                        {this.props.userId === this.props.creatorId ?<p>Your the owner of this Event</p>: <ColorButton style={{color: "#81b214",width: "80px",
                            borderRadius:"10px",
                            justifyContent:'justify-center'
                            }}
                                     type="submit"
                                     variant="contained"
                                     color="primary" onClick={this.handleOpen}>
                            <div className={EventItemCSS.fontClassSans}>
                                View Details
                            </div>

                        </ColorButton>
                        }
                    </CardContent>

                </Card>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"

                >
                    <div className={`${classes.paper} ${EventItemCSS.modalStyle}`}>
                        <Typography style ={{
                            color: "#81b214",
                            fontSize:"30px",
                            backgroundColor:"#206a5d",
                            borderRadius:"10px",
                            textAlign:"center",
                            padding:"5px"
                        }}  component="p">
                            <div className={EventItemCSS.fontClassCursive}>
                                {this.props.title}
                            </div>

                        </Typography>
                        <Typography style={{
                            color: "#206a5d",
                            display:"block !important",
                            margin: "20px auto",

                        }} component="p">
                            <div style={{
                                fontSize:"20px",
                            }} className={EventItemCSS.fontClassSans}>
                                Price: ${this.props.price} - {new Date(this.props.date).toLocaleDateString()}
                            </div>
                        </Typography>
                        <Typography style ={{
                            color: "#81b214",
                            fontSize:"20px",
                            margin: "20px auto",
                            display: "block",
                        }}  component="p">
                             <div className={EventItemCSS.fontClassOpenSans}>
                            {this.props.description}
                             </div>
                        </Typography>
                        {/*{this.context.token && (*/}
                            <ColorButton
                            style={{margin: "20px auto",
                                display: "block",
                                color: "#81b214",
                                width:"100px",

                                }}
                            type="submit"
                            variant="contained"
                            color="primary" >
                           Book Event
                        </ColorButton>
                        {/*// )}*/}
                        {/*{!this.context.token && (<div style={{margin: "20px auto",*/}
                        {/*    display: "block",*/}
                        {/*    color: "#81b214",*/}
                        {/*    width:"100px",*/}

                        {/*}}>*/}
                        {/*    To Book This Event Please Login*/}
                        {/*</div>)}*/}
                    </div>
                </Modal>
            </>
        );
    }



};

export default withStyles(useStyles)(eventItem);