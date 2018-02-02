// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
class LingeringAttackMove extends BattleMove {
  constructor(_id, _name, _cooldown, _power, _lingeringEffectName, _lingeringEffectChance, _lingeringEffectDamage, _dev, _animation, _images) {
    super(_id, _name, _cooldown, _animation, _images);
    this.power = _power;
    this.lingeringEffectName = _lingeringEffectName;
    this.lingeringEffectChance = _lingeringEffectChance;
    this.lingeringEffectDamage = _lingeringEffectDamage;
    this.dev = _dev;
  }

  moveStats() {
    return "(o:" + this.power + "," + this.cooldown + ", " + this.lingeringEffectName + ":" + this.lingeringEffectChance + "," + this.dev + ")";
  }

  clone() {
    var clone = new LingeringAttackMove(this.id, this.name, this.cooldown, this.power, this.lingeringEffectName, this.lingeringEffectChance, this.lingeringEffectDamage, this.dev,
      [this.preAnimation, this.animation, this.postAnimation], this.images);
    return clone;
  }
}
