import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import GradientText from "../GradientText/GradientText";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      // Initial state - hidden
      gsap.set(menuRef.current, { display: "flex", scale: 0.8, y: 20 });
      gsap.set(menuItemsRef.current, { opacity: 0, y: 50 });
      gsap.set(contentRef.current, { opacity: 0, scale: 0.9, y: 30 });

      // Animation timeline - revealing from menu button
      const tl = gsap.timeline();
      
      tl.fromTo(
        menuRef.current,
        { 
          clipPath: "circle(0% at 50% 100%)",
          scale: 0.7,
          duration: 0.4, 
          y: 20
        },
        { 
          clipPath: "circle(150% at 50% 100%)", 
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out"
        }
      )
      .to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.6");
    } else if (menuRef.current) {
      // Close animation - collapsing back to menu button
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menuRef.current, { display: "none" });
        }
      });

      tl.to(menuItemsRef.current, {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.55,
        ease: "power2.in"
      })
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.55,
        ease: "power2.in"
      }, "-=0.15")
      .to(menuRef.current, {
        clipPath: "circle(0% at 50% 100%)",
        scale: 0.8,
        y: 20,
        duration: 0.5,
        ease: "power3.in"
      }, "-=0.15");
    }
  }, [isMenuOpen]);

  const menuItems = [
    { title: "Technology", href: "#" },
    { title: "Company", href: "#" },
    { title: "Careers", href: "#" },
    { title: "Journal", href: "#" },
    { title: "Beta", href: "#" }
  ];

  return (
    <>
      {/* Menu Button - Toggles between Menu and Close */}
      <div 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit h-20 p-8 px-2 flex items-center justify-end gap-4 bg-[#ececec] rounded-full z-[100] cursor-pointer group transition-all duration-500"
      >
        <div>
          <div className="p-8 text-[#2a2725]">
            <button className="text-xl hover:font-bold">
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        <div className="bg-[#2a2725] rounded-full p-6">
          {isMenuOpen ? (
            <IoMdClose className="text-[#b1a696] text-2xl transition-transform duration-500 group-hover:rotate-[90deg]" />
          ) : (
            <IoMdMenu className="text-[#b1a696] text-2xl transition-transform duration-500 group-hover:rotate-[360deg]" />
          )}
        </div>
      </div>

      {/* Menu Card - Positioned above button */}
      <div 
        ref={menuRef}
        className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[90] hidden"
        style={{ clipPath: "circle(0% at 50% 100%)" }}
      >
        {/* Menu Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl w-[80vw] max-w-4xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-10 py-6">
            <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-black rounded-sm"></div>
            </div>
            
            <GradientText
              colors={["#274BFF", "#46F9FF", "#3770FF"]}
              animationSpeed={8}
              showBorder={false}
              className="text-3xl font-bold tracking-tight"
            >
              PALSD
            </GradientText>
            
            <div className="w-10 h-10"></div>
          </div>

          {/* Main Content */}
          <div className="flex px-10 py-8 gap-12">
            {/* Left Side - Menu Items */}
            <div className="flex-1 flex flex-col justify-start gap-4">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  className="text-3xl font-normal text-black hover:opacity-60 transition-opacity duration-300 w-fit"
                >
                  {item.title}
                </a>
              ))}
            </div>

            {/* Right Side - Content Area */}
            <div 
              ref={contentRef}
              className="flex-1 flex items-start justify-center"
            >
              <div className="relative w-full h-64 bg-gray-200 rounded-2xl overflow-hidden">
                <img 
                  src="3.jpg" 
                  alt="Our story"
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-white transition-colors shadow-lg">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center border border-gray-200">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-black">Our story</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-10 py-5 text-xs text-gray-600">
            <span>The helpful robotics company</span>
            <span>Launching 2026</span>
            <span>Beta Application</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
