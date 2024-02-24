import styles from "./CanvasComp.module.css";
import { useRef, useEffect, useCallback } from "react";
import { SnowGroup } from "./thema/winter/WinterThema";
import { SpringThema } from "./thema/spring/SpringThema";

function CanvasComp() {
  const canvasRef = useRef();
  const contextRef = useRef();

  const draw = useCallback((thema) => {
    thema.draw();
  });

  const animation = useCallback(() => {
    if (!canvasRef.current) return;
    // const thema = new SnowGroup(36, canvasRef.current, contextRef.current);
    const thema = new SpringThema(12, canvasRef.current, contextRef.current);
    thema.init();
    draw(thema);
  });

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d");
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
}

export default CanvasComp;
