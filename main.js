import { CanvasManager } from "./canvas.js";

const canvas = document.getElementById("drawingCanvas");
const colorPicker = document.getElementById("colorPicker");
const widthSlider = document.getElementById("strokeWidth");
const brushBtn = document.getElementById("brushBtn");
const eraserBtn = document.getElementById("eraserBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");

const canvasManager = new CanvasManager(canvas);

colorPicker.addEventListener("input", (e) => canvasManager.setColor(e.target.value));
widthSlider.addEventListener("input", (e) => canvasManager.setWidth(e.target.value));
brushBtn.addEventListener("click", () => canvasManager.setTool("brush"));
eraserBtn.addEventListener("click", () => canvasManager.setTool("eraser"));
undoBtn.addEventListener("click", () => canvasManager.undo());
redoBtn.addEventListener("click", () => canvasManager.redo());
