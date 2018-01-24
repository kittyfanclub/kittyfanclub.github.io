class CreatureMoves {

  constructor(_attackMoves, _defenseMoves) {
    this.allMoves = [];

    this.attackMoves = _attackMoves;
    this.addMoves(this.attackMoves);

    this.defenseMoves = _defenseMoves;
    this.addMoves(this.defenseMoves);
  }
  addMoves(moves) {
    if (moves != undefined) {
      for (var i = 0; i < moves.length; i++) {
        this.allMoves.push(moves[i]);
      }
    }
  }
}
