export class Snow {
  r: number;
  x: number;
  y: number;
  fieldX: number;
  maxY: number;
  dx: number;
  dy: number;
  constructor(x: number, y: number, dir: number, maxY: number) {
    this.r = Math.random() * 7 + 3;
    this.x = x;
    this.y = y;
    this.fieldX = x;
    this.maxY = maxY;
    this.dx = (Math.random() / 2) * dir;
    this.dy = Math.random() / 2 + 0.3;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.y > this.maxY) {
      this.x = this.fieldX;
      this.y = 0;
    }
  }
}

export class SnowGroup {
  canvas: HTMLCanvasElement;
  totalSnows: number;
  snowGap: number;
  snows: Snow[];
  constructor(totalSnows: number, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.totalSnows = totalSnows;
    this.snowGap = document.body.clientWidth / totalSnows - 1;
    this.snows = [];
  }

  init() {
    for (let i = 0; i < this.totalSnows; i++) {
      this.snows[i] = new Snow(
        i * this.snowGap,
        Math.random() * this.canvas.width,
        i % 2 == 0 ? 1 : -1,
        this.canvas.height
      );
    }
  }

  draw() {
    const context = this.canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < this.totalSnows; i++) {
        this.snows[i].update();
        context.beginPath();
        context.fillStyle = "rgba(255,255,255,1)";
        context.arc(
          this.snows[i].x,
          this.snows[i].y,
          this.snows[i].r,
          0,
          Math.PI * 2
        );
        context.fill();
        context.closePath();
      }
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}
