import React from 'react';
import './marquee.css';

const MarqueeText = () => {
    const text = "LET'S CONNECT • ";
    const repeatCount = 20; // Number of times to repeat the text

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {[...Array(repeatCount)].map((_, index) => (
                    <span key={index} className="marquee-text">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeText;
