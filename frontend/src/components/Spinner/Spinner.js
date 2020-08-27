import React from "react";
import classes from './Spinner.module.css'
const Spinner = ()=>{
    return (
        <div component="span" className={classes.spinwrapper}>
            <div component="span" className={classes.spinner}>
            </div>
        </div>
    );
}

export default Spinner;