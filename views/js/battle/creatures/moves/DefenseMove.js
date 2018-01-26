class DefenseMove extends BattleMove {
  constructor(_id, _name, _cooldown, _protectLevel, _dev, _duration, _animation, _images) {
    super(_id, _name, _cooldown, _animation, _images);
    this.protectLevel = _protectLevel;
    this.dev = _dev;
    this.duration = _duration;
  }

  moveStats() {
    return "(d:" + this.protectLevel + "," + this.cooldown + "," + this.duration + "," + this.dev + ")";
  }
  clone() {
    var clone = new DefenseMove(this.id, this.name, this.cooldown, this.protectLevel, this.dev, this.duration, this.animation, this.images);
    return clone;
  }
}
