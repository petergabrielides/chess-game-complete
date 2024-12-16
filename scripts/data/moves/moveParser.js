import { getSquareByLocation } from "../board.js";
import { Castle, EnPassant, Promotion } from "./moves.js";
import { createPiece, getPieceById, Pawn } from "../pieces/pieces.js";
import { pieces } from "../pieces/pieces.js";
import { switchTurn } from "../../game-flow/switchTurn.js";

export function moveParser(move) {
  if (move instanceof Castle) {
    const king = move.movingPieces[0];
    const rook = move.movingPieces[1];

    const kingOldSquare = getSquareByLocation(king.location);
    const rookOldSquare = getSquareByLocation(rook.location);

    const kingNewSquare = move.destinationSquares[0];
    const rookNewSquare = move.destinationSquares[1];

    kingOldSquare.hasPiece = false;
    rookOldSquare.hasPiece = false;

    king.location = kingNewSquare.location;
    rook.location = rookNewSquare.location;

    kingNewSquare.hasPiece = king.id;
    rookNewSquare.hasPiece = rook.id;

    king.hasMoved = true;
    rook.hasMoved = true;
  } else if (move instanceof Promotion) {
    const pawn = move.movingPieces[0];
    const id = pawn.id;
    const color = pawn.color;
    const type = move.newPieceType;

    const oldSquare = getSquareByLocation(pawn.location);
    const newSquare = move.destinationSquares[0];

    if (newSquare.hasPiece) {
      const capturedPiece = getPieceById(newSquare.hasPiece);
      const capturedPieceIndex = pieces.indexOf(capturedPiece);
      pieces.splice(capturedPieceIndex, 1);
    }

    oldSquare.hasPiece = false;

    const pawnIndex = pieces.indexOf(pawn);
    pieces.splice(pawnIndex, 1);

    createPiece(color, type, newSquare.location, id);
  } else if (move instanceof EnPassant) {
    const pawn = move.movingPieces[0];

    const oldSquare = getSquareByLocation(pawn.location);
    const newSquare = move.destinationSquares[0];

    let capturedPawn;

    if (pawn.color === 'white') {
      const capturedPawnSquare = getSquareByLocation([newSquare.location[0], newSquare.location[1] - 1]);
      capturedPawn = getPieceById(capturedPawnSquare.hasPiece);
    }

    if (pawn.color === 'black') {
      const capturedPawnSquare = getSquareByLocation([newSquare.location[0], newSquare.location[1] + 1]);
      capturedPawn = getPieceById(capturedPawnSquare.hasPiece);
    }

    const capturedPawnSquare = getSquareByLocation(capturedPawn.location);
    const capturedPawnIndex = pieces.indexOf(capturedPawn);
    capturedPawnSquare.hasPiece = false;
    pieces.splice(capturedPawnIndex, 1);

    oldSquare.hasPiece = false;
    pawn.location = newSquare.location;
    newSquare.hasPiece = pawn.id;
  } else {
    const piece = move.movingPieces[0];
    
    const oldSquare = getSquareByLocation(piece.location);
    const newSquare = move.destinationSquares[0];

    if (piece instanceof Pawn && Math.abs(oldSquare.location[1] - newSquare.location[1]) === 2) {
      piece.justMovedTwo = 2;
    }

    if (newSquare.hasPiece) {
      const capturedPiece = getPieceById(newSquare.hasPiece);
      const capturedPieceIndex = pieces.indexOf(capturedPiece);
      pieces.splice(capturedPieceIndex, 1);
    }

    oldSquare.hasPiece = false;
    piece.location = newSquare.location;
    newSquare.hasPiece = piece.id;
  }

  switchTurn();
}