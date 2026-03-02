import {
  perspective,
  rotateX,
  rotateY,
  scale,
  translate3d,
} from "./utils/createTweenVars";

export interface AnimationPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

export interface AnimationDefinitions extends AnimationPreset {
  preset: AnimationPreset;
}

/** 距離 `px` */
export const DISTANCE = 100;

/** 動畫預設配置 */
const presets = {
  fade: {
    from: {
      opacity: 0,
      transitionProperty: "opacity, transform",
    },
    to: {
      opacity: 1,
      transform: "none",
    },
  },
  zoom: {
    from: {
      opacity: 0,
      transitionProperty: "opacity, transform",
    },
    to: {
      opacity: 1,
      ...translate3d(0, 0, 0),
      ...scale(1),
    },
  },
  slide: {
    from: {
      visibility: "hidden",
      transitionProperty: "transform",
    },
    to: {
      visibility: "visible",
      ...translate3d(0, 0, 0),
    },
  },
  flip: {
    from: {
      backfaceVisibility: "hidden",
      transitionProperty: "transform",
    },
    to: {},
  },
} satisfies Record<string, AnimationPreset>;

/** 動畫定義 */
const definitions = {
  fade: { preset: presets.fade, from: {}, to: {} },
  fadeUp: {
    preset: presets.fade,
    from: translate3d(0, DISTANCE, 0),
    to: {},
  },
  fadeDown: {
    preset: presets.fade,
    from: translate3d(0, -DISTANCE, 0),
    to: {},
  },
  fadeLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, 0, 0),
    to: {},
  },
  fadeRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, 0, 0),
    to: {},
  },
  fadeUpRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, DISTANCE, 0),
    to: {},
  },
  fadeUpLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, DISTANCE, 0),
    to: {},
  },
  fadeDownRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, -DISTANCE, 0),
    to: {},
  },
  fadeDownLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, -DISTANCE, 0),
    to: {},
  },
  flipUp: {
    preset: presets.flip,
    from: {
      ...perspective(2500),
      ...rotateX("-100deg"),
    },
    to: { ...perspective(2500), ...rotateX(0) },
  },
  flipDown: {
    preset: presets.flip,
    from: {
      ...perspective(2500),
      ...rotateX("100deg"),
    },
    to: { ...perspective(2500), ...rotateX(0) },
  },
  flipLeft: {
    preset: presets.flip,
    from: {
      ...perspective(2500),
      ...rotateY("-100deg"),
    },
    to: { ...perspective(2500), ...rotateY(0) },
  },
  flipRight: {
    preset: presets.flip,
    from: {
      ...perspective(2500),
      ...rotateY("100deg"),
    },
    to: { ...perspective(2500), ...rotateY(0) },
  },
  slideUp: {
    preset: presets.slide,
    from: translate3d(0, "100%", 0),
    to: {},
  },
  slideDown: {
    preset: presets.slide,
    from: translate3d(0, "-100%", 0),
    to: {},
  },
  slideLeft: {
    preset: presets.slide,
    from: translate3d("100%", 0, 0),
    to: {},
  },
  slideRight: {
    preset: presets.slide,
    from: translate3d("-100%", 0, 0),
    to: {},
  },
  zoomIn: { preset: presets.zoom, from: scale(0.6), to: {} },
  zoomInUp: {
    preset: presets.zoom,
    from: { ...translate3d(0, DISTANCE, 0), ...scale(0.6) },
    to: {},
  },
  zoomInDown: {
    preset: presets.zoom,
    from: { ...translate3d(0, -DISTANCE, 0), ...scale(0.6) },
    to: {},
  },
  zoomInLeft: {
    preset: presets.zoom,
    from: { ...translate3d(DISTANCE, 0, 0), ...scale(0.6) },
    to: {},
  },
  zoomInRight: {
    preset: presets.zoom,
    from: { ...translate3d(-DISTANCE, 0, 0), ...scale(0.6) },
    to: {},
  },
  zoomOut: { preset: presets.zoom, from: scale(1.2), to: {} },
  zoomOutUp: {
    preset: presets.zoom,
    from: {
      ...translate3d(0, DISTANCE, 0),
      ...scale(1.2),
    },
    to: {},
  },
  zoomOutDown: {
    preset: presets.zoom,
    from: {
      ...translate3d(0, -DISTANCE, 0),
      ...scale(1.2),
    },
    to: {},
  },
  zoomOutLeft: {
    preset: presets.zoom,
    from: {
      ...translate3d(DISTANCE, 0, 0),
      ...scale(1.2),
    },
    to: {},
  },
  zoomOutRight: {
    preset: presets.zoom,
    from: {
      ...translate3d(-DISTANCE, 0, 0),
      ...scale(1.2),
    },
    to: {},
  },
} satisfies Record<string, AnimationDefinitions>;

export default definitions;
