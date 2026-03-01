"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  AOS_ATTRIBUTE_MAP: () => AOS_ATTRIBUTE_MAP,
  DEFAULT_OPTIONS: () => DEFAULT_OPTIONS,
  DISTANCE: () => DISTANCE,
  anchorPlacements: () => anchorPlacements,
  animations: () => animations,
  easings: () => easings,
  refreshAOS: () => refreshAOS,
  toAOSProps: () => toAOSProps,
  useAOSInitial: () => useAOSInitial
});
module.exports = __toCommonJS(index_exports);

// hooks/useAOSInitial.ts
var import_react = require("react");
var import_gsap2 = __toESM(require("gsap"));
var import_react2 = require("@gsap/react");

// animations.ts
var import_gsap = __toESM(require("gsap"));
var import_ScrollTrigger = require("gsap/ScrollTrigger");

// constants.ts
var DISTANCE = 100;
var DEFAULT_OPTIONS = {
  offset: 120,
  delay: 0,
  duration: 400,
  easing: "none",
  once: false,
  mirror: false,
  anchorPlacement: "top-bottom"
};
var animations = [
  "fade",
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "fade-up-right",
  "fade-up-left",
  "fade-down-right",
  "fade-down-left",
  "flip-up",
  "flip-down",
  "flip-left",
  "flip-right",
  "slide-up",
  "slide-down",
  "slide-left",
  "slide-right",
  "zoom-in",
  "zoom-in-up",
  "zoom-in-down",
  "zoom-in-left",
  "zoom-in-right",
  "zoom-out",
  "zoom-out-up",
  "zoom-out-down",
  "zoom-out-left",
  "zoom-out-right"
];
var easings = [
  "none",
  "power1",
  "power1.in",
  "power1.out",
  "power1.inOut",
  "power2",
  "power2.in",
  "power2.out",
  "power2.inOut",
  "power3",
  "power3.in",
  "power3.out",
  "power3.inOut",
  "power4",
  "power4.in",
  "power4.out",
  "power4.inOut",
  "back",
  "back.in",
  "back.out",
  "back.inOut",
  "bounce",
  "bounce.in",
  "bounce.out",
  "bounce.inOut",
  "circ",
  "circ.in",
  "circ.out",
  "circ.inOut",
  "elastic",
  "elastic.in",
  "elastic.out",
  "elastic.inOut",
  "expo",
  "expo.in",
  "expo.out",
  "expo.inOut",
  "sine",
  "sine.in",
  "sine.out",
  "sine.inOut"
];
var anchorPlacements = [
  "top-bottom",
  "top-center",
  "top-top",
  "center-bottom",
  "center-center",
  "center-top",
  "bottom-bottom",
  "bottom-center",
  "bottom-top"
];
var AOS_ATTRIBUTE_MAP = {
  "data-aos-offset": "offset",
  "data-aos-delay": "delay",
  "data-aos-duration": "duration",
  "data-aos-easing": "easing",
  "data-aos-mirror": "mirror",
  "data-aos-once": "once",
  "data-aos-anchor-placement": "anchorPlacement"
};

// utils/tweenVars.ts
function translate3d(x, y, z) {
  return { x, y, z };
}
function rotateY(y) {
  return { rotateY: y };
}
function rotateX(x) {
  return { rotateX: x };
}
function scale(x, y) {
  return typeof y === "number" ? {
    scaleX: x,
    scaleY: y
  } : {
    scale: x
  };
}
function perspective(value) {
  return {
    transformPerspective: value
  };
}

