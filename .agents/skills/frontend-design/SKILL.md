---
name: frontend-design
description: Use this skill when asked to design or implement a high-fidelity web user interface. It forces a deliberate design process to avoid generic AI aesthetics and ensures professional, premium-grade visual results.
---

# High-Fidelity Frontend Design Workflow

When this skill is activated, you must follow a structured design process before and during the implementation of any UI component.

## 1. Design Thinking Phase (Before Coding)
You must explicitly define and share the following with the user:
- **The Tone**: Define the visual personality (e.g., "Brutally Minimalist," "Luxury Refined," "Ethereal Mysticism").
- **Sensory Direction**: Describe the "feel" (e.g., "Frosted glass depth with high-contrast serifs").
- **Differentiation**: Identify one unique visual element that moves the design away from "AI-generic" defaults (e.g., "Custom noise texture on card backgrounds").

## 2. Implementation Guidelines
- **Typography as Hero**: Never use generic fallback fonts like Arial or Inter unless specified. Prioritize high-character serifs (Cormorant, Playfair Display) or specialized sans-serifs (Outfit, Montserrat).
- **Color Systems**: Use curated HSL color palettes. Avoid standard hex codes like #FF0000. Use deep, desaturated tones for secondary elements to create "Mystical Depth."
- **Layered Depth**: Implement "Glassmorphism 2.0."
  - Layered `box-shadow` (multiple shadows with increasing blur).
  - WebKit-based `backdrop-filter: blur()`.
  - Subtle `border` gradients or 1px strokes with 10-20% opacity.
- **Motion & Micro-interactions**:
  - Use "eased" transitions (cubic-bezier) exclusively.
  - Every interaction (hover, click) must have a subtle feedback (e.g., card slightly tilting, border glowing).

## 3. Visual Polish
- **Noise & Texture**: Apply a very low-opacity noise overlay (`.png` or SVG filter) to large surface areas to break the "perfect" digital flatness.
- **Gradient Meshes**: Use multi-point gradients instead of simple linear ones to create more organic, diffused lighting.

## Constraints
- **NEVER** use generic Tailwind/CSS utility classes for complex aesthetics; use custom CSS variables and classes.
- **NEVER** leave a design "flat" without at least one layer of elevation or depth interaction.
