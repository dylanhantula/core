import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import * as qs from 'query-string';
import {getCoaches} from '../../api/api'

const CoachList = ( props) => {

    const [error, setError] = useState("");
    const [coaches, setCoaches] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [queryParams] = useState(qs.parse(props.location.search))
    

    useEffect(() => {

        // Required so that the useEffect logic does not try to change state if the
        // component is unmounted. See https://juliangaramendy.dev/use-promise-subscription/
        let isSubscribed = true

        getCoaches(queryParams['zip'], queryParams['radius'], queryParams['sport'])
        .then(res => {
            if (isSubscribed) {

                if (res.coaches.length === 0) {
                    setError("No coaches found for the given parameters")
                } else {
                    setCoaches(res.coaches)
                }
                
                setIsLoaded(true);
            }
        })
        .catch(function(error) {
            if (isSubscribed) {
                console.log(error)
                setError(JSON.stringify(error))
                setIsLoaded(true);
            }
        isSubscribed = false
        });
               
        return () => isSubscribed = false
    }, [queryParams]);

    if (!isLoaded) {
        return(<div>Loading...</div>)
    } else {
        return (
            <div>
              <h1>Coaches Near {queryParams['zip']} for {queryParams['sport']}</h1>
              <span>{error}</span>
                <div>
                {coaches.map((item, i) => (
                     <ul key={i}>
                         <li>Name: {item.firstName + ' ' + item.lastName}</li>
                         <li>City: {item.city}</li>
                         <li>State: {item.state}</li>
                         <li>Zip Code: {item.zipCode}</li>
                         <li>Distance: {item.distance} miles</li>
                         <li>Sport: {item.sport}</li>
                         <li>Why are they interested in coaching?: {item.whyCoach}</li>
                         <li>Years of Experience: {item.yearsExp}</li>
                     </ul>
                ))}
                </div>
            </div>
          );
    }
};

export default withRouter(CoachList);