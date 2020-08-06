import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent, getPaymentMethods } from '../../api/api';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AuthContext } from "../App/App";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
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

const CheckoutForm = props => {
    const {user} = useContext(AuthContext);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [listOfPaymentMethods, setListOfPaymentMethods] = useState([]);
    const [showListOfCards, setShowListOfCards] = useState(false);
    const [existingCardCheckout, setExistingCardCheckout] = useState(null);
    const [nameOnCard, setNameOnCard] = useState("");
    const [showAddCard, setShowAddCard] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const data = {
            'athlete': user.firebaseUser.uid,
            'coach': props.coach.firebaseID,
            'total': props.total,
            'sessions': props.sessions,            
        };
        user.firebaseUser.getIdToken()
        .then(function(idToken) {
            createPaymentIntent(idToken, data)
            .then(response => {
                console.log(response)
                setClientSecret(response['clientSecret']);
            })
            .catch(e => console.log(e));
        });
        
    }, [user.firebaseUser, props.coach.firebaseID, props.total, props.sessions]);

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

    const cardStyle = {
        style: {
            base: {
            color: "#32325d",
            
            fontFamily: 'Arial, sans-serif',
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


    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: existingCardCheckout ?  existingCardCheckout['id'] : {
                card: elements.getElement(CardElement),
                billing_details: {
                'name': nameOnCard
                }
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <div>
        <div className="CoachCalenderGeneralAvailability" style={{paddingTop: '0rem'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{marginRight: '0.5rem'}}>Use with a Saved Payment Method</p>
                {showListOfCards ? <ExpandLessIcon className="CalendarShowAvailabilityButton" onClick={e => {
                    setShowListOfCards(false);
                    if (!processing) {
                        setExistingCardCheckout(null);
                    }
                    }}/>:
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
                                <p onClick={(e) => {setShowListOfCards(false); setExistingCardCheckout(method); }}>Use this Card</p>
                            </div>
                            </Paper>
                        );
                    })}
                </div>
            </div>:null}
            {existingCardCheckout ? 
            <div style={{display: 'flex', 'justifyContent': 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <Paper variant="outlined" square style={{margin: '1rem 0rem'}}>
                <div className="AthletePaymentSettingsCurrentCardsList">
                    <p>{existingCardCheckout['card']['brand'].slice(0, 1).toUpperCase() + existingCardCheckout['card']['brand'].slice(1)} {" ************"}{existingCardCheckout['card']['last4']}</p>
                    <p>{existingCardCheckout['billing_details']['name']}</p>
                    <p>Expires {existingCardCheckout['card']['exp_month'] >= 10 ? existingCardCheckout['card']['exp_month'].toString(): '0'+existingCardCheckout['card']['exp_month']}
                    /{existingCardCheckout['card']['exp_year'].toString().slice(2)}</p>
                    <button
                    style={{margin: '1.5rem 0rem'}}
                        className="AthletePaymentSettingsAddCard"
                        onClick={e => handleSubmit(e)}
                            disabled={processing || succeeded}
                            >
                            {processing ? 
                        <ThemeProvider theme={materialTheme}>
                            <CircularProgress size={20}/>
                        </ThemeProvider>:"Pay"}
                    </button>
                </div>
                </Paper>
                </div>
            </div>:null}
            
            <div className="CoachCalenderGeneralAvailability">
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{marginRight: '0.5rem'}}>Pay with a New Card</p>
                {showAddCard ? <ExpandLessIcon className="CalendarShowAvailabilityButton" onClick={e => {setShowAddCard(false);}}/>:
                    <ExpandMoreIcon className="CalendarShowAvailabilityButton" onClick={e => setShowAddCard(true)}/>}
                </div>
            </div>
           
            
            <Snackbar open={succeeded} autoHideDuration={3000} onClose={e => setSucceeded(false)}>
                <Alert onClose={e => setSucceeded(false)} severity="success">
                    Payment Successful!
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
            </ThemeProvider>:"Pay"}
            </button>
                        
        </form>:null}
        </div>
        </div>
        </div>
    );
}

export default CheckoutForm;