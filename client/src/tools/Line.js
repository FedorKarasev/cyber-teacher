import Tool from './Tool';

export default class Line extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    if (e.button === 0) {
      this.mouseDown = true;
      this.ctx.beginPath();
      this.startX = e.pageX - e.target.offsetLeft;
      this.startY = e.pageY - e.target.offsetTop;
      this.saved = this.canvas.toDataURL();
    }
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const currentX = e.pageX - e.target.offsetLeft;
      const currentY = e.pageY - e.target.offsetTop;
      this.draw(this.startX, this.startY, currentX, currentY);
    }
  }

  draw(x, y, currentX, currentY) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(currentX, currentY);
      this.ctx.stroke();
    };
  }
}
