import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from './Athletes-Untapped-Logo-No Background-Square.png'
import { Link } from 'react-router-dom';
import './BottomNav.css'
import { withRouter } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Paper from '@material-ui/core/Paper';



const BottomNav = ({history}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          '& > *': {
            marginLeft: theme.spacing(9),
            marginRight: theme.spacing(9),
            width: theme.spacing(35),
            height: theme.spacing(25)
           },
        },
      }));

      const classes = useStyles();

      const linkHandler = (e, pathPassed) => {
        e.preventDefault();
        history.push({
        pathname: pathPassed,
        });
    };

      return (
          <Paper elevation={10}>
        <div className='footer' style={{textAlign: 'center', backgroundColor: 'navajowhite', marginTop: '0px', marginBottom: '0px', paddingBottom: '0px'}}>
            <div style={{display: 'inline-block'}}>
                <div className={classes.root}>
                    <img src={logo} alt="Athletes Untapped" />
                    <ul className="listOfLinksBottom">
                        <li>
                            <Link className="bottomNavTab" onClick={(e) => linkHandler(e, "/")}>Home</Link>
                        </li>
                        <li>
                            <Link className="bottomNavTab" onClick={(e) => linkHandler(e, "/athletesandparents")}>Athletes & Parents</Link>
                        </li>
                        <li>
                            <Link className="bottomNavTab" onClick={(e) => linkHandler(e, "/dedicatedcoaches")}>Dedicated Coaches</Link>
                        </li>
                        <li>
                            <Link className="bottomNavTab" onClick={(e) => linkHandler(e, "/ourstory")}>Our Difference</Link>
                        </li>
                    </ul>
                    <ul className="listOfLinksBottom">
                        <li>
                            <Link className="bottomNavTab">Contact</Link>
                        </li>
                        <li>
                            <Link className="bottomNavTab" onClick={(e) => linkHandler(e, "/join")}>Become a Coach</Link>
                        </li>
                        <li>
                            <Link className="bottomNavTab">Find Your Coach</Link>
                        </li>
                        <li>
                            <Link className="bottomNavTab">Privacy</Link>
                        </li>
                        <li>
                            <Link className="bottomNavTab">Site Terms</Link>
                        </li>
                    </ul>
                    <div>
                        <div className="SocialMediaLinks">
                            <button className="findUs">Find Us in the App Store</button>
                            <div style= {{paddingTop: '20px'}}>
                                <a href="http://www.facebook.com"><FacebookIcon fontSize='large' /></a>
                                <a href="http://www.twitter.com"><TwitterIcon fontSize='large' style={{margin: '0px 20px'}}/></a>
                                <a href="http://www.instagram.com"><InstagramIcon fontSize='large'/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Paper>
      );
}

export default withRouter(BottomNav);