# react-gsap-aos

輕量的 GSAP + ScrollTrigger 整合，用法類似 AOS，專為 React / Next.js 設計。

動畫樣式參考： [AOS](https://github.com/michalsnik/aos)

## 功能

- 基於 GSAP + ScrollTrigger 的捲動觸發動畫
- API 模仿 AOS，易於 React / Next.js 使用
- 支援 data-aos 屬性與函式轉換
- 可在多個區塊平行使用，避免互相干擾
- TypeScript 完整支援，包含動畫/緩動/錨點型別
- 輕量且 SSR 友善，具備卸載清理機制

## 安裝

```bash
pnpm install react-gsap-aos gsap @gsap/react
```

參考：

- [gsap](https://greensock.com/gsap)
- [@gsap/react](https://greensock.com/scrolltrigger)

### 版本需求

- react >= 17
- gsap ^3.12.5
- @gsap/react ^2.1.2

## 快速開始

```tsx
import { AOSProvider } from "react-gsap-aos/client";

export default function Demo() {
  return (
    <AOSProvider className="overflow-hidden">
      <div data-aos-container>
        <div data-aos="fade-up" data-aos-offset="200">
          Hello AOS
        </div>
      </div>
    </AOSProvider>
  );
}
```

## 用法

### 設置 `AOSProvider`

只要把 `AOSProvider` 包覆在需要動畫的區塊外層，
元件內的所有子元素就會自動被監聽與啟動動畫。

> `"overflow-hidden"` 樣式是解決動畫元素起始階段溢出問題。

```tsx
import { AOSProvider } from "react-gsap-aos/client";

export default function Demo() {
  return (
    <AOSProvider className="overflow-hidden">{/* 動畫區塊 */}</AOSProvider>
  );
}
```

> ⚠️ 不要巢狀使用 `AOSProvider`，會造成重複監聽與多餘動畫。

```tsx
import { AOSProvider } from "react-gsap-aos/client";

export default function Demo() {
  return (
    <AOSProvider>
      {/* ❌ 會導致重複監聽元素以及創建動畫 */}
      <AOSProvider />
    </AOSProvider>
  );
}
```

`AOSProvider` 是呼叫 `useAOSScope` hook 的包裝元件，大部分情況下使用此組件即可；

如果你需要更細緻的控制，可以改用 [`useAOSScope`](#useaosscope)。

此外該組件提供了兩個屬性供調整：

- `component`：渲染的容器元素，預設為 `'div'`。
- `options`：與 `toAOSProps` 同樣結構的默認動畫參數，會應用於該範圍內的所有新動畫元素。

```tsx
<AOSProvider
  component="section"
  options={{
    animation: "fade",
    offset: 120,
    delay: 0,
    duration: 400,
    easing: "none",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  }}
></AOSProvider>
```

### 使用 data attributes 設定動畫

透過帶有 `data-aos-*` 開頭的屬性來調整行為

```tsx
<div
  data-aos="fade"
  data-aos-offset={120}
  data-aos-delay={0}
  data-aos-duration={400}
  data-aos-easing="none"
  data-aos-mirror={false}
  data-aos-once={false}
  data-aos-anchor-placement="top-bottom"
>
  Hello AOS
</div>
```

### 使用 `toAOSProps` 設定動畫

該函式提供完整型別且會過濾無效的屬性值後轉換成 data attributes

```tsx
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
```

### 容器定位 data-aos-container

為了避免 ScrollTrigger 計算偏移時造成觸發點不正確，請在需要的父容器加上 `data-aos-container`：

```tsx
return (
  <AOSProvider className="overflow-hidden">
    {/* ✅ 指定定位容器 */}
    <div data-aos-container>
      <div data-aos="fade-up" data-aos-offset="200">
        Hello AOS
      </div>
    </div>

    {/* ❌ 未指定容器，可能導致觸發點偏移 */}
    <div data-aos="fade-up" data-aos-offset="200">
      Hello AOS
    </div>
  </AOSProvider>
);
```

`react-gsap-aos` 會先往上尋找帶有 `data-aos-container` 的最近父容器，若找不到則使用動畫元素本身作為錨點。

支援嵌套容器：

```tsx
<div data-aos-container>
  <div data-aos="fade-up" data-aos-offset="200">
    Hello AOS
  </div>
  <div data-aos-container>
    <div data-aos="fade-up" data-aos-offset="200">
      Nested AOS
    </div>
  </div>
</div>
```

## API

### `useAOSScope`

這個 hook 是整個套件的核心，負責監聽子元素 `data-aos-*` 屬性來創建、修改動畫並且會在離開頁面時卸載動畫，`AOSProvider` 是它的輕量包裝元件，通常你只需使用 `AOSProvider`。

若你想在函式元件中直接掌握 container ref，就可以直接使用此 hook。

1. Next.js / SSR 專案在使用此 hook 的檔案最上方加上 `"use client"`。
2. 呼叫後把回傳的 `containerRef` 綁定到最外層容器。

> ⚠️ 建議綁定在頁面或元件的區塊層級，不要放在 `app/layout.tsx`，以便 GSAP 在組件卸載時能正確清理。

```tsx
"use client";

import { useAOSScope } from "react-gsap-aos/client";

export default function Demo() {
  const { containerRef } = useAOSScope<HTMLDivElement>();

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* 動畫區塊 */}
    </div>
  );
}
```

不要巢狀呼叫 `useAOSScope`，但是你可以像下面這樣平行使用。

```tsx
function Demo() {
  return (
    <div>
      {/* ✅ 平行使用互不干涉 */}
      <Box />
      <Box2 />
    </div>
  );
}

function Box() {
  const { containerRef } = useAOSScope<HTMLDivElement>();
  return (
    <div ref={containerRef} className="overflow-hidden">
      …
    </div>
  );
}

function Box2() {
  const { containerRef } = useAOSScope<HTMLDivElement>();
  return (
    <div ref={containerRef} className="overflow-hidden">
      …
    </div>
  );
}
```

若要在區塊層級覆蓋預設設定，可傳入選項：

```tsx
const { containerRef } = useAOSScope<HTMLDivElement>({
  easing: "bounce",
  duration: 300,
});
```

> 此設定只會應用於該容器中新產生的動畫元素，不建議頻繁動態變更此項設定。

## 刷新動畫位置

若動態修改 DOM（插入/移除元素或修改佈局），請手動呼叫：

```ts
"use client";

import { refreshAOS } from "react-gsap-aos";

refreshAOS();
```

`refreshAOS()` 會封裝 `ScrollTrigger.refresh(true)`，在大多數情況下可安全使用。

詳細說明可參考 [GSAP ScrollTrigger refresh()](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()>)

### 動態 DOM 範例

以下範例示範在動態增減元素導致佈局變動時，如何呼叫 `refreshAOS()` ：

```tsx
"use client";

import { useState, useEffect } from "react";
import { useAOSScope, refreshAOS } from "react-gsap-aos";

export default function DynamicList() {
  const { containerRef } = useAOSScope<HTMLDivElement>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 當 show 變動時，刷新 ScrollTrigger
    refreshAOS();
  }, [show]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <button type="button" onClick={() => setShow((e) => !e)}>
        switch
      </button>
      {show ? <div className="h-80" /> : null}
      <div data-aos-container>
        <div data-aos="fade-up">Hello AOS</div>
      </div>
    </div>
  );
}
```

## 型別與選項

### 屬性選項

| 名稱            | 型別              | 對應 `data-aos`             | 預設           | 說明                     |
| --------------- | ----------------- | --------------------------- | -------------- | ------------------------ |
| animation       | `Animation`       | `data-aos`                  | `undefined`    | 動畫類型                 |
| offset          | `number`          | `data-aos-offset`           | `120`          | 提前觸發動畫的距離（px） |
| delay           | `number`          | `data-aos-delay`            | `0`            | 動畫延遲（ms）           |
| duration        | `number`          | `data-aos-duration`         | `400`          | 動畫持續時間（ms）       |
| easing          | `Easing`          | `data-aos-easing`           | `"none"`       | 緩動曲線                 |
| once            | `boolean`         | `data-aos-once`             | `false`        | 是否只執行一次           |
| mirror          | `boolean`         | `data-aos-mirror`           | `false`        | 是否於離開時反向播放     |
| anchorPlacement | `AnchorPlacement` | `data-aos-anchor-placement` | `"top-bottom"` | 觸發位置設定             |

### Animation

- fade
- fade-up
- fade-down
- fade-left
- fade-right
- fade-up-right
- fade-up-left
- fade-down-right
- fade-down-left
- flip-up
- flip-down
- flip-left
- flip-right
- slide-up
- slide-down
- slide-left
- slide-right
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

### Easing

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
- sine.inOut

## AnchorPlacement

- top-bottom
- top-center
- top-top
- center-bottom
- center-center
- center-top
- bottom-bottom
- bottom-center
- bottom-top
