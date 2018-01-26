class CreatureAttributes {
  constructor(_life, _baseDefense) {
    // static attributes
    this.life = _life;
    this.baseDefense = _baseDefense;
  }
  clone() {
    var clone = new CreatureAttributes(this.life, this.baseDefense);
    return clone;
  }
}
