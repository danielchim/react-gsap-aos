# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for `react-gsap-aos`, a lightweight GSAP + ScrollTrigger integration library designed for React/Next.js with an API similar to AOS (Animate On Scroll). The project uses pnpm workspaces with two main areas:

- `packages/react-gsap-aos`: The core library package
- `apps/nextjs`: Demo Next.js application showcasing the library

## Development Commands

**Package Manager**: This project uses `pnpm` exclusively. Always use `pnpm` instead of npm or yarn.

### Initial Setup
```bash
pnpm install
```

### Building the Library
The library must be built before running the demo app:
```bash
cd packages/react-gsap-aos
pnpm build
```

Or build all packages from root:
```bash
pnpm build
```

### Running the Demo App
```bash
cd apps/nextjs
pnpm dev
```

### Linting
```bash
pnpm lint          # Lint all packages
```

## Architecture

### Core Library (`packages/react-gsap-aos`)

**Build System**: Uses `tsup` for bundling with multiple entry points:
- `index.ts`: Main exports (types, utilities)
- `client.ts`: Client-side components and hooks (requires "use client" in Next.js)
- `constants.ts`: Animation constants and definitions

**Key Components**:

1. **`useAOSScope` hook** (`src/hooks/useAOSScope.ts`): The core hook that powers the entire library. It:
   - Uses `MutationObserver` to watch for DOM changes and `data-aos-*` attribute modifications
   - Maintains a `WeakMap` to track animation instances per element
   - Automatically creates/updates/removes GSAP animations based on DOM mutations
   - Uses `useGSAP` from `@gsap/react` for proper GSAP context management
   - Should not be nested but can be used in parallel across different components

2. **`AOSProvider` component** (`src/components/AOSProvider.tsx`): A wrapper around `useAOSScope` that provides a simpler API for most use cases. Accepts `component`, `className`, and `options` props.

3. **Animation System** (`src/animation/`):
   - `createAnimation.ts`: Main factory that maps animation names to their implementations
   - `animations.ts`: Contains all animation definitions (fade, slide, flip, zoom variants)
   - `definitions.ts`: Animation configuration objects
   - `utils/`: Helper functions for parsing attributes, creating tween vars, and merging options

4. **Type System** (`src/types.ts`): Comprehensive TypeScript types for animations, easings, and anchor placements

**Important Patterns**:
- The library uses `data-aos-container` attributes to establish positioning contexts for ScrollTrigger calculations
- Animation options can be set via `data-aos-*` attributes or the `toAOSProps()` helper function
- The `once` option is implemented via `toggleActions` in ScrollTrigger for stability
- `refreshAOS()` wraps `ScrollTrigger.refresh(true)` for manual layout updates

### Demo App (`apps/nextjs`)

Built with Next.js 16, React 19, and Tailwind CSS v4. Uses Jotai for state management of animation options in the demo interface.

**Key Features**:
- Interactive animation panel to test all animation options
- Visual markers for anchor placement and offset debugging
- Tab-based interface showing single animations vs. all animations
- Dynamic option updates with `refreshAOS()` integration

## Important Notes

- **SSR Compatibility**: Client-side hooks and components must be imported from `react-gsap-aos/client` and used in files with `"use client"` directive
- **No Nesting**: Never nest `AOSProvider` or `useAOSScope` calls - this causes duplicate animations and listeners
- **Container Positioning**: Always use `data-aos-container` on parent elements to ensure correct ScrollTrigger offset calculations
- **Path Aliases**: The library uses `@/` alias pointing to `src/` directory
- **Peer Dependencies**: Requires `react >=17`, `gsap ^3.12.5`, and `@gsap/react ^2.1.2`
