import Tool from './Tool';

export default class Brush extends Tool {
  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.sessionId,
        figure: {
          type: 'finish',
        },
      })
    );
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX, e.pageY);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      // this.draw(e.pageX, e.pageY);
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.sessionId,
          figure: {
            type: 'brush',
            x: e.pageX,
            y: e.pageY,
          },
        })
      );
    }
  }

  static draw(ctx, x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
