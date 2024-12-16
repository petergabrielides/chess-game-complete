import { avoidsCheck } from "./avoidsCheck.js";
import { getPieceById, Pawn, pieces } from "./pieces.js";
import { getSquareByLocation } from "../board.js";

export function updateNormalLegalMoves(piece) {
  piece.attackedSquares.forEach(attackedSquare => {
    if (avoidsCheck(piece.id, attackedSquare.name)) {
      piece.legalMoves.push(attackedSquare);
    }
  });
}

export function updatePawnLegalMoves(pawn) {
  const x = pawn.location[0];
  const y = pawn.location[1];

  pawn.attackedSquares.forEach(attackedSquare => {
    if (attackedSquare.hasPiece && getPieceById(attackedSquare.hasPiece).color !== pawn.color) {
      pawn.legalMoves.push(attackedSquare);
    }
  });

  if (pawn.color === 'white') {
    const a = getSquareByLocation([x, y + 1]);
    const b = getSquareByLocation([x, y + 2]);

    if (!a.hasPiece && avoidsCheck(pawn.id, a.name)) {
      pawn.legalMoves.push(a);
    }

    if (
      pawn.hasMoved === false 
      && !a.hasPiece 
      && !b.hasPiece 
      && avoidsCheck(pawn.id, b.name)
    ) {
      pawn.legalMoves.push(b);
    }

    const c = getSquareByLocation([x - 1, y]);
    const d = getSquareByLocation([x + 1, y]);

    let e;
    let f;
    let g;
    let h;

    if (x - 1 > 0) {
      e = c.hasPiece;
      g = getSquareByLocation([x - 1, y + 1]);
    }

    if (x + 1 < 9) {
      f = d.hasPiece;
      h = getSquareByLocation([x + 1, y + 1]);
    }

    if (
      y === 5 
      && e 
      && getPieceById(e).color === 'black' 
      && getPieceById(e) instanceof Pawn 
      && getPieceById(e).justMovedTwo 
      && avoidsCheck(pawn.id, g.name)
    ) {
      pawn.legalMoves.push(g);
    }

    if (
      y === 5 
      && f
      && getPieceById(f).color === 'black'  
      && getPieceById(f) instanceof Pawn 
      && getPieceById(f).justMovedTwo 
      && avoidsCheck(pawn.id, h.name)
    ) {
      pawn.legalMoves.push(h);
    }
  }

  if (pawn.color === 'black') {
    const a = getSquareByLocation([x, y - 1]);
    const b = getSquareByLocation([x, y - 2]);

    if (!a.hasPiece && avoidsCheck(pawn.id, a.name)
    ) {
      pawn.legalMoves.push(a);
    }

    if (
      pawn.hasMoved === false 
      && !a.hasPiece 
      && !b.hasPiece 
      && avoidsCheck(pawn.id, b.name)
    ){
      pawn.legalMoves.push(b);
    }

    const c = getSquareByLocation([x - 1, y]);
    const d = getSquareByLocation([x + 1, y]);

    let e;
    let f;
    let g;
    let h;

    if (x - 1 > 0) {
      e = c.hasPiece;
      g = getSquareByLocation([x - 1, y - 1]);
    }

    if (x + 1 < 9) {
      f = d.hasPiece;
      h = getSquareByLocation([x + 1, y - 1]);
    }

    if (
      y === 4 
      && e 
      && getPieceById(e).color === 'white' 
      && getPieceById(e) instanceof Pawn 
      && getPieceById(e).justMovedTwo 
      && avoidsCheck(pawn.id, g.name)
    ) {
      pawn.legalMoves.push(g);
    }

    if (
      y === 4 
      && f
      && getPieceById(f).color === 'white'  
      && getPieceById(f) instanceof Pawn 
      && getPieceById(f).justMovedTwo 
      && avoidsCheck(pawn.id, h.name)
    ) {
      pawn.legalMoves.push(h);
    }
  }
}

