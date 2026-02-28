# react-gsap-aos

在 React 上使用 GSAP 實現滾動動畫，適用於 Next.js 專案。

動畫樣式參考 [AOS](https://github.com/michalsnik/aos)

## 安裝依賴

> 該專案目前還沒上架到 npm

```bash
pnpm install gsap @gsap/react
```

- [GSAP 官方文件](https://gsap.com/docs/v3/Installation)
- [GSAP React 指南](https://gsap.com/resources/React)

## 執行範例專案

```bash
pnpm dev
```

## 核心概念

- `useAOSInitial`：綁定動畫容器，管理動畫初始化與卸載。
- `data-aos`：指定動畫效果。
- `data-aos-*`：指定動畫的其他參數。
- `data-aos-container`：標記動畫容器，解決 Y 軸動畫觸發點偏差問題。
- `toAOSProps`：輔助函式，生成合法的 AOS props。

> ⚠️ 建議：不要在 `app/layout.tsx` 全域綁定動畫，每個頁面單獨綁定，才能自動卸載動畫。

## 使用方式

### 基本用法

```tsx
"use client";

import { useAOSInitial } from "@/aos";

export default function Demo() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();
  return (
    <div ref={containerRef} className="overflow-hidden">
      // ✅ 使用標記 data-aos-container 的容器
      <div data-aos-container>
        <div data-aos="fade-up" data-aos-offset="200">
          Hello AOS
        </div>
      </div>
      // ❌ 外層沒有使用 data-aos-container 的容器
      <div data-aos="fade-up" data-aos-offset="200">
        Hello AOS
      </div>
    </div>
  );
}
```

### 使用 `data-aos` 屬性

```tsx
<div
  data-aos="fade"
  data-aos-offset="120"
  data-aos-delay="0"
  data-aos-duration="400"
  data-aos-easing="none"
  data-aos-mirror="false"
  data-aos-once="false"
  data-aos-anchor-placement="top-bottom"
>
  Hello AOS
</div>
```

### 使用 `toAOSProps`

```tsx
"use client";

import { toAOSProps } from "@/aos";

export default function Demo() {
  return (
    <div
      {...toAOSProps({
        animation: "fade",
        offset: 120,
        delay: 0,
        duration: 400,
        easing: "none",
        once: false,
        mirror: false,
        anchorPlacement: "top-bottom",
      })}
    >
      Hello AOS
    </div>
  );
}
```

> `toAOSProps` 會過濾無效屬性，幫助你快速生成正確的 AOS 屬性。

### 動態切換動畫

直接更改 `data-aos` 會出現問題：

```tsx
const [animation, setAnimation] = useState("fade-up");

<div data-aos-container>
  <div data-aos={animation}></div>
</div>;
```

解決方案：使用 `key` 強制 React 重新創建元素：

```tsx
const [animation, setAnimation] = useState("fade-up");

<div key={animation} data-aos-container>
  <div data-aos={animation}></div>
</div>;
```

> 這是因為 react-gsap-aos 只監聽節點變化來卸載或加載動畫，必須重新創建節點才能生效。

### 佈局變化

當頁面佈局改變時（例如元素位置改變、視窗尺寸調整），動畫元素可能還停留在舊的位置。  
GSAP 預設會在視窗尺寸變化時自動更新動畫位置，詳細說明可參考 [GSAP ScrollTrigger refresh()](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()>)。

如果你使用 JavaScript 或其他操作動態改變了 DOM，這些變動 **不會自動觸發刷新**，需要手動調用刷新函式：

```tsx
import { refreshAOS } from "@/aos";

refreshAOS();
```

`refreshAOS()` 內部封裝了 `ScrollTrigger.refresh(true)`，在大部分情況下可以安全刷新動畫位置。

## API

### 屬性選項

| 名稱            | 型別                       | 對應 `data-aos`             | 預設值         | 說明                           |
| --------------- | -------------------------- | --------------------------- | -------------- | ------------------------------ |
| animation       | [`AOSAnimation`](#動畫)    | `data-aos`                  | `undefined`    | 動畫類型                       |
| offset          | `number`                   | `data-aos-offset`           | `120`          | 提前觸發動畫的距離 (px)        |
| delay           | `number`                   | `data-aos-delay`            | `0`            | 動畫延遲時間 (ms)              |
| duration        | `number`                   | `data-aos-duration`         | `400`          | 動畫持續時間 (ms)              |
| easing          | [`Easing`](#緩動曲線)      | `data-aos-easing`           | `"none"`       | 緩動曲線                       |
| once            | `boolean`                  | `data-aos-once`             | `false`        | 是否只執行一次                 |
| mirror          | `boolean`                  | `data-aos-mirror`           | `false`        | 滾動過元素後，動畫是否反向播放 |
| anchorPlacement | [`AnchorPlacement`](#錨點) | `data-aos-anchor-placement` | `"top-bottom"` | 元素在視窗的指定位置觸發動畫   |

### 動畫

- fade 動畫
  - fade
  - fade-up
  - fade-down
  - fade-left
  - fade-right
  - fade-up-right
  - fade-up-left
  - fade-down-right
  - fade-down-left
- flip 動畫
  - flip-up
  - flip-down
  - flip-left
  - flip-right
- slide 動畫
  - slide-up
  - slide-down
  - slide-left
  - slide-right
- zoom 動畫
  - zoom-in
  - zoom-in-up
  - zoom-in-down
  - zoom-in-left
  - zoom-in-right
  - zoom-out
  - zoom-out-up
  - zoom-out-down
  - zoom-out-left
  - zoom-out-right

### 緩動曲線

- none
- power1
- power1.in
- power1.out
- power1.inOut
- power2
- power2.in
- power2.out
- power2.inOut
- power3
- power3.in
- power3.out
- power3.inOut
- power4
- power4.in
- power4.out
- power4.inOut
- back
- back.in
- back.out
- back.inOut
- bounce
- bounce.in
- bounce.out
- bounce.inOut
- circ
- circ.in
- circ.out
- circ.inOut
- elastic
- elastic.in
- elastic.out
- elastic.inOut
- expo
- expo.in
- expo.out
- expo.inOut
- sine
- sine.in
- sine.out
- sine.inOu

## 錨點

- top-bottom
- top-center
- top-top
- center-bottom
- center-center
- center-top
- bottom-bottom
- bottom-center
- bottom-top
