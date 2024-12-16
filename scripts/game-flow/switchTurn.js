import { gameState } from "../data/gameState.js";
import { renderBoard } from "../renders/renderBoard.js";
import { renderPieces } from "../renders/renderPieces.js";
import { activatePieces } from "./startTurn.js";
import { updateAllAttackedSquares } from "../data/pieces/updateAttackedSquares.js";
import { updateAllLegalMoves } from "../data/pieces/updateLegalMoves.js";
import { pieces, Pawn } from "../data/pieces/pieces.js";

export function switchTurn () {
  if (gameState.turn === 'white') {
    gameState.turn = 'black';
  } else {
    gameState.turn = 'white';
  }

  gameState.clickedPiece = undefined;
  gameState.clickedSquare = undefined;

  pieces.forEach(piece => {
    if (piece instanceof Pawn) {
      if (piece.justMovedTwo === 2) {
        piece.justMovedTwo = 1;
      } else if (piece.justMovedTwo === 1) {
        piece.justMovedTwo = false;
      }
    }
  });

  updateAllAttackedSquares();
  updateAllLegalMoves();
  renderBoard();
  renderPieces();
  activatePieces();
}