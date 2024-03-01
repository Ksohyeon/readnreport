import React from "react";
import styles from "./CanvasComp.module.css";
import { useRef, useEffect, useCallback } from "react";
import { SnowGroup } from "./thema/winter/WinterThema";
import { SpringThema } from "./thema/spring/SpringThema";

type Thema = SnowGroup | SpringThema;

const CanvasComp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback((thema: Thema) => {
    thema.draw();
  }, []);

  const animation = useCallback(() => {
    if (!canvasRef.current) return;
    // const thema = new SnowGroup(36, canvasRef.current, contextRef.current);
    const thema = new SpringThema(12, canvasRef.current);
    thema.init();
    draw(thema);
  }, []);

  useEffect(() => {
    animation();
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
