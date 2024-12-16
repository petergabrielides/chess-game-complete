import { initializePieces } from "./startingPosition.js";
import { updateAllAttackedSquares } from "../data/pieces/updateAttackedSquares.js";
import { updateAllLegalMoves } from "../data/pieces/updateLegalMoves.js";
import { createPiece } from "../data/pieces/pieces.js";
import { createSquares } from "../data/board.js";
import { activatePieces } from "../game-flow/startTurn.js";
import { renderBoard } from "../renders/renderBoard.js";
import { renderPieces } from "../renders/renderPieces.js";

export function startGame() {
  createSquares();
  initializePieces();
  updateAllAttackedSquares();
  updateAllLegalMoves();
  renderBoard();
  renderPieces();
  activatePieces();
}