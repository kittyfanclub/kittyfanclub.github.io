class BattleKitty {
  constructor(name, image, canvas, flipped, lifeBar) {
    this.name = name;
    this.image = image;
    this.canvas = canvas;
    this.flipped = flipped;
    this.health = 100;
    this.lifeBar = lifeBar;
  }

  startBattle() {
    this.health = 100;
  }

  takeDamage(damage) {
    this.health = this.health - damage;
    if (this.health < 0) {
      this.health = 0;
    }
    this.showHealth();
  }

  showHealth() {
    if (this.lifeBar != undefined) {
      this.lifeBar.set(this.health);
    }
  }

  reset(damage) {
    this.health = 100;
    this.showHealth();
  }
}
