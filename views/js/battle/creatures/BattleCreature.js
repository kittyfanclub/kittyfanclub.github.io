class BattleCreature {
  constructor(_name, _attributes, _display, _moves) {
    // static attributes
    this.name = _name;
    this.attributes = _attributes;
    this.display = _display;
    this.moves = _moves;
    this.battle = new CreatureBattleData(this.attributes.life);
  }

  startBattle() {
    this.battle = new CreatureBattleData(this.attributes.life);
  }
}

class CreatureBattleData {
  constructor(_currentLife) {
    this.currentLife = _currentLife;
  }

}

function buildCreature(_buildData) {
  var name = buildCreatureName(_buildData);
  var attributes = buildCreatureAttributes(_buildData);
  var display = buildCreatureDisplay(_buildData);
  var moves = buildCreatureMoves(_buildData);

  var creature = new BattleCreature(name, attributes, display, moves);
}
