import React, { useEffect }  from "react";
import Paper from '@material-ui/core/Paper';
import './OurStory.css';
import OurDifferenceTimeline from "../OurDifferenceTimeline/OurDifferenceTimeline";
import blank_image from '../OurDifferenceTimeline/blank.png';
import { withRouter } from 'react-router-dom';
import BottomNav from '../BottomNav/BottomNav';


const OurStory = ({history}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const takeToBecomeCoach = (e) => {
    e.preventDefault();
    history.push({
    pathname: '/join',
    });
  };

  return (
    <div>
      <Paper elevation={10} >
        <div className="greenBox">
          <Paper elevation={0} >
            <ul className="greenBoxItems">    
                <li><div style={{paddingTop: '2.5rem', paddingBottom: '2.5rem', fontSize: 'x-large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>Built for Athletes by Athletes.</div></li>
                <li><div style={{textAlign: 'left', padding: '0px 15rem', fontSize: 'medium', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>Being former athletes ourselves, we understand the benefits of working with a private coach. It develops discipline, boosts confidence, and provides an undeniable advantage  - regardless of whether you are looking to receive a college scholarship or just learning the game. Our mission is to give young athletes the opportunity to succeed by connecting them with experienced private coaches.</div></li>
                <li><div style={{textAlign: 'right', padding: '2.5rem 15rem', fontSize: 'medium', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>- Gene Williams, Founder & CEO Athletes Untapped</div></li>
            </ul>
          </Paper>
        </div> 
      </Paper>
      <div className="OnePlace">
                <p style={{fontSize: 'x-large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>Manage Everything In One Place.</p>
      </div>
      <div style={{textAlign: 'center', padding: '0px 25rem 6.25rem'}}>
        <p style={{fontSize: 'medium', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>AU was designed with the needs of coaches and athletes in mind. We combine the power of in-person coaching with dynamic tech so that our community can focus on the most important goal: athletic development.</p>
      </div>
    <OurDifferenceTimeline/>
    <Paper elevation={10} >
        <div className="greenBoxBottom">
            <ul className="greenBoxItems">    
                <li><div style={{paddingTop: '2.5rem', paddingBottom: '2.5rem', fontWeight: 'bold', fontSize: 'x-large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>Ready To Get Started?</div></li>
                <li><div style={{textAlign: 'center', padding: '0px 15rem'}}><img src={blank_image} alt="blank_picture" style={{width: '37.5rem'}}/></div></li>
                <li><div style={{padding: '1.8rem 0px'}}>
                      <nav>
                        <ul className="GreenBoxBottomButtons">
                            <li>
                                <button onClick={(e) => (takeToBecomeCoach(e))}> Become A Coach</button>
                            </li>
                            <li>
                                <button> Find Your Coach</button>
                            </li>
                        </ul>
                      </nav>
                    </div>
                </li>
            </ul>
        </div> 
      </Paper>
      <BottomNav/>
    </div>
  );
};

export default withRouter(OurStory);