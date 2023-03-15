export default class Tool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.destroyEvents();
  }

  destroyEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
  }

  fillColor(color) {
    this.ctx.fillStyle = color;
  }

  strokeColor(color) {
    this.ctx.strokeStyle = color;
  }

  lineWidth(width) {
    this.ctx.lineWidth = width;
  }
}
