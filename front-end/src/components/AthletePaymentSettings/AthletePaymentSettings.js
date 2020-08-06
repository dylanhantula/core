import React, { useState, useContext, useEffect } from 'react';
import AULogo from '../CoachAccount/Athletes-Untapped-Logo-Rectangle.png';
import {  createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AuthContext } from "../App/App";
import {  getPaymentMethods, createPaymentMethod } from '../../api/api';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './AthletePaymentSettings.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper } from '@material-ui/core';



function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const materialTheme = createMuiTheme({
    palette: {
      primary: {
          main: '#ffffff'
      }
    }
});

const AthletePaymentSettings = (props) => {
    const {user} = useContext(AuthContext);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);
    const [showListOfCards, setShowListOfCards] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [listOfPaymentMethods, setListOfPaymentMethods] = useState([]);
    const stripe = useStripe();
    const [nameOnCard, setNameOnCard] = useState("");
    const elements = useElements();

    useEffect(() => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            getPaymentMethods(idToken, user.firebaseUser.uid)
            .then(response => {
                setListOfPaymentMethods(response['paymentMethods']);
            })
            .catch(e => console.log(e));
        });
    }, [user.firebaseUser]);

    useEffect(() => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            createPaymentMethod(idToken, {'id': user.firebaseUser.uid})
            .then(response => {
                setClientSecret(response['clientSecret']);
            })
            .catch(e => console.log(e));
        });
    }, [user.firebaseUser]);

    const getAllCards = () => {
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            getPaymentMethods(idToken, user.firebaseUser.uid)
            .then(response => {
                setListOfPaymentMethods(response['paymentMethods']);
            })
            .catch(e => console.log(e));
        });
    }

    const cardStyle = {
        style: {
            base: {
            color: "#32325d",
            
            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#32325d"
            }
            },
            invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
            }
        }
    };

   

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        setProcessing(true);
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        const result = await stripe.confirmCardSetup(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                'name': nameOnCard
            },
          }
        });
    
        if (result.error) {
          console.log("error")
          setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            setNameOnCard("");
            setShowAddCard(false);
            getAllCards();
        }
      };

    

    return (
        <div className="CoachAccountContainer">
            <div className="CoachAccountImageContainer">
                <img src={AULogo} alt="Athletes Untapped"></img>
            </div>
            <div className="CoachAccountTitleContainer">
                <p>Payment Settings</p>
            </div>
            <div className="CoachCalenderGeneralAvailability" style={{paddingTop: '0rem'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{marginRight: '0.5rem'}}>Current Payment Methods</p>
                {showListOfCards ? <ExpandLessIcon className="CalendarShowAvailabilityButton" onClick={e => setShowListOfCards(false)}/>:
                    <ExpandMoreIcon className="CalendarShowAvailabilityButton" onClick={e => setShowListOfCards(true)}/>}
                </div>
            </div>
            {showListOfCards ? 
            <div style={{display: 'flex', 'justifyContent': 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {listOfPaymentMethods.map((method, index) => {
                        return (
                            <Paper variant="outlined" square style={{margin: '1rem 0rem'}}>
                            <div key={method['id']} className="AthletePaymentSettingsCurrentCardsList">
                                <p>{method['card']['brand'].slice(0, 1).toUpperCase() + method['card']['brand'].slice(1)} {" ************"}{method['card']['last4']}</p>
                                <p>{method['billing_details']['name']}</p>
                                <p>Expires {method['card']['exp_month'] >= 10 ? method['card']['exp_month'].toString(): '0'+method['card']['exp_month']}
                                /{method['card']['exp_year'].toString().slice(2)}</p>
                                <p>Delete</p>
                            </div>
                            </Paper>
                        );
                    })}
                </div>
            </div>:null}
            
            <div className="CoachCalenderGeneralAvailability">
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{marginRight: '0.5rem'}}>Add Payment Method</p>
                {showAddCard ? <ExpandLessIcon className="CalendarShowAvailabilityButton" onClick={e => {setShowAddCard(false);}}/>:
                    <ExpandMoreIcon className="CalendarShowAvailabilityButton" onClick={e => setShowAddCard(true)}/>}
                </div>
            </div>
           
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={e => setOpenSnackBar(false)}>
                <Alert onClose={e => setOpenSnackBar(false)} severity="success">
                    Saved Successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={succeeded} autoHideDuration={3000} onClose={e => setSucceeded(false)}>
                <Alert onClose={e => setSucceeded(false)} severity="success">
                    Card Added Successfully!
                </Alert>
            </Snackbar>
            <div style={{display: 'flex', 'justifyContent': 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            {showAddCard ? 
            <div>
                <input 
                    className="AthletePaymentSettingsNameOnCard"
                    type="text" 
                    value={nameOnCard}
                    placeholder={"Name on Card"} 
                    onChange={e =>setNameOnCard(e.target.value)}>
                </input>
            </div>:null}
            {showAddCard ?
            <form id="payment-form" >
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            {/* Show any error that happens when processing the payment */}
            {error && (
                <MuiAlert severity="error" className="CardEntryError">
                {error}
                </MuiAlert>
            )}
            
            
            <button
            className="AthletePaymentSettingsAddCard"
            onClick={e => handleSubmit(e)}
                disabled={processing || disabled || succeeded}
                >
                {processing ? 
            <ThemeProvider theme={materialTheme}>
                <CircularProgress size={20}/>
            </ThemeProvider>:"Add Card"}
            </button>
                        
        </form>:null}
        </div>
        </div>
        <div className="CoachAccountButtonContainer">
                <p onClick={e => props.setShowPaymentSettings(false)}>Go to General Settings</p>
            </div>
        </div>
    );
}

export default AthletePaymentSettings;