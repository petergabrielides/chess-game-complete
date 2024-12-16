import { getSquareByName } from "../board.js"
import { gameState } from "../gameState.js"
import { activatePieces } from "../../game-flow/startTurn.js";
import { moveCreator } from "./moves.js";
import { moveParser } from "./moveParser.js";
import { Pawn } from "../pieces/pieces.js";
import { getPieceById } from "../pieces/pieces.js";

export function moveEvaluator() {
  const clickedSquare = getSquareByName(gameState.clickedSquare);
  const clickedPiece = getPieceById(gameState.clickedPiece);

  const clickedPieceLegalMovesNames = [];
  clickedPiece.legalMoves.forEach(legalMove => {
    clickedPieceLegalMovesNames.push(legalMove.name);
  })

  if (!clickedPieceLegalMovesNames.includes(clickedSquare.name)) {
    gameState.clickedSquare = undefined;
    gameState.clickedPiece = undefined;
    activatePieces();
  } else {
    if (clickedPiece instanceof Pawn && (clickedSquare.location[1] === 1 || clickedSquare.location[1] === 8)) {
      const promotionElement = document.querySelector('.js-promotion-prompt');
      promotionElement.innerHTML = `
        <button class="js-promotion-button" data-piece-type="knight">Knight</button>
        <button class="js-promotion-button" data-piece-type="bishop">Bishop</button>
        <button class="js-promotion-button" data-piece-type="rook">Rook</button>
        <button class="js-promotion-button" data-piece-type="queen">Queen</button>
        <button class="js-back-button">Back</button>
      `;
      const promotionButtonElements = document.querySelectorAll('.js-promotion-button');
      promotionButtonElements.forEach(button => {
        button.addEventListener('click', () => {
          const newPieceType = button.dataset.pieceType;
          promotionElement.innerHTML = '';
          moveParser(moveCreator(clickedPiece, clickedSquare, newPieceType));
        });
      });

      const backButtonElement = document.querySelector('.js-back-button');
      backButtonElement.addEventListener('click', () => {
        gameState.clickedSquare = undefined;
        gameState.clickedPiece = undefined;
        promotionElement.innerHTML = '';
        activatePieces();
      });

    } else {
      moveParser(moveCreator(clickedPiece, clickedSquare));
    }
  }
}