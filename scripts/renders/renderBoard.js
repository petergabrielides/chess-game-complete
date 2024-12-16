import { squares } from "../data/board.js";

export function renderBoard() {
  let a = '';

  for (let i = 8; i > 0; i--) {
    squares.forEach(square => {
      if (square.location[1] === i) {
        a += `
          <div class="${square.color} square js-square js-${square.name}" data-square-name="${square.name}"></div>
        `
      }
    });
  }

  document.querySelector('.js-board-grid')
    .innerHTML = a;
}

