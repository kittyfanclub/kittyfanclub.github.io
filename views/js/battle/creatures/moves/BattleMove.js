class BattleMove {
  constructor(_id, _name, _cooldown, _animation) {
    // static attributes
    this.id = _id;
    this.name = _name;
    this.animation = _animation;
    this.cooldown = _cooldown;
    this.lastUsed = -1;
  }

  canUse(turnNumber) {
    if (this.lastUsed < 0) {
      return true;
    }
    if (turnNumber > this.lastUsed + this.cooldown) {
      return true;
    }
    return false;
  }

  use(turnNumber) {
    this.lastUsed = turnNumber;
  }

  reset() {
    this.lastUsed = -1;
  }
}
