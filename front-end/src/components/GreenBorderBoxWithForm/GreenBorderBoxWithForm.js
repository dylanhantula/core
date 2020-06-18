import React from 'react';
import Paper from '@material-ui/core/Paper';
import ReadyToTrainForm from '../ReadyToTrainForm/ReadyToTrainForm';

const GreenBorderBoxWithForm = props => {
    return (
        <Paper elevation={10} >
            <ul className="panelList">    
                <li>
                    <div>{props.header}</div>
                </li>
                <li>
                    <ReadyToTrainForm buttonText={props.buttonText} readyToTrain={props.readyToTrain} history/>
                </li>
            </ul>
        </Paper>
    );
}

export default GreenBorderBoxWithForm;