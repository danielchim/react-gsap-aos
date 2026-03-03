# react-gsap-aos

輕量的 GSAP + ScrollTrigger 整合，用法類似 AOS，專為 React / Next.js 設計。

動畫樣式參考： https://github.com/michalsnik/aos

## 快速安裝

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

1. Next.js / SSR 請在頂層加入 `"use client"`
2. 在需要動畫的頁面或元件中呼叫 `useAOSInitial`，並將回傳的 `containerRef` 綁定到最外層容器。

> ⚠️ 不建議在 `app/layout.tsx` 綁定動畫，因為 GSAP 應在頁面卸載時正確清理；建議在每個頁面的區塊綁定。

> `"overflow-hidden"` 樣式是解決動畫元素起始階段溢出問題。

```tsx
"use client";

import { useAOSInitial } from "react-gsap-aos";

export default function Demo() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* 動畫區塊 */}
    </div>
  );
}
```

`useAOSInitial` 只會監聽並影響綁定元素下的所有標記為動畫的子元素，要注意的是不要嵌套使用 `useAOSInitial`：

```tsx
function Demo() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* ❌ 不要嵌套使用 useAOSInitial */}
      <Box />
    </div>
  );
}

function Box() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* 動畫區塊 */}
    </div>
  );
}
```

如果有區塊需求可以並行使用：

```tsx
function Demo() {
  return (
    <div>
      {/* ✅ 並行使用互不影響 */}
      <Box />
      <Box2 />
    </div>
  );
}

function Box() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* 動畫區塊 */}
    </div>
  );
}

function Box2() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* 動畫區塊 */}
    </div>
  );
}
```

## 區塊預設值

若要在區塊層級覆蓋預設設定，可傳入選項：

```tsx
const { containerRef } = useAOSInitial<HTMLDivElement>({
  easing: "bounce",
  duration: 300,
});
```

> 此設定只會應用於該容器中新產生的動畫元素，不建議頻繁動態變更此項設定。

## 容器定位 data-aos-container

為了避免 ScrollTrigger 計算偏移時造成觸發點不正確，請在需要的父容器上加上 `data-aos-container`：

```tsx
return (
  <div ref={containerRef} className="overflow-hidden">
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
  </div>
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

## 使用`data-aos`屬性

直接在元素上使用 `data-aos` 與相關屬性。

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

## 使用 `toAOSProps` 函式

取得經過型別檢查與過濾的屬性物件。

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

## 刷新動畫位置

若動態修改 DOM（插入/移除元素或修改佈局），請手動呼叫：

```ts
import { refreshAOS } from "react-gsap-aos";

refreshAOS();
```

`refreshAOS()` 會封裝 `ScrollTrigger.refresh(true)`，在大多數情況下可安全使用。

詳細說明可參考 [GSAP ScrollTrigger refresh()](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()>)

### 動態 DOM 範例

以下範例示範在動態新增列表項目時，如何呼叫 `refreshAOS()` ：

```tsx
"use client";

import { useState, useEffect } from "react";
import { useAOSInitial, refreshAOS } from "react-gsap-aos";

export default function DynamicList() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();
  const [show, setShow] = useState(boolean);

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
- sine.inOu

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
