import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { ArrowRight, Menu } from "lucide-react";
import GradientText from "../GradientText/GradientText";
import { TextHoverEffect } from "../textBorder/textBorder";

import "./preloaderII.css";

gsap.registerPlugin(SplitText);
export default function PreloaderII() {
    const navigate = useNavigate();
    const [canClick, setCanClick] = useState(false);
    useGSAP(() => {
        function createSplitTexts(elements) {
            const splits = {};
            elements.forEach(({ key, selector, type }) => {
                const config = { type, mask: type };
                if (type === "chars") { config.charsClass = "char"; }
                if (type === "lines") { config.linesClass = "line"; }
                splits[key] = SplitText.create(selector, config);
            });
            return splits;
        }

        const splitElements = [
            { key: "footerLines", selector: ".preloader-footer p", type: "lines" },
        ];

        const splits = createSplitTexts(splitElements);

        gsap.set(".preloader-logo", { opacity: 0, scale: 0.8 });
        gsap.set(".preloader-start", { opacity: 0 });

        gsap.set(
            [
                splits.footerLines.lines,
            ],
            { y: "100%" }
        );

        function animateProgress(duration = 1.5) {
            const tl = gsap.timeline();

            // Set initial state
            gsap.set(".preloader-progress-bar", {
                scale: 0,
                opacity: 0,
                rotation: -5,
            });

            tl.to(".preloader-progress-bar", {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: duration,
                ease: "back.out(1.4)",
            });

            return tl;
        }

        const tl = gsap.timeline({ delay: 0.5 });
        tl.to(".preloader-logo", {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power4.inOut",
        })
            .to(
                splits.footerLines.lines,
                {
                    y: "0%",
                    stagger: 0.1,
                    duration: 1,
                    ease: "power4.inOut",
                },
                "+=1.95"
            )
            .to(
                ".preloader-logo",
                {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.85,
                    ease: "power2.inOut",
                },
                "-=2"
            )
            .add(animateProgress(), "<")
            .set(".preloader-progress", { backgroundClip: "var(--base-300)" })


            .to(
                ".preloader-start",
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => setCanClick(true)
                },
                "-=0.55"
            )



    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#ffffff]">
            <div className="preloader-progress">
                <div className="preloader-progress-bar"></div>
                <div 
                    className="preloader-logo"
                    style={{ maxWidth: '400px', height: '100px',  }}
                >
                    <TextHoverEffect 
                        text="PALSD" 
                        gradientColors={["#274BFF", "#46F9FF", "#3770FF"]}
                        animateGradient={true}
                        animationSpeed={8}
                        strokeWidth="1.2"
                    />
                </div>

                <div 
                    className="preloader-start cursor-pointer"
                    onClick={() => canClick && navigate('/home')}
                    aria-label="Start and go to homepage"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => canClick && e.key === 'Enter' && navigate('/home')}
                    style={{ pointerEvents: canClick ? 'auto' : 'none' }}
                >
                    <GradientText
                        colors={["#ffffff"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-6xl  font-family-inter"
                    >
                        Start
                    </GradientText>
                </div>
            </div>

            <div className="preloader-mask"></div>

            <div className="preloader-content">
                <div className="preloader-footer">
                    <p className="text-xl">
                        Meet PALSD <br />
                        houses, in the California .
                    </p>
                </div>
            </div>
        </section>
    );
}
