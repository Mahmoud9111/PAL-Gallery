# Text Hover Effect Component

A beautiful text hover effect component with GSAP animations and gradient reveals.

## Features

- ✨ Smooth GSAP animations
- 🎨 Dynamic gradient colors on hover
- 🖱️ Mouse tracking with radial gradient reveal
- 🎭 Animated stroke drawing effect

## Usage

### Basic Usage (Demo Component)

```jsx
import TextBorderDemo from '@/components/textBorder';

function App() {
  return <TextBorderDemo />;
}
```

### Custom Text

```jsx
import { TextHoverEffect } from '@/components/textBorder';

function MyComponent() {
  return (
    <div className="h-screen flex items-center justify-center">
      <TextHoverEffect text="YOUR TEXT" duration={0.3} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | required | The text to display |
| `duration` | `number` | `0` | Animation duration for mask movement (in seconds) |

## Examples

### Quick reveal (no delay)
```jsx
<TextHoverEffect text="HELLO" duration={0} />
```

### Smooth reveal
```jsx
<TextHoverEffect text="WELCOME" duration={0.3} />
```

### Slow reveal
```jsx
<TextHoverEffect text="PORTFOLIO" duration={0.8} />
```

## Dependencies

- React
- GSAP
- Tailwind CSS

## How it works

1. **Stroke Animation**: On mount, the text stroke animates from hidden to visible using GSAP
2. **Hover Effect**: When hovered, a background text layer appears with reduced opacity
3. **Gradient Reveal**: Mouse movement creates a radial gradient mask that reveals colorful gradient text underneath
4. **Smooth Tracking**: GSAP animates the mask position following your cursor

## Customization

You can customize the colors by modifying the gradient stops in the component:

```jsx
<stop offset="0%" stopColor="#eab308" />  {/* Yellow */}
<stop offset="25%" stopColor="#ef4444" /> {/* Red */}
<stop offset="50%" stopColor="#3b82f6" /> {/* Blue */}
<stop offset="75%" stopColor="#06b6d4" /> {/* Cyan */}
<stop offset="100%" stopColor="#8b5cf6" /> {/* Purple */}
```
