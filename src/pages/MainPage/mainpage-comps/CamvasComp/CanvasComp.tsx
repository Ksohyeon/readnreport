import React from "react";
import styles from "./CanvasComp.module.css";
import { useRef, useEffect, useCallback } from "react";
import { SpringThema } from "./thema/spring/SpringThema";

const CanvasComp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef(null);

  const animation = useCallback(() => {
    if (!canvasRef.current) return;
    const thema = new SpringThema(12, canvasRef.current);
    thema.init();
    animationRef.current = thema.draw();
  }, []);

  useEffect(() => {
    animation();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  });

  return (
    <>
      <canvas
        width={window.innerWidth}
        height={(window.innerHeight / 3) * 2}
        ref={canvasRef}
        className={styles["canvas"]}
      ></canvas>
    </>
  );
};

export default CanvasComp;
