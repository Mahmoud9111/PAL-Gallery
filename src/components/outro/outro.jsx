import gsap from "gsap/all";
import mobileHeroBg from "../../assets/hero-mobile.png";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

const Outro = () => {

    const isMobHero = useMediaQuery({
        query: "(max-width:768px)",
    });


    useGSAP(() => {
        if (!isMobHero) {
            gsap.set(".outro-section .outro-img", {
                scale: 1.8
            });
            
            gsap.to(".outro-section .outro-img", {
                yPercent: "-5",
                stagger: 0.02,
                scale: 1.1,
                duration: 0.5,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".outro-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                    // markers: true
                }
            });
        };
    }, [isMobHero]);

    return (
        <section className="outro-section w-dvw md:h-dvh h-[100vh] md:p-2 p-2.5 mb-20 bg-white">
            <div className="relative w-full h-full rounded-[6.5rem] overflow-hidden">
                <div className="responsive-mobile">
                    {/* Background image (down layer) */}
                    <div className="outro-img absolute inset-0 bg-no-repeat bg-cover bg-center z-0 md:block hidden" style={{ backgroundImage: `url('./4.jpg')` }} />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-[1] md:block hidden" />

                    {/* Mobile image fallback */}
                    <div className="block lg:hidden mt-6 mb-6">
                        <img
                            src={mobileHeroBg}
                            alt="mobile bg"
                            className="w-full rounded-[2rem] object-cover shadow-[0_-25px_45px_-10px_rgba(255,0,0,0.15)]"
                        />
                    </div>


                </div>
                <div className="h-full p-4 flex flex-col md:justify-center">
                    <div className="relative flex items-center justify-center h-full">
                        <h1
                            className="text-[#ffffff] text-center text-8xl md:text-[12rem] lg:text-[10rem] font-bold tracking-wider z-10"
                        >
                            PAL ENGINEERING
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Outro;
