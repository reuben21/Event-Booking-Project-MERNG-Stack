import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
        color: '#81b214',
        backgroundColor: "#206a5d",
        '&:hover': {
            backgroundColor: "#206a5d",
        },
    },
}))(Button);

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        width:"200px",
        height:"400px"
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
}));

const EventsPage = () => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [title,setTitle] = React.useState('')
    // const {classes} = this.props;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${name}`)
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <div>
                    <CssTextField style={{marginTop: "10px", display: "block", color: "green"}}
                                  className={classes.margin}
                                  label="Email-ID"
                                  variant="outlined"
                                  id="custom-css-outlined-input"
                                  onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <ColorButton type="submit" variant="contained"
                             color="primary" onClick={handleOpen}>
                    Create Event
                </ColorButton>
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
                {body}
            </Modal>
        </div>
    );


}

export default EventsPage;