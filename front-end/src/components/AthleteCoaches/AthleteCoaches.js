import React from 'react';
import GreenBorderBoxWithForm from '../GreenBorderBoxWithForm/GreenBorderBoxWithForm';

const AthleteCoaches = (props) => {
    return (
        <GreenBorderBoxWithForm {...props} header="Start Training with an AU Coach." readyToTrain="Ready To Train?" buttonText="Find Your Coach"/>
    );
}

export default AthleteCoaches;