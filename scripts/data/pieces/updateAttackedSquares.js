import { getSquareByLocation } from "../board.js";
import { getPieceById, King, pieces } from "./pieces.js";

export function updateBishopAttackedSquares(bishop) {
  const pieceLines = [[], [], [], []];

  for (let i = 1; i <= 8; i++) {      
    const a = bishop.location[0];
    const b = bishop.location[1];

    const c = a + i;
    const d = a - i;
    const e = b + i;
    const f = b - i;

    if (c < 9 && e < 9) {
      pieceLines[0].push([c, e]);
    } 
    if (c < 9 && f > 0) {
      pieceLines[1].push([c, f]);
    } 
    if (d > 0 && f > 0) {
      pieceLines[2].push([d, f]);
    } 
    if (d > 0 && e < 9) {
      pieceLines[3].push([d, e]);
    }
  }

  checkForObstaclesAndCheck(pieceLines, bishop);
}

export function updateRookAttackedSquares(rook) {
  const pieceLines = [[], [], [], []];

  for (let i = 1; i <= 8; i++) {      
    const a = rook.location[0];
    const b = rook.location[1];

    const c = a + i;
    const d = a - i;
    const e = b + i;
    const f = b - i;

    if (c < 9) {
      pieceLines[0].push([c, b]);
    } 
    if (d > 0) {
      pieceLines[1].push([d, b]);
    } 
    if (e < 9) {
      pieceLines[2].push([a, e]);
    } 
    if (f > 0) {
      pieceLines[3].push([a, f]);
    }
  }

  checkForObstaclesAndCheck(pieceLines, rook)
}

export function updateQueenAttackedSquares(queen) {
  const pieceLines = [[], [], [], [], [], [], [], []];

  for (let i = 1; i <= 8; i++) {      
    const a = queen.location[0];
    const b = queen.location[1];

    const c = a + i;
    const d = a - i;
    const e = b + i;
    const f = b - i;

    if (c < 9) {
      pieceLines[0].push([c, b]);
    } 
    if (d > 0) {
      pieceLines[1].push([d, b]);
    } 
    if (e < 9) {
      pieceLines[2].push([a, e]);
    } 
    if (f > 0) {
      pieceLines[3].push([a, f]);
    }
    if (c < 9 && e < 9) {
      pieceLines[4].push([c, e]);
    } 
    if (c < 9 && f > 0) {
      pieceLines[5].push([c, f]);
    } 
    if (d > 0 && f > 0) {
      pieceLines[6].push([d, f]);
    } 
    if (d > 0 && e < 9) {
      pieceLines[7].push([d, e]);
    }
  }

  checkForObstaclesAndCheck(pieceLines, queen)
}

export function updateKnightAttackedSquares(knight) {
  const preArray = [];

  const a = knight.location[0];
  const b = knight.location[1];

  const knightVectors = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1]
  ];

  knightVectors.forEach(vector => {
    const c = vector[0];
    const d = vector[1];

    const e = a + c;
    const f = b + d;

    if (e > 0 && e < 9 && f > 0 && f < 9) {
      preArray.push([e, f]);
    }
  });

  preArray.forEach(array => {
    const square = getSquareByLocation(array);

    if (!square.hasPiece) {
      knight.attackedSquares.push(square);

    } else {
      const occupyingPiece = getPieceById(square.hasPiece);

      if (occupyingPiece.color !== knight.color) {

        if (occupyingPiece instanceof King) {
          occupyingPiece.inCheck = true;
        }

        knight.attackedSquares.push(square);
      }
    }
  });
}

export function updatePawnAttackedSquares(pawn) {
  const x = pawn.location[0];
  const y = pawn.location[1];

  if (pawn.color === 'white') {
    if (x - 1 > 0) {
      const attackedSquare = getSquareByLocation([x - 1, y + 1]);
      pawn.attackedSquares.push(attackedSquare);

      const attackedPiece = getPieceById(attackedSquare.hasPiece);
      if (attackedPiece && attackedPiece.color === 'black' && attackedPiece instanceof King) {
        attackedPiece.inCheck = true;
      }
    }

    if (x + 1 < 9) {
      const attackedSquare =  getSquareByLocation([x + 1, y + 1]);
      pawn.attackedSquares.push(attackedSquare);

      const attackedPiece = getPieceById(attackedSquare.hasPiece);
      if (attackedPiece && attackedPiece.color === 'black' && attackedPiece instanceof King) {
        attackedPiece.inCheck = true;
      }
    }
      
  } else {
    if (x - 1 > 0) {
      const attackedSquare =  getSquareByLocation([x - 1, y - 1]);
      pawn.attackedSquares.push(attackedSquare);

      const attackedPiece = getPieceById(attackedSquare.hasPiece);
      if (attackedPiece && attackedPiece.color === 'white' && attackedPiece instanceof King) {
        attackedPiece.inCheck = true;
      }
    }

    if (x + 1 < 9) {
      const attackedSquare =  getSquareByLocation([x + 1, y - 1]);
      pawn.attackedSquares.push(attackedSquare);

      const attackedPiece = getPieceById(attackedSquare.hasPiece);
      if (attackedPiece && attackedPiece.color === 'white' && attackedPiece instanceof King) {
        attackedPiece.inCheck = true;
      }
    }  
  }
}

export function updateKingAttackedSquares(king) {
  const preArrays = [];

  const x = king.location[0];
  const y = king.location[1];
  
  preArrays.push(
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  );

  preArrays.forEach(preArray => {
    if (
      preArray[0] > 0 
      && preArray[1] > 0 
      && preArray[0] < 9 
      && preArray[1] < 9
    ) {
      const square = getSquareByLocation(preArray);
      const attackedPiece = getPieceById(square.hasPiece);
      if (!attackedPiece) {
        king.attackedSquares.push(square);
      } else if (attackedPiece && attackedPiece.color !== king.color) {
        king.attackedSquares.push(square);
        if (attackedPiece instanceof King) {
          attackedPiece.inCheck = true;
        }
      }
      }
  });
}

export function updateAllAttackedSquares() {
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].location === 'skip') {
      continue;
    }
    pieces[i].updateAttackedSquares();
  }
}

function checkForObstaclesAndCheck(pieceLines, movingPiece) {
  pieceLines.forEach(pieceLine => {
    for (let i = 0; i < pieceLine.length; i++) {
      const square = getSquareByLocation(pieceLine[i]);

      if (movingPiece.attackedSquares.includes(square)) {
        continue;

      } else if (!square.hasPiece) {
        movingPiece.attackedSquares.push(square);

      } else if (getPieceById(square.hasPiece).color !== movingPiece.color) {
        movingPiece.attackedSquares.push(square);

        const attackedPiece = getPieceById(square.hasPiece);
        
        if (attackedPiece instanceof King) {
          attackedPiece.inCheck = true;
        }

        break;

      } else {

        break;

      }
    }
  })
}