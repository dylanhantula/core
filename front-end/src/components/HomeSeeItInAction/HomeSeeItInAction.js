import React from 'react';
import './HomeSeeItInAction.css'
import ReactPlayer from 'react-player';

const HomeSeeItInAction = () => {
    return (
        <div>
            <div className="SeeItInAction">
                <p style={{color: 'darkgreen', fontSize: 'x-large', fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'}}>
                    See It In Action
                </p>
            </div>
            
            <div className="SeeItInActionVideo">

                <ReactPlayer controls='true' style={{display: 'inline-block'}} url='https://www.youtube.com/watch?v=9h0T2jzvMVk' />
            </div>
            
        </div>
    );
}

export default HomeSeeItInAction;