// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
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
