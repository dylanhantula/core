import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import blank from './blank.png';
import './OurDifferenceTimeline.css';



const OurDifferenceTimeline = () => {


    const timelineItemHeaderStyle = {paddingTop: '70px', paddingBottom: '20px', fontSize: 'large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'};
    const timelineItemCaptionStyle = {padding: '0px 150px', fontSize: 'medium', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'};

    return (
        <React.Fragment>
        <Timeline align="alternate">
            <TimelineItem>
            <TimelineOppositeContent>
            <ul className="TimeLineItems">    
                    <li><div style={timelineItemHeaderStyle}>Video Feedback & Homework</div></li>
                    <li><div style={timelineItemCaptionStyle}>Record snippets of training sessions and track your athletic growth through our platform. From home, coaches can relay feedback on the videos so the athlete knows the aspects of their game that need improvement.</div></li>
                </ul>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot/>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
            <img src={blank} alt="blank_picture" style={{width: '600px', margin: '0px 140px'}}/>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent>
            <ul className="TimeLineItems">    
                    <li><div style={timelineItemHeaderStyle}>Scheduling</div></li>
                    <li><div style={timelineItemCaptionStyle}>Integrate personal calendars with our platform to manage your training schedule. Athletes and parents will be able to see when their coach is available for training.</div></li>
                </ul>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
            <img src={blank} alt="blank_picture" style={{width: '600px', margin: '0px 140px'}}/>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent>
            <ul className="TimeLineItems">    
                    <li><div style={timelineItemHeaderStyle}>Communication</div></li>
                    <li><div style={timelineItemCaptionStyle}>Inquire about working with a coach through our messaging system. Once your first training session is booked, rely on us for all future communication.</div></li>
                </ul>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
            <img src={blank} alt="blank_picture" style={{width: '600px', margin: '0px 140px'}}/>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent>
            <ul className="TimeLineItems">    
                    <li><div style={timelineItemHeaderStyle}>Booking</div></li>
                    <li><div style={timelineItemCaptionStyle}>Lock-in your training sessions and send/receive compensation through our secure payment system.</div></li>
                </ul>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
            <img src={blank} alt="blank_picture" style={{width: '600px', margin: '0px 140px'}}/>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent>
            <ul className="TimeLineItems">    
                    <li><div style={timelineItemHeaderStyle}>Insurance</div></li>
                    <li><div style={timelineItemCaptionStyle}>Trust that our qualified private coaches are fully insured, certified, and able to train when you are ready!</div></li>
                </ul>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
            <img src={blank} alt="blank_picture" style={{width: '600px', margin: '0px 140px'}}/>
            </TimelineContent>
            </TimelineItem>
        </Timeline>
        </React.Fragment>
    );
}
export default OurDifferenceTimeline;