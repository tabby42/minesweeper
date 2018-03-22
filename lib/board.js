'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',
		value: function flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
				console.log('This tile has already been flipped!');
				return;
			} else if (this._bombBoard[rowIndex][columnIndex] === 'i') {
				this.playerBoard[rowIndex][columnIndex] = 'b';
			} else {
				this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
			}
			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberOfNeighborBombs',
		value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

			var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length;
			var numberOfNeighbourBombs = 0;

			neighborOffsets.forEach(function (offset) {
				var neighborRowIndex = rowIndex + offset[0];
				var neighborColumnIndex = columnIndex + offset[1];
				if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'i') {
						numberOfNeighbourBombs++;
					}
				}
			});
			return numberOfNeighbourBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles !== this._numberOfBombs;
		}
	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n'));
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = [];
			for (var i = 0; i < numberOfRows; i++) {
				var row = [];
				for (var j = 0; j < numberOfColumns; j++) {
					row.push(' ');
				}
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var board = [];
			for (var i = 0; i < numberOfRows; i++) {
				var row = [];
				for (var j = 0; j < numberOfColumns; j++) {
					row.push(null);
				}
				board.push(row);
			}
			var numberOfBombsPlaced = 0;
			while (numberOfBombsPlaced <= numberOfBombs) {
				var randomRowIndex = Math.floor(Math.random() * numberOfRows);
				var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
				//console.log(randomRowIndex, randomColumnIndex);
				if (board[randomRowIndex][randomColumnIndex] === null) {
					board[randomRowIndex][randomColumnIndex] = 'i';
					numberOfBombsPlaced++;
				}
			}
			return board;
		}
	}]);

	return Board;
}();