import { Pawn, Knight, Bishop, Rook, Queen, King } from "./pieces.js";

export function setPieceImg(piece) {
  if (piece.color === 'white') {
    if (piece instanceof Pawn) {
      return 'images/wpawn.png';
    }
    if (piece instanceof Knight) {
      return 'images/wknight.png';
    }
    if (piece instanceof Bishop) {
      return 'images/wbishop.png';
    }
    if (piece instanceof Rook) {
      return 'images/wrook.png';
    }
    if (piece instanceof Queen) {
      return 'images/wqueen.png';
    }
    if (piece instanceof King) {
      return 'images/wking.png';
    }
  }

  if (piece.color === 'black') {
    if (piece instanceof Pawn) {
      return 'images/bpawn.png';
    }
    if (piece instanceof Knight) {
      return 'images/bknight.png';
    }
    if (piece instanceof Bishop) {
      return 'images/bbishop.png';
    }
    if (piece instanceof Rook) {
      return 'images/brook.png';
    }
    if (piece instanceof Queen) {
      return 'images/bqueen.png';
    }
    if (piece instanceof King) {
      return 'images/bking.png';
    }
  }
}