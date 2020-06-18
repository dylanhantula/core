import React from "react";
import GreenBorderBoxWithForm from '../GreenBorderBoxWithForm/GreenBorderBoxWithForm';
import WhyThreeBoxPanel from "../WhyThreeBoxPanel/WhyThreeBoxPanel";
import ThreeReasons from "../ThreeReasons/ThreeReasons";

const DedicatedCoaches = () => {
  return (
    <div>
      <GreenBorderBoxWithForm header="Join Our Community of Private Coaches." readyToTrain="Ready To Coach?" buttonText="Become an AU Coach" />
      <WhyThreeBoxPanel 
        title="Why Become an AU Coach?"
        page="DedicatedCoaches" 
        box1={{header: 'Make Great Money', caption: 'Whether you are doing this full-time or on the side, earn as much as you want by coaching as much as you want.'}}
        box2= {{header: 'Control Your Schedule', caption: 'Only coach when it works for you. After your day job, on the weekends, or 24/7 365 - you are in charge.'}}
        box3={{header: 'Get Back in the Game', caption: 'Make an impact by developing the next generation of athletes. After all, would you be where you are today without the help of some great coaches?'}}
      />
      <ThreeReasons 
        title="The Benefits are Life-Changing."
        box1={{header: 'Building a Business', caption: 'Private sports training is an incredibly rewarding and fun way to earn a living. The AU platform provides private coaches with the necessary resources to build or expand their own training business.'}}
        box2={{header: 'Staying Involved', caption: 'Athletes dedicate so much time to their sport but nobody\'s playing days last forever. AU coaches are able to stay involved with the game they love while also earning additional income.'}}
        box3={{header: 'Going Beyond Sports', caption: 'Every athlete knows the lifelong impact that sports can make on a young person\'s life. AU coaches mentor young athletes by helping them build confidence on and off the court.'}}
      />
    </div>
  );
};

export default DedicatedCoaches;