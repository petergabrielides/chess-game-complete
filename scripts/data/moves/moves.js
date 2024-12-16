import { getPieceById } from "../pieces/pieces.js";
import { getSquareByLocation } from "../board.js";
import { Pawn, King } from "../pieces/pieces.js";

export function moveCreator(movingPiece, newSquare, pieceType = undefined) { 
  if (movingPiece instanceof Pawn && movingPiece.location[0] !== newSquare.location[0] && !newSquare.hasPiece) {
    return new EnPassant(movingPiece, newSquare);
  }

  if (movingPiece instanceof King && Math.abs(movingPiece.location[0] - newSquare.location[0]) === 2) {
    return new Castle(movingPiece, newSquare);
  }

  if (movingPiece instanceof Pawn && (newSquare.location[1] === 1 || newSquare.location[1] === 8)) {
    return new Promotion(movingPiece, newSquare, pieceType);
  }

  return new Move(movingPiece, newSquare);
}

export class Move{
  movingPieces = [];
  destinationSquares = [];
  twoSquarePawnMove = false;

  constructor(movingPiece, newSquare) {    
    this.movingPieces.push(movingPiece);
    this.destinationSquares.push(newSquare);

    if (movingPiece instanceof Pawn && Math.abs(movingPiece.location[1] - newSquare.location[1]) === 2) {
      this.twoSquarePawnMove = true;
    }
  }
}

export class EnPassant extends Move{
  constructor(movingPiece, newSquare) {
    super(movingPiece, newSquare);
  }
}

export class Castle extends Move{
  constructor(movingPiece, newSquare) {
    super(movingPiece, newSquare);

    if (newSquare.name === 'c1') {
      this.movingPieces.push(getPieceById('wr1'));
      this.destinationSquares.push(getSquareByLocation([4, 1]));
    }

    if (newSquare.name === 'g1') {
      this.movingPieces.push(getPieceById('wr2'));
      this.destinationSquares.push(getSquareByLocation([6, 1]));
    }

    if (newSquare.name === 'c8') {
      this.movingPieces.push(getPieceById('br1'));
      this.destinationSquares.push(getSquareByLocation([4, 8]));
    }

    if (newSquare.name === 'g8') {
      this.movingPieces.push(getPieceById('br2'));
      this.destinationSquares.push(getSquareByLocation([6, 8]));
    }
  }
}

export class Promotion extends Move{
  newPieceType;

  constructor(movingPiece, newSquare, pieceType) {
    super(movingPiece, newSquare);

    this.newPieceType = pieceType;
  }
}