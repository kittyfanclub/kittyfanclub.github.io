// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
var g_instanceId = 1;
class BattleMove {
  constructor(_id, _name, _cooldown, _animation, _images) {
    // static attributes
    this.instanceId = g_instanceId++;
    this.id = _id;
    this.name = _name;
    this.preAnimation = null;
    this.postAnimation = null;

    if (Array.isArray(_animation)) {
      if (_animation.length > 0) {
        this.preAnimation = _animation[0];
      }
      if (_animation.length > 1) {
        this.animation = _animation[1];
      }
      if (_animation.length > 2) {
        this.postAnimation = _animation[2];
      }

    }
    else {
      this.animation = _animation;
    }
    this.cooldown = _cooldown;
    this.lastUsed = -1;
    this.images = _images;
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
