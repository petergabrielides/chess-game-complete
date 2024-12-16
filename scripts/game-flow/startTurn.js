import { gameState } from '../data/gameState.js'
import { moveEvaluator } from '../data/moves/moveEvaluator.js';

export function activatePieces() {
  document.querySelectorAll(`.js-${gameState.turn}-piece`).forEach(pieceImg => {
    pieceImg.addEventListener('click', function addPieceListeners(event) {
      gameState.clickedPiece = pieceImg.dataset.pieceId;
      document.querySelectorAll(`.js-${gameState.turn}-piece`).forEach(pieceImgActive => {
        pieceImgActive.removeEventListener('click', addPieceListeners);
      });
      activateSquares();
      event.stopPropagation();
    });
  });
}

function activateSquares() {
  document.querySelectorAll('.js-square').forEach(square => {
    square.addEventListener('click', function addSquareListeners() {
      gameState.clickedSquare = square.dataset.squareName;
      document.querySelectorAll('.js-square').forEach(squareActive => {
        squareActive.removeEventListener('click', addSquareListeners);
      })
      moveEvaluator();
    })
  })
}