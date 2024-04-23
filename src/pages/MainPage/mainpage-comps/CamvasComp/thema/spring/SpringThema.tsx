function degreeToRadi(degree: number): number {
  return (degree / 180) * Math.PI;
}

export class Petal {
  x: number;
  y: number;
  l: number;
  n: number;
  points: number[][];
  constructor(x: number, y: number, l: number, n: number) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.n = n;
    this.points = [];
  }

  init() {
    this.update(this.x, this.y, 0);
  }

  update(x: number, y: number, degree: number) {
    this.points[0] = [
      x + (Math.sin(degreeToRadi(72 * this.n + 36 + degree)) * this.l) / 3,
      y - (Math.cos(degreeToRadi(72 * this.n + 36 + degree)) * this.l) / 3,
    ];
    this.points[1] = [
      x + (Math.sin(degreeToRadi(72 * this.n + 36 + degree)) * this.l) / 1.3,
      y - (Math.cos(degreeToRadi(72 * this.n + 36 + degree)) * this.l) / 1.3,
    ];
    this.points[2] = [
      x + Math.sin(degreeToRadi(72 * this.n + degree)) * this.l,
      y - Math.cos(degreeToRadi(72 * this.n + degree)) * this.l,
    ];
    this.points[3] = [
      x + (Math.sin(degreeToRadi(72 * this.n + -36 + degree)) * this.l) / 1.3,
      y - (Math.cos(degreeToRadi(72 * this.n + -36 + degree)) * this.l) / 1.3,
    ];
    this.points[4] = [
      x + (Math.sin(degreeToRadi(72 * this.n + -36 + degree)) * this.l) / 3,
      y - (Math.cos(degreeToRadi(72 * this.n + -36 + degree)) * this.l) / 3,
    ];
  }
}

export class Flower {
  x: number;
  y: number;
  h: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  degree: number;
  speed: number;
  dir: number;
  petals: Petal[];
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.h = Math.random() * 10 + 25;
    if (window.innerWidth <= 600) this.h /= 5 / 3;
    this.x2 = this.x;
    this.y2 = this.y - this.h;
    this.x3 = this.x;
    this.y3 = this.y - this.h * 2;
    this.degree = 0;
    this.speed = 0.25;
    this.dir = 1; // 1: right, -1: left
    this.petals = [];
  }

  init() {
    for (let i = 0; i < 5; i++) {
      this.petals[i] = new Petal(this.x3, this.y3, this.h, i);
      this.petals[i].init();
    }
  }

  update() {
    this.degree += this.speed * this.dir;
    if (Math.abs(this.degree) === 35) this.dir *= -1;

    this.x2 = this.x + Math.sin(degreeToRadi(this.degree) * 0.5) * this.h;
    this.y2 = this.y - Math.cos(degreeToRadi(this.degree) * 0.5) * this.h;
    this.x3 = this.x + Math.sin(degreeToRadi(this.degree)) * this.h * 2;
    this.y3 = this.y - Math.cos(degreeToRadi(this.degree)) * this.h * 2;
    for (let i = 0; i < 5; i++) {
      this.petals[i].update(this.x3, this.y3, this.degree);
    }
  }
}

export class SpringThema {
  canvas: HTMLCanvasElement;
  totalFlower: number;
  flowerGap: number;
  flowers: Flower[];
  constructor(totalFlower: number, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.totalFlower = totalFlower;
    this.flowerGap = canvas.width / (totalFlower + 1);
    this.flowers = [];
  }

  init() {
    for (let i = 0; i < this.totalFlower; i++) {
      this.flowers[i] = new Flower(
        this.flowerGap * (i + 1),
        this.canvas.height
      );
      this.flowers[i].init();
    }
  }

  draw(): any {
    const context = this.canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      context.lineWidth = 4;

      for (let i = 0; i < this.totalFlower; i++) {
        const flower = this.flowers[i];
        flower.update();
        context.beginPath();
        context.strokeStyle = "#527a3c";
        context.moveTo(flower.x, flower.y);
        context.quadraticCurveTo(flower.x2, flower.y2, flower.x3, flower.y3);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.moveTo(flower.x3, flower.y3);
        context.fillStyle = "#ffcf67";

        for (let j = 0; j < flower.petals.length; j++) {
          const petal = flower.petals[j];
          context.lineTo(petal.points[0][0], petal.points[0][1]);
          context.quadraticCurveTo(
            petal.points[1][0],
            petal.points[1][1],
            petal.points[2][0],
            petal.points[2][1]
          );
          context.quadraticCurveTo(
            petal.points[3][0],
            petal.points[3][1],
            petal.points[4][0],
            petal.points[4][1]
          );
          context.lineTo(flower.x3, flower.y3);
          context.fill();
        }
      }
    }

    return requestAnimationFrame(this.draw.bind(this));
  }
}
