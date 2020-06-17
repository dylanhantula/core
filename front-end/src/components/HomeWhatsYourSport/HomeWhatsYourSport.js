import React from 'react';
import './HomeWhatsYourSport.css'
import { Link } from 'react-router-dom'

const HomeWhatsYourSport = () => {
    return (
        <div>
            <div className="WhatsYourSport">
                <p style={{color: 'darkgreen', 
                        fontWeight: 'bold', 
                        fontSize: 'x-large', 
                        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
                        }}> What's Your Sport?
                </p>
            </div>
            <div style={{textAlign: 'center'}}>
                <Link style={{display:'inline-block', 
                            paddingRight: '100px', 
                            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
                            }}> Basketball
                </Link>
                <Link style={{display:'inline-block', 
                            paddingLeft: '100px', 
                            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
                            }}>Soccer
                </Link>
            </div>
            <div className="ComingSoon">
                <p style={{color: 'black', 
                        fontSize: 'large', 
                        fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
                        }}> Coming Soon
                </p>              
            </div>
            <div style={{textAlign: 'center'}}>
                <p style={{display:'inline-block', 
                            paddingRight: '100px', 
                            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
                            }}> Baseball
                </p>
                <p style={{display:'inline-block', 
                            paddingLeft: '100px', 
                            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
                            }}>Lacrosse
                </p>
            </div>
        </div>
    );
}

export default HomeWhatsYourSport;