"use client";

import { useEffect } from "react";

export function CopyEnhancer() {
  useEffect(() => {
    async function handleClick(event: MouseEvent) {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-copy]");
      if (!button) return;

      const source = document.getElementById(button.dataset.copy ?? "");
      const text = source?.innerText.trim() ?? "";
      if (!text) return;

      const original = button.textContent ?? "複製";

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "已複製";
        window.setTimeout(() => {
          button.textContent = original;
        }, 1400);
      } catch {
        button.textContent = "複製失敗";
        window.setTimeout(() => {
          button.textContent = original;
        }, 1800);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
