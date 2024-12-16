import { createPiece } from "../data/pieces/pieces.js";

export function initializePieces() {
  
  const startingValues = [
    ['white', 'rook', [1, 1], 'wr1'],
    ['white', 'knight', [2, 1], 'wn1'],
    ['white', 'bishop', [3, 1], 'wb1'],
    ['white', 'queen', [4, 1,], 'wq1'],
    ['white', 'king', [5, 1], 'wk1'],
    ['white', 'bishop', [6, 1], 'wb2'],
    ['white', 'knight', [7, 1], 'wn2'],
    ['white', 'rook', [8, 1], 'wr2'],
    ['white', 'pawn', [1, 2], 'wp1'],
    ['white', 'pawn', [2, 2], 'wp2'],
    ['white', 'pawn', [3, 2], 'wp3'],
    ['white', 'pawn', [4, 2], 'wp4'],
    ['white', 'pawn', [5, 2], 'wp5'],
    ['white', 'pawn', [6, 2], 'wp6'],
    ['white', 'pawn', [7, 2], 'wp7'],
    ['white', 'pawn', [8, 2], 'wp8'],
    ['black', 'pawn', [1, 7], 'bp1'],
    ['black', 'pawn', [2, 7], 'bp2'],
    ['black', 'pawn', [3, 7], 'bp3'],
    ['black', 'pawn', [4, 7], 'bp4'],
    ['black', 'pawn', [5, 7], 'bp5'],
    ['black', 'pawn', [6, 7], 'bp6'],
    ['black', 'pawn', [7, 7], 'bp7'],
    ['black', 'pawn', [8, 7], 'bp8'],
    ['black', 'rook', [1, 8], 'br1'],
    ['black', 'knight', [2, 8], 'bn1'],
    ['black', 'bishop', [3, 8], 'bb1'],
    ['black', 'queen', [4, 8], 'bq1'],
    ['black', 'king', [5, 8], 'bk1'],
    ['black', 'bishop', [6, 8], 'bb2'],
    ['black', 'knight', [7, 8], 'bn2'],
    ['black', 'rook', [8, 8], 'br2'],
  ];

  startingValues.forEach(startingValue => {
    createPiece(startingValue[0], startingValue[1], startingValue[2], startingValue[3]);
  })
    
}
