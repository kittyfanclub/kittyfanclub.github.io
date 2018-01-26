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

  clone() {
    var attackMoves = [];
    var defenseMoves = [];

    for (var i = 0; i < this.attackMoves.length; i++) {
      attackMoves.push(this.attackMoves[i].clone());
    }
    for (var i = 0; i < this.defenseMoves.length; i++) {
      defenseMoves.push(this.defenseMoves[i].clone());
    }
    var clone = new CreatureMoves(attackMoves, defenseMoves);
    return clone;
  }

}
