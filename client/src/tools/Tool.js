export default class Tool {
  constructor(canvas, socket, sessionId) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.destroyEvents();
    this.socket = socket;
    this.sessionId = sessionId;
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
