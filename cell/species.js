
var Species = function(numCols, numRows) {
  this.grid = [];
  this.cells = [];
  this.numCols = numCols;
  this.numRows = numRows;
};

Species.prototype.addCell = function(cell) {
  var col = cell.position.col;
  var row = cell.position.row;
  if (this.grid[col] == undefined) {
    this.grid[col] = [];
  }
  this.grid[col][row] = cell;
  this.cells.push(cell);
};

Species.prototype.aliveCells = function() {
  return this.cells.filter(function(cell) {
    return cell.alive;
  });
};

Species.prototype.whoDaNeighbors = function(col, row) {
  var neighbors = [];
  var C = this.numCols - 1;
  var R = this.numRows - 1;

  if (col > 0) neighbors.push(this.grid[col - 1][row]);  // left
  if (col < C) neighbors.push(this.grid[col + 1][row]);  // right
  if (row > 0) neighbors.push(this.grid[col][row - 1]);  // top
  if (row < R) neighbors.push(this.grid[col][row + 1]);  // bottom

  if (row > 0 && col > 0) neighbors.push(this.grid[col - 1][row - 1]); // top left
  if (row > 0 && col < C) neighbors.push(this.grid[col + 1][row - 1]); // top right

  if (row < R && col > 0) neighbors.push(this.grid[col - 1][row + 1]); // bot left
  if (row < R && col < C) neighbors.push(this.grid[col + 1][row + 1]); // bot right

  return neighbors;
},

Species.prototype.numLivingNeighbors = function(col, row) {
  var numAlive = 0;
  var neighbors = this.whoDaNeighbors(col, row);

  for (var i=0; i<neighbors.length; i++) {
    if (neighbors[i].alive) {
      numAlive += 1;
    }
  }

  return numAlive;
},

Species.prototype.tick = function(update) {
  for (var i=0; i<this.cells.length; i++) {
    var cell = this.cells[i];
    var numAlive = this.numLivingNeighbors(cell.position.col, cell.position.row);

    if (update) {
      if (numAlive < 2) {
        cell.aliveAtEnd(false);
      } else if (cell.alive && (numAlive == 2 || numAlive == 3)) {
        cell.aliveAtEnd(true);
      } else if (numAlive > 3) {
        cell.aliveAtEnd(false);
      } else if (!cell.alive && numAlive == 3) {
        cell.aliveAtEnd(true);
      } else {
        cell.aliveAtEnd(false);
      }
    }
  }

  for (var i=0; i<this.cells.length; i++) {
    var cell = this.cells[i];
    cell.tick();
  }
};

Species.prototype.seed = function() {
  this.grid[5][6].setAlive(true);
  this.grid[6][6].setAlive(true);
  this.grid[7][6].setAlive(true);
  this.grid[8][6].setAlive(true);
  this.grid[9][6].setAlive(true);
  this.grid[10][6].setAlive(true);
  this.grid[11][6].setAlive(true);
  this.grid[12][6].setAlive(true);
  this.grid[13][6].setAlive(true);
  this.grid[14][6].setAlive(true);
};
