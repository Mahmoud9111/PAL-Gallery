import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { chooseLinesLG, chooseLinesSM } from "../../data/welcome";

const Choose = ({ project }) => {

    const isMobD = useMediaQuery({
        query: "(max-width:768px)",
    });
    
    // Use project data if provided, otherwise use defaults
    const chooseData = project?.choose || {
        subtitle: "Discover Available Capsule",
        title: isMobD ? chooseLinesSM : chooseLinesLG,
        description: "You can choose one of three premium capsule houses in our offer. Each of our capsules provides the highest quality and meets the standards adjusted to your needs. Choose the one you like.",
        features: ["Sustainable", "Nature—Care", "Smart", "Privacy", "Spacious", "Glassed-in"]
    };
    
    const chooseLines = Array.isArray(chooseData.title) ? chooseData.title : (isMobD ? chooseLinesSM : chooseLinesLG);

    useGSAP(() => {

        const lines = gsap.utils.toArray(".choose-title-clip");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".choose-section",
                start: "top 75%",
                end: "bottom 100%",
                scrub: true,
                // markers: true,
            },
        });

        tl.from(".choose-subtitle", {
            yPercent: 100,
            opacity: 0,
            ease: "power1.inOut"
        });

        // Animate the div height
        if (!isMobD) {
            tl.fromTo(
                ".title-part",
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

        if (!isMobD) {
            tl.from(".choose-sec", {
                yPercent: 100,
                duration: 1,
            }, "<");
        }
    });

    return (
        <section className="choose-section w-full h-dvh p-8 pt-10 bg-[#fbfbfb]">
            <p className='text-[1.4rem] lg:text-[1.6rem] text-[#eae5dd] choose-subtitle'>{chooseData.subtitle}<span>®</span></p>
            <div className="lg:mt-10 mt-7 title-part origin-bottom ">
                {
                    chooseLines.map((line, index) => (
                        <h1 key={index} className={`choose-heading text-[#f4efe7] lg:text-[16rem] text-[5rem] leading-[0.9]`} font-medium tracking-tighter choose-title>
                            <span className={`choose-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>{line}<span className={`choose-title-clip ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>{line}</span></span>
                        </h1>
                    ))
                }
            </div>
            <div className="choose-sec w-full flex lg:flex-row flex-col justify-center items-start gap-10 lg:mt-0">
                <div className='lg:w-1/2 w-full text-[#b1a696] lg:text-[3rem] text-[1.6rem] md:leading-[1.1] lg:mt-0 mt-8 lg:pr-16'>
                    <p>{chooseData.description}</p>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <div className="lg:w-[30%] w-[60%]">
                        <p className="text-[1.4rem] lg:text-[1.6rem] text-[#eae5dd]">All projects are built
                            based on the same principles:</p>
                    </div>
                    <div className="flex flex-1 flex-wrap justify-start items-start gap-2 mt-8">
                        {chooseData.features.map((feature, index) => (
                            <div 
                                key={index}
                                className={`border-[1px] ${index % 2 === 0 ? 'border-[#b1a696] text-[#b1a696]' : 'border-[#f4efe7] text-[#f4efe7]'} lg:text-[3rem] text-[1.6rem] px-[28px] py-[8px] rounded-full`}
                            >
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Choose;