export function updateKingLegalMoves(king) {
  king.attackedSquares.forEach(attackedSquare => {
    if (avoidsCheck(king.id, attackedSquare.name)) {
      king.legalMoves.push(attackedSquare);
    }
  })

  let queensRook;
  let kingsRook; 

  if (king.color === 'white' && !king.inCheck && !king.hasMoved) {
    queensRook = getPieceById('wr1');
    const longCastle = getSquareByLocation([3, 1]);

    if (queensRook && !queensRook.hasMoved) {
      let squaresBetweenEmpty = true;

      getSquaresBetween(king, queensRook).forEach(square => {
        if (square.hasPiece) {
          squaresBetweenEmpty = false;
        }
      });

      if (squaresBetweenEmpty) {
        let throughOrIntoCheck = false;

        ['d1', 'c1'].forEach(square => {
          if (!avoidsCheck(king.id, square)) {
            throughOrIntoCheck = true;
          }
        });

        if (!throughOrIntoCheck) {
          king.legalMoves.push(longCastle);
        }
      }
    }

    kingsRook = getPieceById('wr2');
    const shortCastle = getSquareByLocation([7, 1]);

    if (kingsRook && !kingsRook.hasMoved) {
      let squaresBetweenEmpty = true;

      getSquaresBetween(king, kingsRook).forEach(square => {
        if (square.hasPiece) {
          squaresBetweenEmpty = false;
        }
      });

      if (squaresBetweenEmpty) {
        let throughOrIntoCheck = false;

        ['f1', 'g1'].forEach(square => {
          if (!avoidsCheck(king.id, square)) {
            throughOrIntoCheck = true;
          }
        });

        if (!throughOrIntoCheck) {
          king.legalMoves.push(shortCastle);
        }
      }
    }
  }

  if (king.color === 'black' && !king.inCheck  && !king.hasMoved) {
    queensRook = getPieceById('br1');
    const longCastle = getSquareByLocation([3, 8]);

    if (queensRook && !queensRook.hasMoved) {
      let squaresBetweenEmpty = true;

      getSquaresBetween(king, queensRook).forEach(square => {
        if (square.hasPiece) {
          squaresBetweenEmpty = false;
        }
      });

      if (squaresBetweenEmpty) {
        let throughOrIntoCheck = false;

        ['d8', 'c8'].forEach(square => {
          if (!avoidsCheck(king.id, square)) {
            throughOrIntoCheck = true;
          }
        });

        if (!throughOrIntoCheck) {
          king.legalMoves.push(longCastle);
        }
      }
    }

    kingsRook = getPieceById('br2');
    const shortCastle = getSquareByLocation([7, 8]);

    if (kingsRook && !kingsRook.hasMoved) {
      let squaresBetweenEmpty = true;

      getSquaresBetween(king, kingsRook).forEach(square => {
        if (square.hasPiece) {
          squaresBetweenEmpty = false;
        }
      });

      if (squaresBetweenEmpty) {
        let throughOrIntoCheck = false;

        ['f8', 'g8'].forEach(square => {
          if (!avoidsCheck(king.id, square)) {
            throughOrIntoCheck = true;
          }
        });

        if (!throughOrIntoCheck) {
          king.legalMoves.push(shortCastle);
        }
      }
    }
  }
}

export function updateAllLegalMoves() {
  pieces.forEach(piece => {
    piece.updateLegalMoves();
  });
}

function getSquaresBetween(piece1, piece2) {
  const a = piece1.location;
  const b = piece2.location;

  const d = [];

  if (a[0] === b[0]) {
    const c = Math.abs(b[1] - a[1]);   
    if (a[1] < b[1] && c > 0) {
      for (let i = 1; i < c; i++) {
        d.push(getSquareByLocation([a[0], a[1] + i]));
      }
    }
    if (a[1] > b[1] && c > 0) {
      for (let i = 1; i < c; i++) {
        d.push(getSquareByLocation([b[0], b[1] + i]));
      }
    }
  }

  if (a[1] === b[1]) {
    const c = Math.abs(b[0] - a[0]);   
    if (a[0] < b[0] && c > 0) {
      for (let i = 1; i < c; i++) {
        d.push(getSquareByLocation([a[0] + i, a[1]]));
      }
    }
    if (a[0] > b[0] && c > 0) {
      for (let i = 1; i < c; i++) {
        [b[0] + i], b[1]
        d.push(getSquareByLocation([b[0] + i, b[1]]));
      }
    }
  }

  return d;

}