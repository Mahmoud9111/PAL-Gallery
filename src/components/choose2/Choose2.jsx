import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const Choose2 = () => {

    const isMobD = useMediaQuery({
        query: "(max-width:768px)",
    });
    
    // Hardcoded title lines
    const chooseLinesLG = [
        "Discover the",
        "desert activities"
    ];
    
    const chooseLinesSM = [
        "Discover the",
        "desert activities"
    ];
    
    const chooseLines = isMobD ? chooseLinesSM : chooseLinesLG;

    useGSAP(() => {

        const lines = gsap.utils.toArray(".choose2-title-clip");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".choose2-section",
                start: "top 75%",
                end: "bottom 100%",
                scrub: true,
                // markers: true,
            },
        });

        tl.from(".choose2-subtitle", {
            yPercent: 100,
            opacity: 0,
            ease: "power1.inOut"
        });

        // Animate the div height
        if (!isMobD) {
            tl.fromTo(
                ".title2-part",
                { height: "10vh" },
                { height: `${isMobD ? "22vh" : "50vh"}`, ease: "none" }
            );
        }

        // Animate text reveal — run *at the same time*
        tl.to(
            lines,
            {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.2,
                duration: 1,
            },
            "<" // 👈 runs at the same time as the previous animation
        );

    });

    return (
        <section className="choose2-section w-full h-dvh p-8 pt-10 bg-white">
            <p className='text-[1.4rem] lg:text-[1.6rem] text-[#eae5dd] choose2-subtitle'>Discover Available Capsule<span>®</span></p>
            <div className="lg:mt-10 mt-7 title2-part origin-bottom ">
                {
                    chooseLines.map((line, index) => (
                        <h1 key={index} className={`choose2-heading text-[#f4efe7] lg:text-[16rem] text-[5rem] leading-[0.9]`} font-medium tracking-tighter choose2-title>
                            <span className={`choose-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>{line}<span className={`choose2-title-clip ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>{line}</span></span>
                        </h1>
                    ))
                }
            </div>
        </section>
    );
};

export default Choose2;

