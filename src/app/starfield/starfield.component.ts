import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starfield',
  templateUrl: './starfield.component.html',
  styleUrls: ['./starfield.component.sass']
})
export class StarfieldComponent implements OnInit {

  constructor() { }
  w: number = 0;
  h: number = 0;
  canvas: HTMLCanvasElement =  document.createElement('canvas'); 
  ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  stars = this.makeStars(1000);

  ngOnInit(): void {
    const c = document.getElementById("canvas");
    if (c)
    {
      this.canvas = c as HTMLCanvasElement;
      this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    this.setCanvasExtents();
    requestAnimationFrame(this.init);

    window.onresize = () => {
      this.setCanvasExtents();
    };
  
  }

  setCanvasExtents(){
    this.w = document.body.clientWidth;
    this.h = document.body.clientHeight;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  };

  makeStars(count: number){
    const out = [];
    for (let i = 0; i < count; i++) {
      const s = {
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000
      };
      out.push(s);
    }
    return out;
  };

  clear(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  putPixel(x:number, y:number, brightness: number){
    const intensity = brightness * 255;
    const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
    this.ctx.fillStyle = rgb;
    this.ctx.fillRect(x, y, 1, 1);
  };

  prevTime: number = Date.now();
  init = (time: number) => {
    this.prevTime = time;
    requestAnimationFrame(this.tick);
  };

  tick = (time: number) => {
    let elapsed = time - this.prevTime;
    this.prevTime = time;
    
    const distance = elapsed * 0.1;

    this.clear();

    const cx = this.w / 2;
    const cy = this.h / 2;

    const count = this.stars.length;
    for (var i = 0; i < count; i++) {
      const star = this.stars[i];
      star.z -= distance;
      while (star.z <= 1) {
        star.z += 1000;
      }

      const x = cx + star.x / (star.z * 0.001);
      const y = cy + star.y / (star.z * 0.001);

      if (x < 0 || x >= this.w || y < 0 || y >= this.h) {
        continue;
      }

      const d = star.z / 1000.0;
      const b = 1 - d * d;

      this.putPixel(x, y, b);
    }

    requestAnimationFrame(this.tick);
  };

}
