import React, { useEffect } from "react";
import GreenBorderBoxWithForm from '../GreenBorderBoxWithForm/GreenBorderBoxWithForm';
import WhyThreeBoxPanel from "../WhyThreeBoxPanel/WhyThreeBoxPanel";
import ThreeReasons from "../ThreeReasons/ThreeReasons";
import OnlyPlatform from "../OnlyPlatform/OnlyPlatform";
import BottomNav from "../BottomNav/BottomNav";

const AthletesAndParents = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
      <OnlyPlatform 
        title="The Only Platform You Need"
        reasonList={["Connect with a Private Coach", "Communicate Your Goals", "Book Training Sessions", "Sync Your Personal Calendar", "Track Your Athletic Growth"]}
        reasonParagraph1="We know it can be difficult to find the right private sports coach - not to mention the inconvenience of scheduling, booking, and managing a training schedule. This is exactly why Athletes Untapped was formed."
        reasonParagraph2="Athletes Untapped makes it easy to find a qualified, private sports coach in your area. Once you connect with your AU coach, use our platform to manage your entire training schedule in one place."
        history
      />
      <BottomNav/>
    </div>
  );
};

export default AthletesAndParents;