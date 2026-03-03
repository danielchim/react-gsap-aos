import { anchorPlacements, DEFAULT_OPTIONS, easings } from "../constants";

import type { AnimationOptions } from "@/types";

/** 跟預設值合併動畫選項 */
export default function mergeOptions(
  ...array: (Partial<AnimationOptions> | undefined | null)[]
): AnimationOptions {
  const result = { ...DEFAULT_OPTIONS };

  for (const options of array) {
    if (!options) continue;

    for (const key of Object.keys(options) as (keyof AnimationOptions)[]) {
      switch (key) {
        case "offset":
        case "delay":
        case "duration": {
          const value = options[key];
          if (
            typeof value === "number" &&
            !Number.isNaN(value) &&
            !Number.isFinite(value)
          ) {
            result[key] = value;
          }
          break;
        }
        case "easing": {
          const value = options[key];
          if (verifyEnum(easings, value)) {
            result[key] = value;
          }
          break;
        }
        case "once":
        case "mirror": {
          const value = options[key];
          if (typeof value === "boolean") {
            result[key] = value;
          }
          break;
        }
        case "anchorPlacement": {
          const value = options[key];
          if (verifyEnum(anchorPlacements, value)) {
            result[key] = value;
          }
          break;
        }
        default:
          break;
      }
    }
  }

  return result;
}

function verifyEnum<T>(list: readonly T[], value: unknown): value is T {
  return Boolean(value && list.includes(value as T));
}
