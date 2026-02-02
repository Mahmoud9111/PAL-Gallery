import { useRef } from 'react';
import banner from '../../assets/showcase-img.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Outro = ({ project }) => {
    const outroConRef = useRef(null);
    const outroImgRef = useRef(null);
    
    // Use project data if provided, otherwise use defaults
    const outroData = project?.outro || {
        image: '/4.jpg',
        title: 'PAL ENGINEERING',
        leftText: '',
        rightText: ''
    };

    useGSAP(() => {
        if (!outroConRef.current || !outroImgRef.current) return;

        gsap.fromTo(outroImgRef.current,
            {
                scale: 1.3, // Initial scale
            },
            {
                scale: 1, // Final scale
                ease: "none",
                scrollTrigger: {
                    trigger: outroConRef.current,
                    start: "top bottom-=20%",
                    end: "bottom top+=20%",
                    scrub: true,
                    // markers: true,
                }
            }
        );

    }, { scope: outroConRef });

    return (
        <div ref={outroConRef} className="w-screen h-[75vh] p-8 overflow-hidden">
            <div className='w-full h-full relative overflow-hidden rounded-[5rem] p-4'>
                <img
                    ref={outroImgRef} src={outroData.image} alt={outroData.title} className='w-full h-full object-cover' />

                <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5vw] font-bold text-[#f4efe7]'>{outroData.title}</h1>
                <div className='absolute bottom-5 px-4 w-full'>
                    <div className="w-full h-auto flex md:flex-row flex-col md:justify-between md:items-end">
                        <h2
                            className="text-start lg:mt-0 md:text-[#f4efe7] text-[#b1a696] text-2xl font-bold md:tracking-wider leading-5 flex flex-col gap-1"
                            style={{ textShadow: '2px 2px 4px #000' }}
                        >
                            {outroData.leftText}
                        </h2>

                        <p
                            className="md:w-[20%] w-[80%] text-[#f4efe7] text-[0.7rem] font-bold  md:font-medium tracking-wide lg:text-end mt-2 text-justify"
                            style={{ textShadow: '2px 2px 4px #000' }}
                        >
                            {outroData.rightText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Outro;
