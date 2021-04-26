export default class Canvas {
  constructor(getCanvas, {width, height}) {
    this._width = width;
    this._height = height;
    this._intervalsX = 0;
    this._intervalsY = 0;
    this._step = 0;
    this._minimum = 0;
    this._arrayOfIntevals = [];
    this._ctx = getCanvas.getContext('2d');
    this._arrayOfIntervals = [];
    this._intervalX = 0;
    this._intervalY = 0;
    this._startValueY = 0;
    this._arrayData = [];
    this._objLength = 0;
  }

  _drawAxes() {
    this._ctx.beginPath();
    this._ctx.lineWidth = 2;
    this._ctx.fillStyle = "#000000";
    this._ctx.font = "18px  Roboto, Arial, sans-serif";
    this._ctx.moveTo(50, 50);
    this._ctx.lineTo(50, this._height - 50);
    this._ctx.lineTo(this._width - 50, this._height - 50);
    this._ctx.stroke();
    // Стрелка для вертикальной оси
    this._ctx.moveTo(45, 55);
    this._ctx.lineTo(50, 50);
    this._ctx.lineTo(55, 55);
    this._ctx.stroke();
    // Стрелка для горизонтальной оси
    this._ctx.moveTo(this._width - 55, this._height - 55);
    this._ctx.lineTo(this._width - 50, this._height - 50);
    this._ctx.lineTo(this._width - 55, this._height - 45);
    this._ctx.stroke();
    this._drawVerticalDashesAndSignatures();
    this._drawHorizontalDashesAndSignatures();
    this._ctx.closePath();
    this. _drawGrid();
  }

  _drawVerticalDashesAndSignatures() {
    for (let i=1; i<=this._intervalsX - 1; i++){
      this._ctx.moveTo(50 + this._intervalX * i, this._height - 60);
      this._ctx.lineTo(50 + this._intervalX * i, this._height - 40);
      this._ctx.textAlign = "center"; // выровнять текст по середине от точки рисования
      if (i % 2 > 0) {
        this._ctx.fillText(this._arrayOfIntervals[i-1], 50 + this._intervalX * (i-1) + (this._intervalX / 2), this._height - 20);
      }
      this._ctx.stroke();
    }
  }

  _drawHorizontalDashesAndSignatures() {
    for (let i=1; i<this._intervalsY; i++){
      this._ctx.moveTo(40, 450 - this._intervalY * i);
      this._ctx.lineTo(60, 450 - this._intervalY * i);
      this._ctx.textAlign = "right"; // выровнять текст по середине от точки рисования
      this._ctx.fillText(String(this._makeRounding(this._startValueY  * i)), 35, 456 - this._intervalY * i);
    }
    this._ctx.stroke();
  }

  _drawChart(objChart) {
    this._ctx.beginPath();
    this._ctx.lineWidth = 2;
    this._ctx.fillStyle = "#953735";
    this._ctx.textAlign = "center"; // выровнять текст по середине от точки рисования
    this._ctx.font = "18px  Roboto, Arial, sans-serif";
    const height = (this._height - 100 - this._intervalY) / (this._startValueY * (this._intervalsY - 1)) * (1 / 6);
    for (let i=1; i<=this._intervalsX - 1; i++){
      if (Object.keys(objChart).includes(String(this._arrayOfIntervals[i]))) {
        const scale = Number(objChart[this._arrayOfIntervals[i]]);
        this._ctx.fillRect(55 + this._intervalX * i, this._height - 50 - height * scale, this._intervalX - 10, height * scale);
      }
    }
    this._ctx.stroke();
    this._ctx.fillStyle = "#000000";
    for (let i=1; i<=this._intervalsX - 1; i++){
      if (Object.keys(objChart).includes(String(this._arrayOfIntervals[i]))) {
        const scale = Number(objChart[this._arrayOfIntervals[i]]);
        if (i % 2 > 0)
          this._ctx.fillText(this._arrayOfIntervals[i], 50 + this._intervalX * (i) + (this._intervalX / 2), this._height - 60 - height * scale);
        else
          this._ctx.fillText(this._arrayOfIntervals[i], 50 + this._intervalX * (i) + (this._intervalX / 2), this._height - 80 - height * scale);
      }
    }
    this._ctx.stroke();
    this._ctx.closePath();
  }

  _clear() {
    this._ctx.clearRect(0, 0, this._width, this._height);
  }

  _findFrequency() {
    const objChart = {};
    for (let i= 0; i < this._arrayOfIntervals.length - 1; i++) {
      this._arrayData.forEach((element) => {
        if (this._arrayOfIntervals[i] < element && element <= this._arrayOfIntervals[i+1]) {
          if (objChart[this._arrayOfIntervals[i + 1]]) objChart[this._arrayOfIntervals[i + 1]] += 1;
          else objChart[this._arrayOfIntervals[i + 1]] = 1;
        }
      })
    }
    this._objLength = Object.keys(objChart).length;
    if (this._objLength === 6) {
      this._intervalsY = 10;
      this._startValueY = 0.02;
    }
    if (this._objLength === 5) {
      this._intervalsY = 8;
      this._startValueY = 0.05;
    }
    if (this._objLength === 4) {
      this._intervalsY = 7;
      this._startValueY = 0.1;
    }
    if (this._objLength === 3) {
      this._intervalsY = 8;
      this._startValueY = 0.1;
    }
    if (this._objLength === 2) {
      this._intervalsY = 10;
      this._startValueY = 0.1;
    }
    if (this._objLength === 0) {
      this._intervalsY = 11;
      this._startValueY = 0.1;
    }

    this._intervalY = (this._height - 100) / this._intervalsY;
    return objChart;
  }

  _getArrayOfIntervals() {
    this._arrayOfIntevals = [];
    for (let i=0; i<=this._intervalsX - 2; i++) {
      const num = this._minimum - 1 + this._step * i;
      if (String(num).length > 6) {
        this._arrayOfIntevals.push(Number(num.toFixed(2)));
      }
      else this._arrayOfIntevals.push(num);
    }
    return this._arrayOfIntevals;
  }

  _drawGrid() {
    this._ctx.beginPath();
    this._ctx.lineWidth = 1;
    this._ctx.strokeStyle = "#000000";
    for (let i=1; i<this._intervalsY; i++) {
      this._ctx.moveTo(60, 450 - this._intervalY * i);
      this._ctx.lineTo(this._width - 50, 450 - this._intervalY * i);
    }
    this._ctx.stroke();
    this._ctx.closePath();
  }

  _makeRounding(number) {
    if (String(number % 1).length > 5 ) {
      if (number.toFixed(2) * 10 % 1 === 0) return number.toFixed(1);
      else return number.toFixed(2);
    }
    else return number;
  }

  _init(arrayData, objData) {
    this._arrayData = arrayData;
    const scale = Math.floor(objData.getIntervals / 5);
    if (scale > 0)
      this._intervalsX = objData.getIntervals + scale * 2 + 2;
    else
      this._intervalsX = objData.getIntervals + 3;
    this._step = objData.getStepValue;
    this._minimum = objData.getMinimum;
    this._intervalX = (this._width - 100) / (this._intervalsX);
    this._arrayOfIntervals = this._getArrayOfIntervals();
  }

  run(arrayData, objData) {
    this._init(arrayData, objData);
    const objChart = this._findFrequency();
    this._clear();
    this._drawAxes();
    this._drawChart(objChart);
  }
}
