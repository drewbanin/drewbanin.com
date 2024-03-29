import _ from 'lodash';
import React from 'react';
import Datasheet from 'react-datasheet/lib/DataSheet';

import 'react-datasheet/lib/react-datasheet.css';
import './App.css';

const alphabet = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numRows = 32;
const numCols = window.screen.width > 600 ? 22 : 7;

let grid = _.map(_.range(numRows), (r) => {
    return _.map(_.range(numCols), (c) => {
        const isHeaderRow = r === 0;
        const isHeaderCol = c === 0;

        let value;
        if (isHeaderRow) {
            value = alphabet[c];
        } else if (isHeaderCol) {
            value = r;
        } else {
            value = '';
        }

        return {
            readOnly: isHeaderRow || isHeaderCol,
            value: value,
            forceComponent: false,
            row: r,
            col: c,
        }
    })
})


export default class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: grid,
      render: 0,
    };

    this.lineNumber = 0;
    this.colNumber = 0;
    this.histCells = [];

    this.player = props.player;
    this.player.onLyric = this.onLyric;
    this.player.onTick = this.onTick;
  }

  componentDidMount() {
    this.onLyric = this.onLyric.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  onTick = fftBuffer => {
      const grid = this.state.grid;

      const scaleFrom = 256;
      const scaleTo = 14;

      let histCells = [];

      let chunkSize;
      if (numCols < 10) {
          chunkSize = 4;
      } else {
          chunkSize = 1;
      }
      let chunked = _.chunk(fftBuffer, chunkSize);

      let title = [];

      _.each(chunked, (amplitudes, i) => {
          let amplitudeAvg = _.mean(amplitudes);
          let scaledAmplitude = Math.round((amplitudeAvg / scaleFrom) * scaleTo);
          //console.log(i, scaledAmplitude);
          let col = i + 1;

          title.push(scaledAmplitude);

          for (let rowNum=0; rowNum < scaleTo; rowNum++) {
              let row = grid[numRows - rowNum - 1];
              if (!row) {
                  continue;
              }
              let cell = row[col];

              if (cell) {
                  if (rowNum > scaledAmplitude) {
                      //cell.color = '#eee';
                      cell.color = 'white';
                      cell.fontColor = 'black';
                      cell.value = '';
                  } else if (rowNum < 6) {
                      cell.color = '#C6EFCE'
                      cell.fontColor = '#006100';
                      cell.value = '#VALUE!';
                  } else if (rowNum < 10) {
                      cell.color = '#FFEB9C';
                      cell.fontColor = '#9C6500';
                      cell.value = '#REF!';
                  } else {
                      cell.color = '#FFC7CE';
                      cell.fontColor = '#9C0006';
                      cell.value = '#DIV/0!';
                  }
              }
          }
      })

      let titleMsg = _.map(_.take(title, 12), (amplitude) => {
          if (amplitude === 0) {
            return '▁';
          } else if (amplitude < 2) { 
            return '▂';
          } else if (amplitude < 4) { 
            return '▃';
          } else if (amplitude < 6) { 
            return '▄';
          } else if (amplitude < 8) { 
            return '▅';
          } else if (amplitude < 10) { 
            return '▆';
          } else if (amplitude < 12) { 
            return '▇';
          } else {
            return '█';
          }
      })

      document.title = titleMsg.join("");

      this.histCells = histCells;
      this.setState({ grid });
  }

  clearLine = lineNo => {
      const grid = this.state.grid;
      let row = grid[lineNo];

      _.each(row, (cell, i) => {
          if (i > 0) {
              cell.value = '';
          }
      });
  }

  typeLyrics = (cell, lyric) => {
      cell.style = lyric.style;
      cell.value = lyric.value;
  }

  onLyric = lyric => {
      const numLines = 15;

      if (lyric.newline) {
          this.lineNumber += 1;
          this.colNumber = 0;
          this.title = [];
      }

      // include row header
      if (this.colNumber >= (numCols - 1)) {
          this.lineNumber += 1;
          this.colNumber = 0;
      }

      if (this.lineNumber >= numLines || lyric.clear) {
          this.lineNumber = 0;
          _.each(_.range(numLines), (lineNo) => {
              this.clearLine(lineNo + 1);
          });
      }

      const grid = this.state.grid;
      let cell = grid[this.lineNumber + 1][this.colNumber + 1];

      if (this.lastCell) {
        this.lastCell.selected = false;
      }

      if (cell) {
          cell.selected = true;
          this.typeLyrics(cell, lyric);
      }

      this.lastCell = cell;

      let render = this.state.render + 1;
      this.setState({ grid, render });

      this.colNumber += 1;
  }

  valueRenderer = cell => {
    return cell.value;
  }

  onCellsChanged = changes => {
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    this.setState({ grid });
  };

  onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;

  render() {

    function makeCell(props) {
        var style = {}

        if (props.cell.color) {
            style['backgroundColor'] = props.cell.color;
        } else {
            style['backgroundColor'] = 'white';
        }

        if (props.cell.fontColor) {
            style['color'] = props.cell.fontColor;
        }

        if (props.cell.selected) {
            style['backgroundColor'] = '#0e65eb19';
        }

        if (props.cell.bold) {
            style['fontWeight'] = 'bold';
        }

        if (props.cell.style) {
            _.assign(style, props.cell.style);
        }

        if (props.cell.readOnly) {
            return (<td style={style} className='hist-cell cell read-only'>{props.cell.value}</td>)
        } else {
            return (<td style={style} className='hist-cell cell'>{props.cell.value}</td>)
        }
    }

    this.datasheet = (<Datasheet
        data={this.state.grid}
        valueRenderer={this.valueRenderer}
        onContextMenu={this.onContextMenu}
        onCellsChanged={this.onCellsChanged}
        cellRenderer={makeCell}
    />)

    return this.datasheet;
  }
}
