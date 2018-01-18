//requires sounds.js;
//requires battlekitty.js
//requires canvasmovement.js
var cats = [];
var lifeBars = [];
var attackBtn;
var resetBtn;

class Attack {
  constructor(name, cost, damage, damageVariance) {
    this.name = name;
    this.cost = cost;
    this.damage = damage;
    this.damageVariance = damageVariance;
  }

  computeDamage() {
    let rand = Math.floor(Math.random() * this.damageVariance * 2 - this.damageVariance);
    let attackDamage = parseFloat(this.damage) + rand;
    return attackDamage;
  }
}

function addControls(attackButton, resetButton) {
  attackBtn = document.getElementById(attackButton); //.disabled = false;
  resetBtn = document.getElementById(resetButton); //.disabled = false;
}

function useInBattle(imageSource, number, canvas, lifeBarName) {
  var image = document.getElementById(imageSource).children[0];
  updateKittyImage('kitty', image, number, canvas, lifeBarName);
}


function addKitty(name, image, number, canvas, lifeBarName) {
    var flipped = false;
    if (number == 0) {
      flipped = true;
    }
    var lifeBar = new ldBar(lifeBarName);
    cats[number] = new BattleKitty(name, image, canvas, flipped, lifeBar);
    repaintCanvas();
}

function updateKittyImage(name, image, number, canvas, lifeBarName) {
    var flipped = false;
    if (number == 0) {
      flipped = true;
    }
    cats[number].image = image;
    repaintCanvas();
}

function drawRing(ringImage, canvas) {
  //alert(imageUrl);
  var ringImage = getImage('/pics/rrr.png');
  alert(ringImage);

  //var image = getImage('pics/rrr.png');

  var width = ringImage.width,
      height = ringImage.height;
  var context = canvas.getContext("2d");
  alert(width + ":" + height);
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(context,0, 0, canvas.width, canvas.height);
  context.drawImage(ringImage, 0, 0, 100, 100);
/*
    var defTransXOff = 0;
    var defImageXOff = getDefImageXOff(cat);
    if (flip == true) {
      defTransXOff = canvas.width;
      context.setTransform(-1, 0, 0, 1, defTransXOff, 0);
    }
    else {
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
*/
  }

function resetArena() {
  cats[0].reset();
  cats[1].reset();
  drawCat(cats[0]);
  drawCat(cats[1]);
  attackBtn.disabled = false;
}

function repaintCanvas() {
  drawCat(cats[0]);
  drawCat(cats[1]);
}

function attackRound() {
  var attackTime = 800;
  var attackImage = getImage('pics/rrr.png');
  var attackImage2 = getImage('pics/rrr2.png');
  var attack1 = new Attack('scratch', 1, 10, 4);
  var attack2 = new Attack('scratch', 1, 10, 4);
  attackAnimation(cats[0], attackImage2, attackTime);
  attackAnimation(cats[1], attackImage, attackTime);
  playSound('sounds/battle/attack.mp3');
  assignDamage(cats[0], cats[1], attack1, attack2);

  if (checkStatus(cats[0], cats[1], attackTime) == false) {
    playSound('sounds/battle/growl.mp3');
  }
}

function assignDamage(cat1, cat2, attack1, attack2) {
  let cat2Damage = attack1.computeDamage();
  cat2.takeDamage(cat2Damage);

  let cat1Damage = attack2.computeDamage();
  cat1.takeDamage(cat1Damage);
}

function checkStatus(cat1, cat2, attackTime) {
  let done = false;
  let cat1Died = false;
  let cat2Died = false;

  if (cat1.health <= 0) {
    cat1Died = true;
  }
  if (cat2.health <= 0) {
    cat2Died = true;
  }

  if (cat1Died || cat2Died) {
    done = true;
    silence();
  }

  if (done) {
    attackBtn.disabled = true;
    if (cat1Died) {
      deadAnimation(cat1, attackTime);
    }
    else {
      victoryAnimation(cat1, attackTime);
    }

    if (cat2Died) {
      deadAnimation(cat2, attackTime);
    }
    else {
      victoryAnimation(cat2, attackTime);
    }
  }

  return done;
}
