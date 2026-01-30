# ScrollVelocity Component - GSAP Version

A scroll-responsive text animation component that creates infinite horizontal scrolling text with velocity-based speed changes. Built with GSAP instead of Framer Motion for optimal performance.

## Features

- ✨ Infinite horizontal scrolling text
- 🚀 Responds to scroll velocity (faster scrolling = faster animation)
- 🎯 Seamless looping with no visible jumps
- ⚡ Smooth velocity transitions with configurable damping
- 🎨 Fully customizable styling with Tailwind CSS
- 📱 Responsive design ready

## Installation

The component uses GSAP which is already installed in your project:

```json
{
  "gsap": "^3.14.2",
  "@gsap/react": "^2.1.2"
}
```

## Basic Usage

```jsx
import ScrollVelocity from "./components/ScrollVelocity";

function App() {
  return (
    <ScrollVelocity velocity={100}>
      CREATIVE DESIGN&nbsp;
    </ScrollVelocity>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Text content to display (add `&nbsp;` for spacing) |
| `velocity` | `number` | `100` | Base scrolling speed (pixels per second) |
| `scrollContainerRef` | `React.RefObject` | `undefined` | Optional ref to custom scroll container |
| `className` | `string` | `""` | CSS class for text styling |
| `damping` | `number` | `50` | Velocity smoothing factor (higher = slower response) |
| `numCopies` | `number` | `6` | Number of text copies for seamless looping |
| `velocityMapping` | `object` | `{ input: [0, 1000], output: [0, 5] }` | Maps scroll velocity to speed multiplier |
| `parallaxClassName` | `string` | `""` | CSS class for container wrapper |
| `scrollerClassName` | `string` | `""` | CSS class for scrolling text container |
| `parallaxStyle` | `React.CSSProperties` | `undefined` | Inline styles for container wrapper |
| `scrollerStyle` | `React.CSSProperties` | `undefined` | Inline styles for scrolling text container |

## Advanced Examples

### Custom Styling

```jsx
<ScrollVelocity
  velocity={120}
  className="text-white text-6xl"
  parallaxClassName="bg-gradient-to-r from-purple-600 to-pink-600"
  parallaxStyle={{ height: "200px" }}
  scrollerClassName="font-extrabold tracking-wider"
>
  DESIGN CODE CREATE&nbsp;
</ScrollVelocity>
```

### Adjusting Velocity Response

```jsx
<ScrollVelocity
  velocity={100}
  damping={30} // More responsive to scroll changes
  velocityMapping={{
    input: [0, 500],  // Detect velocity from 0-500 pixels/sec
    output: [0, 10]   // Multiply speed by 0-10x
  }}
>
  FAST SCROLL&nbsp;
</ScrollVelocity>
```

### Multiple Lines (Create Multiple Components)

```jsx
<>
  <ScrollVelocity velocity={100}>
    CREATIVE DESIGN&nbsp;
  </ScrollVelocity>
  
  <ScrollVelocity velocity={-150}>
    MODERN ANIMATION&nbsp;
  </ScrollVelocity>
  
  <ScrollVelocity velocity={200}>
    GSAP POWERED&nbsp;
  </ScrollVelocity>
</>
```

### Custom Scroll Container

```jsx
import { useRef } from "react";

function App() {
  const scrollContainerRef = useRef(null);
  
  return (
    <div ref={scrollContainerRef} className="h-screen overflow-auto">
      <ScrollVelocity
        scrollContainerRef={scrollContainerRef}
        velocity={100}
      >
        SCROLL TEXT&nbsp;
      </ScrollVelocity>
    </div>
  );
}
```

## How It Works

### GSAP Implementation Details

1. **Scroll Tracking**: Uses `ScrollTrigger.create()` to monitor scroll position and calculate velocity
2. **Smooth Velocity**: Applies exponential smoothing to create spring-like damping effect
3. **Animation Loop**: Uses `requestAnimationFrame` for smooth 60fps animation
4. **Seamless Looping**: Wraps position between `-copyWidth` and `0` for infinite scrolling
5. **Transform Updates**: Uses `gsap.set()` for efficient transform updates

### Velocity Mapping

The `velocityMapping` prop controls how scroll speed affects text speed:

```javascript
{
  input: [0, 1000],  // Scroll velocity range (pixels/second)
  output: [0, 5]     // Speed multiplier range
}
```

- Scroll at 0 px/s → text moves at base velocity × 0 = base velocity
- Scroll at 500 px/s → text moves at base velocity × 2.5
- Scroll at 1000 px/s → text moves at base velocity × 5

### Direction Behavior

- **Positive velocity** → text scrolls left to right
- **Negative velocity** → text scrolls right to left
- Scrolling **down** → text accelerates in base direction
- Scrolling **up** → text accelerates in opposite direction

## Performance Optimization

- Uses `willChange: "transform"` for GPU acceleration
- `gsap.set()` for efficient transform updates
- `useLayoutEffect` for synchronous width measurements
- Cleanup functions prevent memory leaks

## Differences from Framer Motion Version

| Feature | Framer Motion | GSAP Version |
|---------|---------------|--------------|
| Animation Engine | Framer Motion | GSAP + ScrollTrigger |
| Spring Physics | Built-in | Custom smoothing algorithm |
| Bundle Size | Larger | Smaller (if GSAP already used) |
| Performance | Good | Excellent |
| API | Declarative | Imperative + Hooks |

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires support for:
  - CSS Transforms
  - requestAnimationFrame
  - ES6+ JavaScript

## Troubleshooting

### Text not scrolling
- Ensure parent has enough scroll height
- Check that `texts` array has content
- Verify `velocity` is not 0

### Jerky animation
- Increase `damping` for smoother velocity transitions
- Ensure no layout shifts during scroll
- Check for conflicting CSS transforms

### Gap in looping
- Increase `numCopies` (default is 6)
- Ensure text has trailing space: `"TEXT "`
- Check that text width is calculated correctly

## License

MIT
