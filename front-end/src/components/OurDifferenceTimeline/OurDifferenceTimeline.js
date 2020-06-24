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


    const timelineItemHeaderStyle = {fontSize: 'large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'};
    const timelineItemCaptionStyle = {padding: '0px 2rem', fontSize: 'medium', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'};

    return (
        <React.Fragment>
        <Timeline align="alternate">
            <TimelineItem>
            <TimelineOppositeContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>   
                    <p style={timelineItemHeaderStyle}>Video Feedback & Homework</p>
                    <p style={timelineItemCaptionStyle}>Record snippets of training sessions and track your athletic growth through our platform. From home, coaches can relay feedback on the videos so the athlete knows the aspects of their game that need improvement.</p>
                </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot/>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
                <img src={blank} alt="blank_picture" style={{maxWidth: '100%', height: 'auto', margin: '0px'}}/>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <p style={timelineItemHeaderStyle}>Scheduling</p>
                    <p style={timelineItemCaptionStyle}>Integrate personal calendars with our platform to manage your training schedule. Athletes and parents will be able to see when their coach is available for training.</p>
                </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
                <img src={blank} alt="blank_picture" style={{maxWidth: '100%', height: 'auto', margin: '0px'}}/>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>   
                    <p style={timelineItemHeaderStyle}>Communication</p>
                    <p style={timelineItemCaptionStyle}>Inquire about working with a coach through our messaging system. Once your first training session is booked, rely on us for all future communication.</p>
                </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
                <img src={blank} alt="blank_picture" style={{maxWidth: '100%', height: 'auto', margin: '0px'}}/>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>    
                    <p style={timelineItemHeaderStyle}>Booking</p>
                    <p style={timelineItemCaptionStyle}>Lock-in your training sessions and send/receive compensation through our secure payment system.</p>
                </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
                <img src={blank} alt="blank_picture" style={{maxWidth: '100%', height: 'auto', margin: '0px'}}/>
            </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>    
                    <p style={timelineItemHeaderStyle}>Insurance</p>
                    <p style={timelineItemCaptionStyle}>Trust that our qualified private coaches are fully insured, certified, and able to train when you are ready!</p>
                </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{marginTop: '0px'}}>
                <img src={blank} alt="blank_picture" style={{maxWidth: '100%', height: 'auto', margin: '0px'}}/>
            </TimelineContent>
            </TimelineItem>
        </Timeline>
        </React.Fragment>
    );
}
export default OurDifferenceTimeline;