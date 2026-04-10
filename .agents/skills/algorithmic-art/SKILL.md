---
name: algorithmic-art
description: Use this skill when asked to create generative interactive visuals or "magical" energy effects (e.g., starfields, flow fields, liquid effects). It uses p5.js and math-based art principles to generate unique, computational art.
---

# Generative Algorithmic Art Workflow

When this skill is activated, you must follow a two-step process to define and implement generative visuals.

## 1. Computational Worldview (Philosophy Creation)
Before writing `p5.js` code, define the "Physics of Life" for the art:
- **Worldview**: Define the "Concept" (e.g., "Organic Turbulence," "Quantum Harmonics," "Entropic Order").
- **Motion Principle**: Describe the math behind the movement (e.g., "Vector field driven by 2D Perlin noise," "Iterative flocking behavior with attraction/repulsion").
- **Visual Identity**: Key geometric primitives (e.g., "Diffused circles with varied alpha," "Dashed lines trailing the flow").

## 2. Implementation with p5.js
- **Deterministic Randomness**: Always use `randomSeed()` or `noiseSeed()` with a provided seed to ensure reproducibility.
- **Interactive Parameters**: Expose at least 3 controllable variables (e.g., `density`, `flowIntensity`, `spectralShift`) to let the user play with the art.
- **Expert Craftsmanship**:
  - Avoid 100% saturation; use HSL with 20-50% saturation for "Mystical" vibes.
  - Implement smooth frame-rate synchronization.
  - Use `blendMode(ADD)` or `SCREEN` for glowing "Aura" effects.

## Examples
- **Mystical Starfield**: Thousands of tiny points moving via flow field, where interaction creates "repulsion" waves.
- **Aura Shimmer**: A liquid-like gradient mesh that reacts to the mouse, simulating an energy aura around a card.

## Constraints
- **NEVER** use simple `random()` without a seed.
- **ALWAYS** include a "reset" or "clear" mechanism if pixels accumulate.
- **MAXIMIZE** performance; use off-screen buffers (GBuffer) if more than 5,000 particles are rendered.
