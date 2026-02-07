import React from 'react';
import SplitText from '../SplitText/SplitText';

const LayoutTextFlipDemo = () => {
    return (
        <section className="w-full min-h-screen bg-white px-8 md:px-16 lg:px-24 py-20 mt-[-150px] flex flex-col items-center justify-center">
            {/* Main Brand Title */}
            <div className="mb-16 text-center">
                <SplitText
                    text="PALSD"
                    tag="h1"
                    className="text-[10rem] md:text-[18rem] lg:text-[24rem] xl:text-[28rem] font-bold leading-none tracking-tighter text-black"
                    splitType="chars"
                    delay={50}
                    duration={2.25}
                    threshold={0.1}
                    textAlign="center"
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 w-[80%]">
                {/* Left Column - Tagline */}
                <div className="flex flex-col justify-start">
                    <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-black">
                        Built for the streets.
                        <br />
                        Designed to stand out.
                    </h2>
                </div>

                {/* Right Column - Description */}
                <div className="flex flex-col justify-start">
                    <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-black">
                        Urbanova is a streetwear brand fusing urban culture with bold aesthetics. 
                        Every piece is made to express individuality, confidence, and the creative grind.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LayoutTextFlipDemo;
