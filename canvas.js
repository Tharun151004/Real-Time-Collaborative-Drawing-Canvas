export class CanvasManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.isDrawing = false;
    this.strokeColor = "#000000";
    this.strokeWidth = 4;
    this.currentTool = "brush";
    this.undoStack = [];
    this.redoStack = [];

    this.resizeCanvas();
    this.attachEvents();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 50;
  }

  attachEvents() {
    this.canvas.addEventListener("mousedown", (e) => this.startDraw(e));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    window.addEventListener("mouseup", () => this.stopDraw());
  }

  startDraw(e) {
    this.isDrawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.offsetX, e.offsetY);
    this.undoStack.push(this.canvas.toDataURL());
  }

  draw(e) {
    if (!this.isDrawing) return;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = this.currentTool === "eraser" ? "#ffffff" : this.strokeColor;
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
  }

  stopDraw() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.ctx.closePath();
  }

  setColor(color) {
    this.strokeColor = color;
  }

  setWidth(width) {
    this.strokeWidth = width;
  }

  setTool(tool) {
    this.currentTool = tool;
  }

  undo() {
    if (this.undoStack.length === 0) return;
    const last = this.undoStack.pop();
    this.redoStack.push(this.canvas.toDataURL());
    this.restoreImage(last);
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const next = this.redoStack.pop();
    this.undoStack.push(this.canvas.toDataURL());
    this.restoreImage(next);
  }

  restoreImage(dataUrl) {
    const img = new Image();
    img.onload = () => this.ctx.drawImage(img, 0, 0);
    img.src = dataUrl;
  }
}
