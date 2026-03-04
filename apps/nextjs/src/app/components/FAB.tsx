"use client";

import { memo } from "react";

export default memo(function FAB() {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="btn-circle btn btn-lg fixed right-4 bottom-4"
    >
      ↑
    </button>
  );
});
