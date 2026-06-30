import { useCallback, useEffect, useRef } from "react";

const LERP = 0.14;
const DESKTOP_MIN_WIDTH = 900;

/**
 * Drives the cursor-following project preview.
 *
 * - A rAF loop lerps the panel toward the pointer.
 * - `registerImg` collects the stacked placeholder layers (one per project).
 * - `onRowEnter(i)` reveals the matching layer and shows the panel (desktop only).
 * - `onRowLeave()` hides the panel.
 *
 * All transient state lives in refs so pointer movement never triggers a
 * React re-render.
 */
export function useCursorPreview() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const registerImg = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      imgRefs.current[i] = el;
    },
    [],
  );

  const onRowEnter = useCallback((i: number) => {
    imgRefs.current.forEach((im, idx) => {
      if (im) im.style.opacity = idx === i ? "1" : "0";
    });
    if (panelRef.current && window.innerWidth > DESKTOP_MIN_WIDTH) {
      panelRef.current.style.opacity = "1";
    }
  }, []);

  const onRowLeave = useCallback(() => {
    if (panelRef.current) panelRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    target.current = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.5 };
    current.current = { ...target.current };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      if (panelRef.current) {
        panelRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { panelRef, registerImg, onRowEnter, onRowLeave };
}
