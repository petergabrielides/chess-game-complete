import { squares } from './data/board.js';
import { pieces } from './data/pieces/pieces.js';
import { startGame } from './initial-setup/initializeMain.js';
import { gameState } from './data/gameState.js';

startGame();

document.querySelector('.js-test-button')
  .addEventListener('click', () => {
    console.log(squares);
    console.log(pieces);
    console.log(gameState);
  })
