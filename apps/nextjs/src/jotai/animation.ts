import { atom } from "jotai";
import type { Easing, Animation, AnchorPlacement } from "react-gsap-aos";

export const animationAtom = atom<Animation>("fade");
export const easingAtom = atom<Easing>("none");
export const offsetAtom = atom<number>(120);
export const durationAtom = atom<number>(400);
export const delayAtom = atom<number>(0);
export const onceAtom = atom<boolean>(false);
export const mirrorAtom = atom<boolean>(false);
export const anchorPlacementAtom = atom<AnchorPlacement>("top-bottom");
