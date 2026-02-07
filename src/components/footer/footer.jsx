import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import MarqueeText from '../Marquee/MarqueeText';
import "./footertitle.css";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Footer = () => {
    return (
        <>
            <section className='w-screen mb-40 px-6'>
                <div>
                    <MarqueeText />
                </div>

                <div className='flex justify-between items-center text-3xl mt-14'>


                    <div className='flex flex-col justify-center items-start'>
                        <a href="#welcome" className='text-[#000000] text-5xl'>Welcome</a>
                        <a href="#welcome" className='text-[#000000] text-5xl'>Introduction</a>
                        <a href="#welcome" className='text-[#000000] text-5xl'>Houses</a>
                        <a href="#welcome" className='text-[#000000] text-5xl'>Why Capsules®</a>
                        <a href="#welcome" className='text-[#000000] text-5xl'>Activites</a>
                        <a href="#welcome" className='text-[#000000] text-5xl'>Feedback</a>
                    </div>
                </div>

                <div className="w-full flex justify-between items-center mt-20">
                    <div className="flex justify-center items-center gap-1">
                        <a href="#" className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#000000] transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-110'>
                            <FaFacebookF className="text-3xl" />
                        </a>
                        <a href="#" className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#000000] transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-110'>
                            <FaInstagram className="text-3xl" />
                        </a>
                        <a href="#" className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#000000] transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-110'>
                            <FaLinkedinIn className="text-3xl" />
                        </a>
                        <a href="#" className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#000000] transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-110'>
                            <FaXTwitter className="text-3xl" />
                        </a>
                    </div>


                </div>
            </section>
            
            <FooterTitle />
        </>
    )
}

const FooterTitle = () => {
    const ftConRef = useRef(null);

    useGSAP(() => {
        if (!ftConRef.current) return;

        // Get the original HTML before splitting
        const originalHTML = ftConRef.current.querySelector(".footer-title h1").innerHTML;

        // Create split - exclude the sub element from being split
        const split = new SplitText(".footer-title h1", {
            type: "chars",
            charsClass: "ftChar",
            // Exclude the <sub> element from being split
            exclude: "sub"
        });

        // Wrap each character in a span for animation
        split.chars.forEach(char => {
            char.innerHTML = `<span>${char.innerHTML}</span>`;
        });

        const innerChars = split.chars.map(c => c.querySelector("span"));

        // Handle the sub element separately
        const sub = ftConRef.current.querySelector(".footer-title sub");
        if (sub) {
            sub.innerHTML = `<span>${sub.innerHTML}</span>`;
            const subSpan = sub.querySelector("span");

            // Add to innerChars array
            innerChars.push(subSpan);
        }

        // Initial state - start from left (-120%)
        gsap.set(innerChars, { x: "-120%" });

        // Animation - move to normal position
        gsap.to(innerChars, {
            x: "0%",
            stagger: 0.06, // Increased stagger for slower character-by-character reveal
            ease: "power2.out", // Smoother easing
            scrollTrigger: {
                trigger: ftConRef.current,
                start: "top 90%",
                end: "top 40%", // Extended range for slower animation
                scrub: 1.9, // Smooth scrubbing with delay
                // markers: true
            }
        });

        // Cleanup - revert the split and restore original HTML
        return () => {
            split.revert();
            // Restore the original HTML with sub element
            ftConRef.current.querySelector(".footer-title h1").innerHTML = originalHTML;
        };

    }, { scope: ftConRef });

    return (
        <section ref={ftConRef} className='relative z-1 w-screen h-[61vh] border-1 border-t-[#000000]'>
            <div className='w-full flex justify-between items-center px-6 pt-8'>
                <p className='text-[#b1a696] text-[1.7rem]'>
                    Website made by—<a href="#" className='text-[#f2ede5]'>PALSD</a>
                </p>
                <p className='text-[#b1a696] text-[1.7rem]'>
                    This website is using <a href="#" className='text-[#f2ede5]'>cookies</a>
                </p>
                <p className='text-[#b1a696] text-[1.7rem]'>
                    All rights reserved © <a href="#" className='text-[#f2ede5]'>2025</a>
                </p>
            </div>

            <div className='footer-title w-full text-center flex justify-center items-center '>
                <h1 className='text-[25vw] font-bold relative'>
                    PALSD
                    <span className="absolute bottom-0 left-0 flex gap-1 ml-2">
                        <a href="#" className='border-[1px] border-[#c4c1b9] rounded-full p-2 text-[#b1a696] transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-110'>
                            <FaFacebookF className="text-xl" />
                        </a>
                        <a href="#" className='border-[1px] border-[#c4c1b9] rounded-full p-2 text-[#b1a696] transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-110'>
                            <FaInstagram className="text-xl" />
                        </a>
                        <a href="#" className='border-[1px] border-[#c4c1b9] rounded-full p-2 text-[#b1a696] transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-110'>
                            <FaLinkedinIn className="text-xl" />
                        </a>
                        <a href="#" className='border-[1px] border-[#c4c1b9] rounded-full p-2 text-[#b1a696] transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-110'>
                            <FaXTwitter className="text-xl" />
                        </a>
                    </span>
                </h1>
            </div>
        </section>
    );
};

export default Footer;
export { FooterTitle };
