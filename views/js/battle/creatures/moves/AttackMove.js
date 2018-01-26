class AttackMove extends BattleMove {
  constructor(_id, _name, _cooldown, _power, _critChance, _dev, _animation) {
    super(_id, _name, _cooldown, _animation);
    this.power = _power;
    this.critChance = _critChance;
    this.dev = _dev;
  }

  moveStats() {
    return "(o:" + this.power + "," + this.cooldown + "," + this.critChance + "," + this.dev + ")";
  }

  clone() {
    var clone = new AttackMove(this.id, this.name, this.cooldown, this.power, this.critChance, this.dev, this.animation);
    return clone;
  }
}