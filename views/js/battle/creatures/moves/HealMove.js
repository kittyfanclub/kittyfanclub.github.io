// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
class HealMove extends BattleMove {
  constructor(_id, _name, _cooldown, _healLevel, _dev, _animation, _images) {
    super(_id, _name, _cooldown, _animation, _images);
    this.healLevel = _healLevel;
    this.dev = _dev;
  }

  moveStats() {
    return "(h:" + this.healLevel + "," + this.cooldown + "," + this.dev + ")";
  }
  clone() {
    var clone = new HealMove(this.id, this.name, this.cooldown, this.healLevel, this.dev, this.animation, this.images);
    return clone;
  }
}
