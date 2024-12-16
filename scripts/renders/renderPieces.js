import { pieces } from "../data/pieces/pieces.js";
import { getSquareByLocation } from "../data/board.js";

export function renderPieces() {
  const squareElements = document.querySelectorAll('.js-square');
  squareElements.forEach(squareElement => {
    squareElement.innerHTML = '';
  });

  pieces.forEach(piece => {
    const a = getSquareByLocation(piece.location);
    document.querySelector(`.js-${a.name}`).innerHTML = `<img class="js-${piece.color}-piece piece" src="${piece.imgFile}" data-piece-id="${piece.id}">`;
  });
}