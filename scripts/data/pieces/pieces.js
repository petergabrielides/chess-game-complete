import { getSquareByLocation } from "../board.js";
import { updateBishopAttackedSquares, updateRookAttackedSquares, updateQueenAttackedSquares, updateKnightAttackedSquares, updateKingAttackedSquares, updatePawnAttackedSquares } from "./updateAttackedSquares.js";
import { updateNormalLegalMoves, updatePawnLegalMoves, updateKingLegalMoves } from "./updateLegalMoves.js";
import { setPieceImg } from "./setPieceImg.js";

export const pieces = [];

export class Piece{
  color;
  location;
  id;
  hasMoved;
  attackedSquares = [];
  legalMoves = [];
  imgFile;

  constructor(color, location, id) {
    this.color = color;
    this.location = location;
    this.id = id;
    this.hasMoved = false;
    this.imgFile = setPieceImg(this);
    getSquareByLocation(this.location).hasPiece = this.id;
  }
}

export class Pawn extends Piece{
  justMovedTwo = false;

  updateAttackedSquares() {
    this.attackedSquares = [];
    updatePawnAttackedSquares(this);
  }

  updateLegalMoves() {
    this.legalMoves = [];
    updatePawnLegalMoves(this);
  }
}

export class Bishop extends Piece{
  updateAttackedSquares() {
    this.attackedSquares = [];
    updateBishopAttackedSquares(this);
  }

  updateLegalMoves() {
    this.legalMoves = [];
    updateNormalLegalMoves(this);
  }
}

export class Knight extends Piece{
  updateAttackedSquares() {
    this.attackedSquares = [];
    updateKnightAttackedSquares(this);
  }

  updateLegalMoves() {
    this.legalMoves = [];
    updateNormalLegalMoves(this);
  }
}

export class Rook extends Piece{
  updateAttackedSquares() {
    this.attackedSquares = [];
    updateRookAttackedSquares(this);
  }

  updateLegalMoves() {
    this.legalMoves = [];
    updateNormalLegalMoves(this);
  }
}

export class King extends Piece{
  inCheck = false;

  updateAttackedSquares() {
    this.attackedSquares = [];
    updateKingAttackedSquares(this);
  }

  updateLegalMoves() {
    this.legalMoves = [];
    updateKingLegalMoves(this);
  }
}

export class Queen extends Piece{
  updateAttackedSquares() {
    this.attackedSquares = [];
    updateQueenAttackedSquares(this);
  }

  updateLegalMoves() {
    this.legalMoves = [];
    updateNormalLegalMoves(this);
  }
}

export function getPieceById(pieceId) {
  let a;

  pieces.forEach(piece => {
    if (piece.id === pieceId) {
      a = piece;
    }
  });

  return a;
}

export function getKing(color) {
  let a;

  pieces.forEach(piece => {
    if (piece instanceof King && piece.color === color) {
      a = piece;
    }
  });

  return a;
}

export function createPiece(color, type, location, id) {
  if (type === 'pawn') {
    pieces.push(new Pawn(color, location, id));
  } else if (type === 'bishop') {
    pieces.push(new Bishop(color, location, id));
  } else if (type === 'knight') {
    pieces.push(new Knight(color, location, id));
  } else if (type === 'rook') {
    pieces.push(new Rook(color, location, id));
  } else if (type === 'queen') {
    pieces.push(new Queen(color, location, id));
  } else if (type === 'king') {
    pieces.push(new King(color, location, id));
  } 
}