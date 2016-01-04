
var COLS = 30;
var ROWS = 20;

var SPACING = 2;

var CELL_WIDTH = 10;
var CELL_HEIGHT = 10;

var PLAY = false;

var canvas = new fabric.Canvas('life');
canvas.selection = false; // disable group selection

window.down = false;

var makeCellAlive = true;
canvas.on('mouse:down', function(options) {
  window.down = true;
  window.clicked = true;
  if (options.target && options.target.model && options.e.which == 1) {
    makeCellAlive = !options.target.model.alive;
    options.target.model.setAlive(makeCellAlive);
    canvas.renderAll();
  }
});

canvas.on('mouse:move', function(options) {
  if (options.target && options.target.model && options.e.which == 1) {
    options.target.model.setAlive(makeCellAlive);
    canvas.renderAll();
  }
});

canvas.on('mouse:up', function(options) {
  window.down = false;
});

var SPACING = 4;

var ROW_DIMENSIONS = [];
var COL_DIMENSIONS = [];

function genColDimensions() {
  var rolling_width = 0;

  var factor = Math.PI;
  for (var col=0; col < COLS; col++) {
    var width = (Math.abs(Math.sin(col / COLS * factor)) + 1) * CELL_WIDTH;
    var dims = {width: width, x: rolling_width};
    rolling_width += width + SPACING;

    COL_DIMENSIONS.push(dims);
  }
}

function genRowDimensions() {
  var rolling_height = 0;

  var factor = Math.PI;
  for (var row=0; row < ROWS; row++) {
    var height = (Math.abs(Math.sin(row / ROWS * factor)) + 1) * CELL_HEIGHT;
    var dims = {height: height, y: rolling_height};
    rolling_height += height + SPACING;

    ROW_DIMENSIONS.push(dims);
  }
};

//genColDimensions();
//genRowDimensions();



var species = new Species(COLS, ROWS);

var cells = [];
for (var col=0; col<COLS; col++) {
  for (var row=0; row<ROWS; row++) {

    var position = {row: row, col: col};
    var y = row * CELL_HEIGHT + SPACING * row;
    var x = col * CELL_WIDTH + SPACING * col;
    var dims = {x: x, y: y, width: CELL_WIDTH, height: CELL_HEIGHT};
    var is_alive = false;
    var cell = new Cell(canvas, position, dims, is_alive);

    species.addCell(cell);
  }
}

species.seed();


setInterval(function() {
  if (!window.down) {
    species.tick(true);
    canvas.renderAll();
  } else {
    species.tick(false);
    canvas.renderAll();
  }
}, 100);

setInterval(function() {
  canvas.renderAll();
}, 10);