// animations.ts
import_gsap.default.registerPlugin(import_ScrollTrigger.ScrollTrigger);
var presets = {
  fade: {
    from: {
      opacity: 0,
      transitionProperty: "opacity, transform"
    },
    to: {
      opacity: 1,
      transform: "none"
    }
  },
  zoom: {
    from: {
      opacity: 0,
      transitionProperty: "opacity, transform"
    },
    to: __spreadValues(__spreadValues({
      opacity: 1
    }, translate3d(0, 0, 0)), scale(1))
  },
  slide: {
    from: {
      visibility: "hidden",
      transitionProperty: "transform"
    },
    to: __spreadValues({
      visibility: "visible"
    }, translate3d(0, 0, 0))
  },
  flip: {
    from: {
      backfaceVisibility: "hidden",
      transitionProperty: "transform"
    },
    to: {}
  }
};
var definitions = {
  fade: { preset: presets.fade, from: {}, to: {} },
  fadeUp: {
    preset: presets.fade,
    from: translate3d(0, DISTANCE, 0),
    to: {}
  },
  fadeDown: {
    preset: presets.fade,
    from: translate3d(0, -DISTANCE, 0),
    to: {}
  },
  fadeLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, 0, 0),
    to: {}
  },
  fadeRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, 0, 0),
    to: {}
  },
  fadeUpRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, DISTANCE, 0),
    to: {}
  },
  fadeUpLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, DISTANCE, 0),
    to: {}
  },
  fadeDownRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, -DISTANCE, 0),
    to: {}
  },
  fadeDownLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, -DISTANCE, 0),
    to: {}
  },
  flipUp: {
    preset: presets.flip,
    from: __spreadValues(__spreadValues({}, perspective(2500)), rotateX("-100deg")),
    to: __spreadValues(__spreadValues({}, perspective(2500)), rotateX(0))
  },
  flipDown: {
    preset: presets.flip,
    from: __spreadValues(__spreadValues({}, perspective(2500)), rotateX("100deg")),
    to: __spreadValues(__spreadValues({}, perspective(2500)), rotateX(0))
  },
  flipLeft: {
    preset: presets.flip,
    from: __spreadValues(__spreadValues({}, perspective(2500)), rotateY("-100deg")),
    to: __spreadValues(__spreadValues({}, perspective(2500)), rotateY(0))
  },
  flipRight: {
    preset: presets.flip,
    from: __spreadValues(__spreadValues({}, perspective(2500)), rotateY("100deg")),
    to: __spreadValues(__spreadValues({}, perspective(2500)), rotateY(0))
  },
  slideUp: {
    preset: presets.slide,
    from: translate3d(0, "100%", 0),
    to: {}
  },
  slideDown: {
    preset: presets.slide,
    from: translate3d(0, "-100%", 0),
    to: {}
  },
  slideLeft: {
    preset: presets.slide,
    from: translate3d("100%", 0, 0),
    to: {}
  },
  slideRight: {
    preset: presets.slide,
    from: translate3d("-100%", 0, 0),
    to: {}
  },
  zoomIn: { preset: presets.zoom, from: scale(0.6), to: {} },
  zoomInUp: {
    preset: presets.zoom,
    from: __spreadValues(__spreadValues({}, translate3d(0, DISTANCE, 0)), scale(0.6)),
    to: {}
  },
  zoomInDown: {
    preset: presets.zoom,
    from: __spreadValues(__spreadValues({}, translate3d(0, -DISTANCE, 0)), scale(0.6)),
    to: {}
  },
  zoomInLeft: {
    preset: presets.zoom,
    from: __spreadValues(__spreadValues({}, translate3d(DISTANCE, 0, 0)), scale(0.6)),
    to: {}
  },
  zoomInRight: {
    preset: presets.zoom,
    from: __spreadValues(__spreadValues({}, translate3d(-DISTANCE, 0, 0)), scale(0.6)),
    to: {}
  },
  zoomOut: { preset: presets.zoom, from: scale(1.2), to: {} },
  zoomOutUp: {
    preset: presets.zoom,
    from: __spreadValues(__spreadValues({}, translate3d(0, DISTANCE, 0)), scale(1.2)),
    to: {}
  },
  zoomOutDown: {
    preset: presets.zoom,
    from: __spreadValues(__spreadValues({}, translate3d(0, -DISTANCE, 0)), scale(1.2)),
    to: {}
  },
  zoomOutLeft: {
    preset: presets.zoom,
    from: __spreadValues(__spreadValues({}, translate3d(DISTANCE, 0, 0)), scale(1.2)),
    to: {}
  },
  zoomOutRight: {
    preset: presets.zoom,
    from: __spreadValues(__spreadValues({}, translate3d(-DISTANCE, 0, 0)), scale(1.2)),
    to: {}
  }
};
function scrollTriggerStart(anchorPlacement, offset) {
  const [v1, v2] = anchorPlacement.split("-");
  const anchor = `${v1} ${v2}`;
  if (offset === 0 || Number.isNaN(offset)) return anchor;
  const fix = `${offset > 0 ? "-" : "+"}=${Math.abs(offset)}`;
  return `${anchor}${fix}`;
}
function createScrollTriggerTween(element, preset, fromVars, toVars, options) {
  var _a;
  const { offset, delay, duration, easing, once, mirror, anchorPlacement } = __spreadValues(__spreadValues({}, DEFAULT_OPTIONS), options);
  const container = ((_a = element.parentElement) == null ? void 0 : _a.hasAttribute("data-aos-container")) ? element.parentElement : null;
  return import_gsap.default.fromTo(
    element,
    __spreadValues(__spreadValues({}, preset.from), fromVars),
    __spreadProps(__spreadValues(__spreadValues({}, preset.to), toVars), {
      scrollTrigger: {
        // markers: true,
        trigger: container || element,
        toggleActions: mirror ? "play reverse play reverse" : "play none none reverse",
        once,
        start: scrollTriggerStart(anchorPlacement, offset)
      },
      ease: easing,
      duration: duration / 1e3,
      delay: delay / 1e3
    })
  );
}
function createAnimationMap(definitions2) {
  const result = {};
  const keys = Object.keys(definitions2);
  for (const key of keys) {
    const { preset, from, to } = definitions2[key];
    result[key] = (element, contextSafe, options) => {
      return (contextSafe ? contextSafe(createScrollTriggerTween) : createScrollTriggerTween)(element, preset, from, to, options);
    };
  }
  return result;
}
var animations2 = createAnimationMap(definitions);
var animations_default = animations2;

