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
                    <div className="outro-img absolute inset-0 bg-no-repeat bg-cover bg-center z-0 md:block hidden" style={{ backgroundImage: `url('./5.jpg')` }} />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-[1] md:block hidden" />

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
                    <div className="relative">
                        <h1
                            className="text-[#ffffff] text-start text-6xl md:text-9xl font-bold tracking-wider lg:absolute lg:bottom-44 lg:left-2"
                        >
                            Electrical & Landscaping

                        </h1>

                        <div className="w-full h-auto absolute md:top-64 top-24 flex md:flex-row flex-col md:justify-between md:items-end">
                            <h2
                                className="text-start lg:mt-0 md:text-[#f4efe7] text-[#b1a696] text-2xl font-bold md:tracking-wider leading-5 flex flex-col gap-1"
                                style={{ textShadow: '2px 2px 4px #000' }}
                            >
                                <span>Closer to</span>
                                <span>Nature—Closer</span>
                                <span>to Yourself</span>
                            </h2>

                            <p
                                className="md:w-[20%] w-[80%] text-[#f4efe7] text-[0.7rem] font-bold  md:font-medium tracking-wide lg:text-end mt-2 text-justify"
                                style={{ textShadow: '2px 2px 4px #000' }}
                            >
                                Spend unforgettable and remarkable time in the Californian desert with—Capsules.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Outro;
