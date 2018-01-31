// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
class CreatureMoves {

  constructor(_attackMoves, _defenseMoves, _healMoves) {
    this.allMoves = [];

    this.attackMoves = _attackMoves;
    this.addMoves(this.attackMoves);

    this.defenseMoves = _defenseMoves;
    this.addMoves(this.defenseMoves);

    if (_healMoves == undefined) {
      this.healMoves = [];
    }
    else {
      this.healMoves = _healMoves;
      this.addMoves(this.healMoves);
    }
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
    var healMoves = [];

    for (var i = 0; i < this.attackMoves.length; i++) {
      attackMoves.push(this.attackMoves[i].clone());
    }
    for (var i = 0; i < this.defenseMoves.length; i++) {
      defenseMoves.push(this.defenseMoves[i].clone());
    }
    for (var i = 0; i < this.healMoves.length; i++) {
      healMoves.push(this.healMoves[i].clone());
    }
    var clone = new CreatureMoves(attackMoves, defenseMoves, healMoves);
    return clone;
  }

}
