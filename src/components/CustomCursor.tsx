"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursorDot = document.getElementById("custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorDot) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        cursorDot?.classList.add("hovering");
      } else {
        cursorDot?.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return <div className="custom-cursor hidden md:block" id="custom-cursor"></div>;
}
