import React, { useEffect } from "react";
import './Landing.css';
import HomeHowItWorks from '../HomeHowItWorks/HomeHowItWorks';
import HomeSeeItInAction from '../HomeSeeItInAction/HomeSeeItInAction';
import HomeRealResults from '../HomeRealResults/HomeRealResults';
import HomeWhatsYourSport from '../HomeWhatsYourSport/HomeWhatsYourSport';
import BottomNav from '../BottomNav/BottomNav';
import GreenBorderBoxWithForm from "../GreenBorderBoxWithForm/GreenBorderBoxWithForm";



const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <GreenBorderBoxWithForm header="Find a top-level private coach and take your game to the next level." readyToTrain="Ready To Train?" buttonText="Find Your Coach" />
      <HomeHowItWorks/>
      <HomeSeeItInAction />
      <HomeRealResults/>
      <HomeWhatsYourSport/>
      <BottomNav/>
    </div>
  );
};

export default Landing;