// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
class BattleCreature {
  constructor(_name, _attributes, _display, _moves) {
    // static attributes
    this.name = _name;  // String
    this.attributes = _attributes;  // CreatureAttributes
    this.display = _display; // CreatureDisplay
    this.moves = _moves; // CreatureMoves
    this.battle = new CreatureBattleData(this.attributes.life);
  }

  startBattle() {
    this.battle = new CreatureBattleData(this.attributes.life);
    this.moves = this.moves.clone();
    this.display.reset();
  }

  clone() {
    var name = this.name;
    var attributes = this.attributes.clone();
    var display = this.display.clone();
    var moves = this.moves.clone();
    var clone = new BattleCreature(name, attributes, display, moves);
    return clone;
  }

  clearLingeringEffects() {
    this.battle.lingeringEffects = [];
  }
}

class CreatureBattleData {
  constructor(_currentLife) {
    this.currentLife = _currentLife;
    this.lingeringEffects = [];
  }

}

function buildCreature(_buildData) {
  var name = buildCreatureName(_buildData);
  var attributes = buildCreatureAttributes(_buildData);
  var display = buildCreatureDisplay(_buildData);
  var moves = buildCreatureMoves(_buildData);

  var creature = new BattleCreature(name, attributes, display, moves);
}
