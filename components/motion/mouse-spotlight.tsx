"use client";

import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    function handleMouseMove({ clientX, clientY }: MouseEvent) {
      mouseX.set(clientX);
      mouseY.set(clientY);
    }

    // Set initial position out of view to avoid flash in top-left
    mouseX.set(-1000);
    mouseY.set(-1000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`
    radial-gradient(
      800px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 98, 0, 0.04),
      transparent 80%
    )
  `;

  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen mix-blend-screen"
      style={{ background }}
    />
  );
}
