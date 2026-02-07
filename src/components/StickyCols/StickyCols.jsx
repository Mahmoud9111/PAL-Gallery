import gsap, { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import colimg1 from "../../assets/cap1-square.jpg";
import colimg2 from "../../assets/cap2-square.jpg";

const StickyCols = ({ project }) => {
    
    // Use project data if provided, otherwise use defaults
    const stickyData = project?.stickyCols?.sections || [
        {
            title: "Enjoy the view through—the wide panoramic glass window",
            description: "Get closer to the desert nature than ever before and admire this unique, breathtaking landscape.",
            image: `${import.meta.env.BASE_URL}4.jpg`
        },
        {
            title: "Enjoy the view through—the wide panoramic glass window",
            description: "Get closer to the desert nature than ever before and admire this unique, breathtaking landscape.",
            image: `${import.meta.env.BASE_URL}5.jpg`
        }
    ];

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Controlled phase logic using timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".sticky-cols",
                start: "top top",
                end: "+=90%",
                pin: true,
                scrub: 1,
                // markers: true,
            },
        });
        // PHASE 1: Reveal col-2, hide col-1
        tl.to(".col-1", { opacity: 0, scale: 0.8, duration: 0.8 })
            .to(".col-2", { x: "0%", duration: 0.8 }, "<")
            .to(".col-3", { y: "0%", duration: 0.8 }, "<")
            .to(".col-img-1 img", { scale: 1, duration: 0.8 }, "<")
            .to(".col-img-2", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.8,
            }, "<")
            .to(".col-img-2 img", { scale: 1.6, duration: 0.8 }, "<");

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
            tl.kill();
        };
    });

    return (
        <section className="sticky-cols w-screen overflow-hidden bg-[#fbfbfb]">
            <div className="sticky-cols-wrapper relative w-full h-screen ">
                <div className="col col-1 ">
                    <div className="col-content ">
                        <div className="col-content-wrapper max-w-7xl mx-auto px-8 md:px-16">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-black font-bold leading-tight mt-32">
                                {stickyData[0].title}
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-normal max-w-3xl">
                                {stickyData[0].description}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-6 mb-72">
                                <button className="group bg-[#ffffff] hover:bg-[#ffffff] text-black font-medium  py-2 pl-6 pr-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 w-fit flex items-center gap-4 shadow-lg">
                                    <span className="text-base md:text-xl">View All Services</span>
                                    <div className="bg-black group-hover:bg-[#1a1a1a] w-[3.25rem] h-[3.25rem] overflow-hidden rounded-full transition-all duration-500">
                                        <div className="flex w-[6.5rem] -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex w-[3.25rem] h-[3.25rem] items-center justify-center flex-shrink-0">
                                                <svg className="w-7 h-7 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                                </svg>
                                            </span>
                                            <span className="flex w-[3.25rem] h-[3.25rem] items-center justify-center flex-shrink-0">
                                                <svg className="w-7 h-7 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col col-2">
                    <div className="col-img col-img-1">
                        <div className="col-img-wrapper">
                            <img src={stickyData[0].image} alt="img" />
                            <div className="absolute inset-0 bg-black opacity-20 pointer-events-none"></div>
                        </div>
                    </div>
                    <div className="col col-img-2">
                        <div className="col-img-wrapper !p-0 !m-0">
                            <img src={stickyData[0].image} alt="img" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black opacity-20 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
                <div className="col col-3">
                    <div className="col-content-wrapper">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-black font-bold leading-tight mt-32">
                            {stickyData[1].title}
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-normal max-w-3xl">
                            {stickyData[1].description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-6 mb-72">
                            <button className="group bg-[#ffffff] hover:bg-[#ffffff] text-black font-medium  py-2 pl-6 pr-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 w-fit flex items-center gap-4 shadow-lg">
                                <span className="text-base md:text-xl">View All Services</span>
                                <div className="bg-black group-hover:bg-[#1a1a1a] w-[3.25rem] h-[3.25rem] overflow-hidden rounded-full transition-all duration-500">
                                    <div className="flex w-[6.5rem] -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                                        <span className="flex w-[3.25rem] h-[3.25rem] items-center justify-center flex-shrink-0">
                                            <svg className="w-7 h-7 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </span>
                                        <span className="flex w-[3.25rem] h-[3.25rem] items-center justify-center flex-shrink-0">
                                            <svg className="w-7 h-7 text-[#ffffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default StickyCols;

