import { pieces, getPieceById, getKing } from "./pieces.js";
import { squares, getSquareByName, getSquareByLocation } from "../board.js"; 
import { updateAllAttackedSquares } from "./updateAttackedSquares.js";

export function avoidsCheck(pieceId, newSquareName) { 
  let a;

  const piecesCopy = JSON.parse(JSON.stringify(pieces));
  const squaresCopy = JSON.parse(JSON.stringify(squares));

  const movingPiece = getPieceById(pieceId);
  const playerKing = getKing(movingPiece.color);
  const newSquare = getSquareByName(newSquareName);
  const oldSquare = getSquareByLocation(movingPiece.location);

  if (newSquare.hasPiece) { 
    const capturedPiece = getPieceById(newSquare.hasPiece);
    capturedPiece.location = 'skip';
  }

  oldSquare.hasPiece = false;
  newSquare.hasPiece = movingPiece.id;
  movingPiece.location = newSquare.location;

  playerKing.inCheck = false;

  updateAllAttackedSquares();

  a = playerKing.inCheck;

  piecesCopy.forEach(pieceCopy => {
    const piece = getPieceById(pieceCopy.id);
    for (let prop in piece) {
      if (pieceCopy.hasOwnProperty(prop)) {
        piece[prop] = pieceCopy[prop];
      }
    }
  });

  squaresCopy.forEach(squareCopy => {
    const square = getSquareByName(squareCopy.name);
    for (let prop in square) {
      if (squareCopy.hasOwnProperty(prop)) {
        square[prop] = squareCopy[prop];
      }
    }
  })
  
  return !a;
}