// createAOSAnimation.ts
var ANIMATION_REGISTRY = {
  fade: animations_default.fade,
  "fade-up": animations_default.fadeUp,
  "fade-down": animations_default.fadeDown,
  "fade-left": animations_default.fadeLeft,
  "fade-right": animations_default.fadeRight,
  "fade-up-right": animations_default.fadeUpRight,
  "fade-up-left": animations_default.fadeUpLeft,
  "fade-down-right": animations_default.fadeDownRight,
  "fade-down-left": animations_default.fadeDownLeft,
  "flip-up": animations_default.flipUp,
  "flip-down": animations_default.flipDown,
  "flip-left": animations_default.flipLeft,
  "flip-right": animations_default.flipRight,
  "slide-up": animations_default.slideUp,
  "slide-down": animations_default.slideDown,
  "slide-left": animations_default.slideLeft,
  "slide-right": animations_default.slideRight,
  "zoom-in": animations_default.zoomIn,
  "zoom-in-up": animations_default.zoomInUp,
  "zoom-in-down": animations_default.zoomInDown,
  "zoom-in-left": animations_default.zoomInLeft,
  "zoom-in-right": animations_default.zoomInRight,
  "zoom-out": animations_default.zoomOut,
  "zoom-out-up": animations_default.zoomOutUp,
  "zoom-out-down": animations_default.zoomOutDown,
  "zoom-out-left": animations_default.zoomOutLeft,
  "zoom-out-right": animations_default.zoomOutRight
};
function createAnimation(element, contextSafe) {
  const animate = element.getAttribute("data-aos");
  if (!animate) return;
  const handleAnimation = ANIMATION_REGISTRY[animate];
  if (!handleAnimation) return;
  const options = parseAttributes(element);
  return handleAnimation(element, contextSafe, options);
}
function parseAttributes(element) {
  const options = __spreadValues({}, DEFAULT_OPTIONS);
  for (const key of Object.keys(AOS_ATTRIBUTE_MAP)) {
    const value = element.getAttribute(key);
    if (value) {
      const prop = AOS_ATTRIBUTE_MAP[key];
      switch (prop) {
        case "offset":
        case "delay":
        case "duration": {
          const numberValue = parseNumber(value);
          if (!Number.isNaN(numberValue)) {
            options[prop] = numberValue;
          }
          break;
        }
        case "easing": {
          const easing = parseEnum(easings, value);
          if (easing) {
            options[prop] = easing;
          }
          break;
        }
        case "once":
        case "mirror": {
          const booleanValue = parseBoolean(value);
          if (typeof booleanValue === "boolean") {
            options[prop] = booleanValue;
          }
          break;
        }
        case "anchorPlacement": {
          const anchorPlacement = parseEnum(anchorPlacements, value);
          if (anchorPlacement) {
            options[prop] = anchorPlacement;
          }
          break;
        }
      }
    }
  }
  return options;
}
function parseEnum(list, value) {
  return list.includes(value) ? value : void 0;
}
function parseBoolean(value) {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      break;
  }
}
function parseNumber(value) {
  return parseInt(value, 10);
}

