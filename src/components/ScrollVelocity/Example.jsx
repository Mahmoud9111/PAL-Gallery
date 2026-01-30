import React from "react";
import ScrollVelocity from "./ScrollVelocity";

/**
 * Example usage of the ScrollVelocity component
 */
const ScrollVelocityExample = () => {
  return (
    <div className=" bg-gray-50">


      {/* Scroll Velocity Section */}
      <ScrollVelocity
        velocity={50}
        damping={50}
        numCopies={6}
        velocityMapping={{ input: [0, 1000], output: [0, 5] }}
        className="text-black"
        parallaxClassName="bg-white"
      >
        PAL ENGINEERING&nbsp;
      </ScrollVelocity>


    </div>
  );
};

export default ScrollVelocityExample;
