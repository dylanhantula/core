import React from "react";
import GreenBorderBoxWithForm from '../GreenBorderBoxWithForm/GreenBorderBoxWithForm';
import WhyThreeBoxPanel from "../WhyThreeBoxPanel/WhyThreeBoxPanel";
import ThreeReasons from "../ThreeReasons/ThreeReasons";

const AthletesAndParents = () => {
  return (
    <div>
      <GreenBorderBoxWithForm header="Start Training with an AU Coach." readyToTrain="Ready To Train?" buttonText="Find Your Coach"/>
      <WhyThreeBoxPanel 
        title="Why Work with an AU Coach?"
        page="AthletesandParents" 
        box1={{header: 'Convenience', caption: 'Determine how far you are willing to travel for private training lessons.'}}
        box2= {{header: 'Experience', caption: 'AU coaches excelled in their own athletic careers and are eager to work with the next generation.'}}
        box3={{header: 'Results', caption: 'Relay specific goals to your AU Coach and they will work with you to raise the bar.'}}
        />
      <ThreeReasons
        title="There is an AU Coach for Every Athlete."
        box1={{header: 'Earning a Scholarship', caption: 'Some athletes need a private coach who can show them what it takes to become a scholarship player. AU coaches have played at the highest levels and want to help rising athletes follow in their footsteps.'}}
        box2={{header: 'Making the Team', caption: 'Some athletes need a private coach who will turn their dream of making the team into a reality. AU coaches will make sure each athlete is ready for next season by tailoring a training plan to their specific needs.'}}
        box3={{header: 'Learning the Fundamentals', caption: 'Some athletes need a private coach to teach them the basics. AU coaches want to work with the next generation of athletes by instilling a baseline skill level and love for the game.'}}
        />
    </div>
  );
};

export default AthletesAndParents;