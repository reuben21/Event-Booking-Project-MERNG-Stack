import React from "react";
import classes from './Spinner.module.css'
const Spinner = ()=>{
    return (
        <div className={classes.spinwrapper}>
            <div className={classes.spinner}>
            </div>
        </div>
    );
}

export default Spinner;