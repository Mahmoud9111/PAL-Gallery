import gsap from "gsap/all";
import smoke from "../../assets/smoke_final.mp4";
import mobileHeroBg from "../../assets/hero-mobile.png";
import cap1Bg from "../../assets/cap1.png";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

const Hero = ({ project }) => {

    const isMobHero = useMediaQuery({
        query: "(max-width:768px)",
    });

    // Use project data if provided, otherwise use defaults
    const heroData = project?.hero || {
        backgroundImage: `${import.meta.env.BASE_URL}2.jpg`,
        title: "Smart Property Secure Future",
        subtitle: "Build wealth with high-return properties, transparent processes, and expert guidance designed for modern investors.",
        description: "Spend unforgettable and remarkable time in the Californian desert with—Capsules."
    };


    useGSAP(() => {
        if (!isMobHero) {
            gsap.to(".hero-section .hero-img", {
                yPercent: "-5",
                stagger: 0.02,
                scale: 1.4,
                duration: 2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                    // markers: true
                }
            });
        };
    }, [isMobHero]);

    return (
        <section className="hero-section w-dvw md:h-dvh h-[100vh] md:p-2 p-2.5  bg-[#fbfbfb]">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                <div className="responsive-mobile">
                    {/* Background image (down layer) */}
                    <div className="hero-img absolute inset-0 bg-no-repeat bg-cover bg-center z-0 md:block hidden" style={{ backgroundImage: `url('${heroData.backgroundImage}')` }} />
                    
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black/30 z-[1] md:block hidden" />

                    {/* Mobile image fallback */}
                    <div className="block lg:hidden mt-6 mb-6 relative">
                        <img
                            src={heroData.backgroundImage}
                            alt="mobile bg"
                            className="w-full rounded-[2rem] object-cover shadow-[0_-25px_45px_-10px_rgba(255,0,0,0.15)]"
                        />
                        {/* Black overlay for mobile */}
                        <div className="absolute inset-0 bg-black/40 rounded-[2rem]" />
                    </div>


                </div>
                <div className="h-full p-8 flex flex-col md:justify-start md:pt-72 relative z-10">
                    <div className="relative w-full md:w-3/4 lg:w-2/3">
                        {/* Animated Announcement Badge */}
                        <div className="mb-10 animate-fade-in">
                            <a
                                href="#link"
                                className="hover:bg-white/10 bg-white/5 group flex w-fit items-center gap-5 rounded-full border border-white/20 p-2 pl-6 shadow-lg backdrop-blur-sm transition-all duration-300"
                            >
                                <span className="text-white text-base md:text-lg font-medium">Introducing Support for AI Models</span>
                                <span className="block h-6 w-0.5 bg-white/30"></span>

                                <div className="bg-white/10 group-hover:bg-white/20 w-9 h-9 overflow-hidden rounded-full transition-all duration-500">
                                    <div className="flex w-[4.5rem] -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                                        <span className="flex w-9 h-9 items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                        <span className="flex w-9 h-9 items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <h1
                            className="text-[#ffffff] text-start text-6xl md:text-8xl lg:text-8xl xl:text-[8rem] font-bold tracking-wide leading-tight mb-6"
                        >
                            {heroData.title}
                        </h1>

                        <div className="w-full h-auto flex flex-col">
                            <h2
                                className="text-start md:text-[#ffffff] text-[#ffffff] text-base md:text-2xl font-normal tracking-wide leading-relaxed max-w-2xl mb-6"
                                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
                            >
                                {heroData.subtitle}
                            </h2>

                            <button
                                className="group bg-[#ffffff] hover:bg-[#d4cbc1] text-[#2d2d2d] font-medium py-2 pl-6 pr-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 w-fit flex items-center gap-4 shadow-lg"
                            >
                                <span className="text-xl">Lets Explore</span>
                                <div className="bg-[#3d3d3d] group-hover:bg-[#2d2d2d] w-[3.25rem] h-[3.25rem] overflow-hidden rounded-full transition-all duration-500">
                                    <div className="flex w-[6.5rem] -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                                        <span className="flex w-[3.25rem] h-[3.25rem] items-center justify-center flex-shrink-0">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </span>
                                        <span className="flex w-[3.25rem] h-[3.25rem] items-center justify-center flex-shrink-0">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <p
                                className="md:w-[20%] w-[80%] text-[#f4efe7] text-[0.7rem] font-bold  md:font-medium tracking-wide lg:text-end mt-6 text-justify hidden"
                                style={{ textShadow: '2px 2px 4px #000' }}
                            >
                                {heroData.description}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section - Overview & Chat */}
                    <div className="absolute bottom-14 left-8 right-8 z-20 hidden md:flex gap-4">
                        {/* Left Section - Overview Stats */}
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20" style={{ width: '50%' }}>
                            <div className="mb-6 ">
                                <h3 className="text-white text-lg font-semibold mb-1">Overview</h3>
                                <p className="text-gray-300 text-xs">Data collected over the last two weeks</p>
                            </div>
                            <div className="grid grid-cols-4 gap-4 h-[75%]">
                                {/* Total Property Card */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="bg-white/20 rounded-lg p-2">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-xs mb-2 font-medium">Total Property</p>
                                    <div className="flex items-end justify-between">
                                        <h4 className="text-white text-4xl font-bold">190</h4>
                                        <span className="bg-white/20 rounded-full px-2.5 py-1 text-[10px] text-white flex items-center gap-0.5 font-medium">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            6.2%
                                        </span>
                                    </div>
                                </div>

                                {/* Total Rent Card */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="bg-white/20 rounded-lg p-2">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-xs mb-2 font-medium">Total Rent</p>
                                    <div className="flex items-end justify-between">
                                        <h4 className="text-white text-4xl font-bold">120</h4>
                                        <span className="bg-white/20 rounded-full px-2.5 py-1 text-[10px] text-white flex items-center gap-0.5 font-medium">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            4.2%
                                        </span>
                                    </div>
                                </div>

                                {/* Total Visitors Card */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="bg-white/20 rounded-lg p-2">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-xs mb-2 font-medium">Total Visitors</p>
                                    <div className="flex items-end justify-between">
                                        <h4 className="text-white text-4xl font-bold">70</h4>
                                        <span className="bg-white/20 rounded-full px-2.5 py-1 text-[10px] text-white flex items-center gap-0.5 font-medium">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            3.2%
                                        </span>
                                    </div>
                                </div>

                                {/* People To Rent Card */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="bg-white/20 rounded-lg p-2">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-xs mb-2 font-medium"> To Rent</p>
                                    <div className="flex items-end justify-between">
                                        <h4 className="text-white text-4xl font-bold">123</h4>
                                        <span className="bg-white/20 rounded-full px-2.5 py-1 text-[10px] text-white flex items-center gap-0.5 font-medium">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            0.88%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

