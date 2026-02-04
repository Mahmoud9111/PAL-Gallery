import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
// import { ArrowRight, Menu } from "lucide-react";
import GradientText from "../GradientText/GradientText";

import "./preloaderII.css";

gsap.registerPlugin(SplitText);
export default function PreloaderII() {
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
            { key: "logoChars", selector: ".preloader-logo h1", type: "chars" },
            { key: "footerLines", selector: ".preloader-footer p", type: "lines" },
        ];

        const splits = createSplitTexts(splitElements);

        gsap.set(splits.logoChars.chars, { x: "100%" });
        gsap.set(".preloader-start", { opacity: 0 });

        gsap.set(
            [
                splits.footerLines.lines,
            ],
            { y: "100%" }
        );

        function animateProgress(duration = 3.5) {
            const tl = gsap.timeline();
            const counterSteps = 3;
            let currentProgress = 0;

            for (let i = 0; i < counterSteps; i++) {
                const finalStep = i === counterSteps - 1;
                const targetProgress = finalStep
                    ? 1
                    : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
                currentProgress = targetProgress;

                tl.to(".preloader-progress-bar", {
                    scaleX: targetProgress,
                    duration: duration / counterSteps,
                    ease: "power3.out",
                });
            }

            return tl;
        }

        const tl = gsap.timeline({ delay: 0.5 });
        tl.to(splits.logoChars.chars, {
            x: "0%",
            stagger: 0.05,
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
                "0.25"
            )
            .add(animateProgress(), "<")
            .set(".preloader-progress", { backgroundClip: "var(--base-300)" })
            .to(
                splits.logoChars.chars,
                {
                    x: "-100%",
                    stagger: 0.05,
                    duration: 1,
                    ease: "power4.inOut",
                },
                "+=0.15"
            )
            .to(splits.footerLines.lines, {
                y: "-100%",
                stagger: 0.1,
                duration: 0.5,
                ease: "power4.inOut",
            }, "-=0.1")
            .to(
                ".preloader-start",
                {
                    opacity: 1,
                    duration: 1,
                    ease: "power4.inOut",
                },
                "+=0.15"
            )



    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#ffffff]">
            <div className="preloader-progress">
                <div className="preloader-progress-bar"></div>
                <button 
                    className="preloader-logo cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => window.location.href = '/'}
                    aria-label="Go to homepage"
                >
                    <h1>PALSD</h1>
                </button>
                <div className="preloader-start">
                    <GradientText
                        colors={["#274BFF", "#46F9FF", "#3770FF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-7xl font-bold tracking-tight"
                    >
                        Start
                    </GradientText>
                </div>
            </div>

            <div className="preloader-mask"></div>

            <div className="preloader-content">
                <div className="preloader-footer">
                    <p className="text-sm">
                        Meet Capsules®—modern and cozy<br />
                        houses, in the California desert.
                    </p>
                </div>
            </div>
        </section>
    );
}