// hooks/useAOSInitial.ts
import_gsap2.default.registerPlugin(import_react2.useGSAP);
var AOS_PROPS_KEYS = [
  "data-aos",
  "data-aos-offset",
  "data-aos-delay",
  "data-aos-duration",
  "data-aos-easing",
  "data-aos-mirror",
  "data-aos-once",
  "data-aos-anchor-placement"
];
function useAOSInitial() {
  const containerRef = (0, import_react.useRef)(null);
  const observerRef = (0, import_react.useRef)(null);
  const elementAnimations = (0, import_react.useRef)(
    /* @__PURE__ */ new WeakMap()
  );
  (0, import_react2.useGSAP)(
    (context, contextSafe) => {
      if (!containerRef.current || !contextSafe || !context) return;
      const addAnimation = (element) => {
        const animation = createAnimation(element, contextSafe);
        if (!animation) return;
        elementAnimations.current.set(element, animation);
      };
      const removeAnimation = (element) => {
        const animation = elementAnimations.current.get(element);
        if (!animation) return;
        animation.kill();
        elementAnimations.current.delete(element);
      };
      const initAOSForElements = (elements) => {
        for (const element of elements) {
          if (elementAnimations.current.has(element)) continue;
          addAnimation(element);
        }
      };
      const handleMutation = (mutations) => {
        var _a;
        const addedElements = [];
        const removedElements = [];
        for (const mutation of mutations) {
          switch (mutation.type) {
            case "attributes": {
              if (!((_a = mutation.attributeName) == null ? void 0 : _a.startsWith("data-aos"))) continue;
              if (!(mutation.target instanceof HTMLElement)) continue;
              const element = mutation.target;
              removeAnimation(element);
              addAnimation(element);
              break;
            }
            case "childList": {
              for (const node of mutation.addedNodes) {
                collectAOSNodes(node, addedElements);
              }
              for (const node of mutation.removedNodes) {
                collectAOSNodes(node, removedElements);
              }
              break;
            }
            default:
              break;
          }
        }
        for (const element of removedElements) {
          removeAnimation(element);
        }
        initAOSForElements(addedElements);
      };
      initAOSForElements(
        import_gsap2.default.utils.toArray("[data-aos]", containerRef.current)
      );
      observerRef.current = new MutationObserver(handleMutation);
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: AOS_PROPS_KEYS
      });
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    },
    { scope: containerRef, dependencies: [] }
  );
  return { containerRef };
}
function collectAOSNodes(node, result) {
  if (!(node instanceof HTMLElement)) return;
  if (node.matches("[data-aos]")) {
    result.push(node);
  }
  result.push(...node.querySelectorAll("[data-aos]"));
}

// utils/toAOSProps.ts
function toAOSProps(options) {
  const attrs = {
    "data-aos": options.animation,
    "data-aos-offset": toNumberAttr(options.offset),
    "data-aos-delay": toNumberAttr(options.delay),
    "data-aos-duration": toNumberAttr(options.duration),
    "data-aos-easing": validateEnumValue(easings, options.easing),
    "data-aos-mirror": toBooleanAttr(options.mirror),
    "data-aos-once": toBooleanAttr(options.once),
    "data-aos-anchor-placement": validateEnumValue(
      anchorPlacements,
      options.anchorPlacement
    )
  };
  return cleanAttrs(attrs);
}
function cleanAttrs(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function toBooleanAttr(value) {
  return typeof value === "boolean" ? String(value) : void 0;
}
function toNumberAttr(value) {
  return typeof value === "number" ? String(value) : void 0;
}
function validateEnumValue(list, value) {
  return list.includes(value) ? value : void 0;
}

// utils/refreshAOS.ts
var import_gsap3 = __toESM(require("gsap"));
var import_ScrollTrigger2 = require("gsap/ScrollTrigger");
import_gsap3.default.registerPlugin(import_ScrollTrigger2.ScrollTrigger);
function refreshAOS() {
  import_ScrollTrigger2.ScrollTrigger.refresh(true);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AOS_ATTRIBUTE_MAP,
  DEFAULT_OPTIONS,
  DISTANCE,
  anchorPlacements,
  animations,
  easings,
  refreshAOS,
  toAOSProps,
  useAOSInitial
});
