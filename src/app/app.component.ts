import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initMatrixEffect();
  }

  initMatrixEffect() {
    const canvas = document.getElementById('canv');
    //@ts-ignore
    canvas.width = window.innerWidth;
    //@ts-ignore

    canvas.height = window.innerHeight;
    //@ts-ignore

    const ctx = canvas.getContext('2d');
    let cols = Math.floor(window.innerWidth / 20) + 1;
    let ypos = Array(cols).fill(0);

    ctx.fillStyle = '#000';
    //@ts-ignore

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function matrix() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      //@ts-ignore

      if (canvas.width !== w) {
        //@ts-ignore

        canvas.width = w;
        cols = Math.floor(window.innerWidth / 20) + 1;
        ypos = Array(cols).fill(0);
      }
      //@ts-ignore

      if (canvas.height !== h) {
        //@ts-ignore

        canvas.height = h;
      }

      ctx.fillStyle = '#0001';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#0f0';
      ctx.font = '15pt monospace';

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });
    }

    setInterval(matrix, 50);
  }
}
