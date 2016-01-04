var Cell = function(canvas, position, dimensions, alive) {
  this.canvas = canvas;
  this.position = position;
  this.alive = alive;
  this.willLive = alive;

  this.age = 0;

  this.dimensions = dimensions;

  this.cell = new fabric.Rect({
    left: this.dimensions.x,
    top: this.dimensions.y,
    fill: alive ? 'black' : 'white',
    width: this.dimensions.width,
    height: this.dimensions.height,
    selectable: false,
    model: this,
  });

  this.canvas.add(this.cell);
};

Cell.prototype.color = function() {
  if (true || window.clicked) { // this looks better
    var intensity = Math.max(255 - this.age * 50 - 50, 0);
    var hex = intensity.toString(16);
    return '#' + hex + hex + hex;
  } else {
    return this.alive ? "black" : "white";
  }
};

Cell.prototype.tick = function() {
  if (this.alive) {
    this.age += 1;
  } else {
    this.age = 0;
  }

  this.alive = this.willLive;

  if (this.alive) {
    this.cell.fill = this.color();
  } else {
    this.cell.fill = 'white';
  };
};

Cell.prototype.aliveAtEnd = function(willLive) {
  this.willLive = willLive;
}

Cell.prototype.setAlive = function(alive) {
  this.alive = alive;
  this.willLive = alive;
};
