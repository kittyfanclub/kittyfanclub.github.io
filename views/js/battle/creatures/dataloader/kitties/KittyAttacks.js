// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
function buildAttackMoves(genetics, primaryAttack1, primaryAttack2, secondaryAttack, tertiaryAttack) {
  var attackArray = [];

  // primary attacks
  var attackSet1 = getGeneticSet(genetics, primaryAttack1);
  var codes1 = getAttackCodes(attackSet1);
  var attackId1 = codes1[0];
  var attack1 = getPrimaryAttack(codes1);
  if (attack1 != undefined) {
    attackArray.push(attack1.clone());
  }

  var attackSet2 = getGeneticSet(genetics, primaryAttack2);
  var codes2 = getAttackCodes(attackSet2, attackId1);
  if (codes2 != undefined) {
    var attack2 = getPrimaryAttack(codes2);
    if (attack2 != undefined) {
      attackArray.push(attack2.clone());
    }
  }

  var attackSet3 = getGeneticSet(genetics, secondaryAttack);
  var codes3 = getAttackCodes(attackSet3);
  var attack3 = getSecondaryAttack(codes3);
  if (attack3 != undefined) {
    attackArray.push(attack3.clone());
  }

  var attackSet4 = getGeneticSet(genetics, tertiaryAttack);
  var codes4 = getAttackCodes(attackSet4);
  var attack4 = getTertiaryAttack(codes4);
  if (attack4 != undefined) {
    attackArray.push(attack4.clone());
  }


  return attackArray;
}

function getAttackCodes(attackSet, conflictAttack) {
  var codeArr = [];
  codeArr.push(getGeneticSetElement(attackSet, 0));
  codeArr.push(getGeneticSetElement(attackSet, 1));
  codeArr.push(getGeneticSetElement(attackSet, 2));
  codeArr.push(getGeneticSetElement(attackSet, 3));

  if (conflictAttack != undefined) {
    // if this attack conflicts with another attack, then adjust this one
    var curAttack = 0;
    for (; curAttack < 4; curAttack++) {
      if (codeArr[curAttack] != conflictAttack) {
        break;
      }
    }
    // shift if necessary
    if (curAttack >= 4) {
      // no attack for you!
      return null;
    }
    for (var i = 0; i < curAttack; i++) {
      var moveMe = codeArr[0];
      // remove from begining
      codeArr.splice(0, 1);
      // push to end
      codeArr.push(moveMe);
    }
  }
  return codeArr;
}

function getPrimaryAttack(attackArray) {
  var attackCode = attackArray[0];
  var attackModifier = attackArray[1];
  var attackCrit = attackArray[2];
  var attackDev = attackArray[3];

  //constructor(_name, _cooldown, _power, _critChance, _dev) {
  var attackPower = getPower(10, attackModifier, 4);
  var critChance = getCritChance(attackCrit);
  var devPerc = getDevPerc(attackCrit, attackDev);
  var cooldown = 1;
  switch (attackCode) {
    // ok
    case 0: return new AttackMove("claw", "claw", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    // ok
    case 1: return new AttackMove("scratch", "scratch", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    // ok
    case 2: return new AttackMove("bite", "bite", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    // ok
    case 3: return new AttackMove("tackle", "tackle", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    // ok
    case 4: return new AttackMove("kick", "kick", cooldown, attackPower, critChance, devPerc, g_AniJumpTowardAttack);
    // ok
    case 5: return new AttackMove("nip", "nip", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    // ok
    case 6: return new AttackMove("nibble", "nibble", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    // ok
    case 7: return new AttackMove("swipe", "swipe", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    // good
    case 8: return new AttackMove("leap", "leap", cooldown, attackPower, critChance, devPerc, g_AniJumpTowardAttack);
    // ok
    case 9: return new AttackMove("slam", "slam", cooldown, attackPower, critChance, devPerc, g_AniJumpTowardAttack);
    // good
    case 10: return new AttackMove("tailwhip", "tail whip", cooldown, attackPower, critChance, devPerc, g_AniSpinAttack);
    // good
    case 11: return new AttackMove("tailthump", "tail thump", cooldown, attackPower, critChance, devPerc, g_AniCartwheelAttack);
    // good
    case 12: return new AttackMove("pounce", "pounce", cooldown, attackPower, critChance, devPerc, g_AniJumpTowardAttack);
    // ok
    case 13: return new AttackMove("poke", "poke", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    // good
    case 14: return new AttackMove("windmill", "windmill", cooldown, attackPower, critChance, devPerc, g_AniFastSpin);
    // ok
    case 15: return new AttackMove("swat", "swat", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
  }
  return null;
}

function getSecondaryAttack(attackArray) {
  var attackCode = attackArray[0];
  var attackModifier = attackArray[1];
  var attackCrit = attackArray[2] * 2;
  var attackDev = attackArray[3];


  //class LingeringAttackMove extends BattleMove {
  //constructor(_id, _name, _cooldown, _power, _lingeringEffectName, _lingeringEffectChance, _lingeringEffectDamage, _dev, _animation, _images) {

  //constructor(_name, _cooldown, _power, _critChance, _dev) {
  var attackPower = getPower(14, attackModifier, 6);
  var lingeringChance = getCritChance(attackCrit, 30);
  var devPerc = getDevPerc(attackCrit, attackDev);
  var cooldown = 3;

  var lingeringName = "bleeding";
  var lingeringDamage = 2;

  switch (attackCode) {
    // all bad
    case 0: return new LingeringAttackMove("aikido", "aikido", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 1:
      lingeringName = "hurt back";
      return new LingeringAttackMove("judo", "judo", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 2:
      lingeringName = "ninja terror";
      return new LingeringAttackMove("ninjutsu", "ninjutsu", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 3:
      lingeringName = "bad smell";
      return new LingeringAttackMove("sumo", "sumo", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 4: return new LingeringAttackMove("taekwondo", "taekwondo", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 5: return new LingeringAttackMove("mukna", "mukna", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 6: return new LingeringAttackMove("muaythai", "muay thai", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 7:
      lingeringName = "broken nose";
      return new LingeringAttackMove("kravmaga", "krav maga", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniRunAttack);
    case 8: return new LingeringAttackMove("hapkido", "hapkido", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniRunAttack);
    case 9:
      lingeringName = "broken jaw";
      return new LingeringAttackMove("boxing", "boxing", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 10: return new LingeringAttackMove("hungga", "hung ga", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 11: return new LingeringAttackMove("cuongnhu", "cuong nhu", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 12: return new LingeringAttackMove("bando", "bando", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 13: return new LingeringAttackMove("khridoli", "khridoli", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 14: return new LingeringAttackMove("limalama ", "limalama", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
    case 15: return new LingeringAttackMove("bultong", "bultong", cooldown, attackPower, lingeringName, lingeringChance, lingeringDamage, devPerc, g_AniStationaryAttack);
  }
  return null;
}


function getTertiaryAttack(attackArray) {
  var attackCode = attackArray[0];
  var attackModifier = attackArray[1];
  var attackCrit = attackArray[2];
  var attackDev = attackArray[3];

  //constructor(_name, _cooldown, _power, _critChance, _dev) {
  var attackPower = getPower(18, attackModifier, 6);
  var critChance = getCritChance(attackCrit);
  var devPerc = getDevPerc(attackCrit, attackDev);
  var cooldown = 4;
  switch (attackCode) {
    // all bad
    case 0: return new AttackMove("purr", "purr", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 1: return new AttackMove("growl", "growl", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 2: return new AttackMove("hiss", "hiss", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 3: return new AttackMove("meow", "meow", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 4: return new AttackMove("wagtailfast", "wag tail fast", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 5: return new AttackMove("ignore", "ignore", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 6: return new AttackMove("crouch", "crouch", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 7: return new AttackMove("stare", "stare", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 8: return new AttackMove("groom", "groom", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 9: return new AttackMove("howl", "howl", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 10: return new AttackMove("blink", "blink", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 11: return new AttackMove("cat", "cat", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 12: return new AttackMove("catcat", "catcat", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 13: return new AttackMove("catcatcat", "catcatcat", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 14: return new AttackMove("lookangry", "look angry", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 15: return new AttackMove("layinsun", "lay in sun", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
  }
  return null;
}


function buildDefenseMoves(genetics, primaryDefense) {
  var defenseArray = [];

  // primary defense
  var defenseSet1 = getGeneticSet(genetics, primaryDefense);
  var codes1 = getAttackCodes(defenseSet1);
  var defense1 = getDefense(codes1);
  if (defense1 != undefined) {
    defenseArray.push(defense1.clone());
  }

  return defenseArray;
}

function getDefense(dArray) {
  var dCode = dArray[0];
  var dModifier = dArray[1];
  var dTime = dArray[2];
  var dDev = dArray[3];

  var dPower = getPower(150, dModifier, 100);
  var duration = 1;
  var devPerc = getDevPerc(dTime, dDev);

  //   constructor(_name, _cooldown, _protectLevel, _dev, _duration)
  switch (dCode) {
    case 0:
      var img = new Image();
      img.src = "pics/cardboardbox.png";
      return new DefenseMove("hideinbox", "hide in box", duration + 1, dPower, devPerc, duration, g_AniHideAttack, img);
    case 1:
      return new DefenseMove("blamedog", "blame dog", duration + 1, dPower, devPerc, duration, g_AniFallDownAttack);
    case 2:
      duration = 2;
      dPower = getPower(100, dModifier, 60);
      return new DefenseMove("fleas", "fleas", duration + 1, dPower, devPerc, duration, g_AniFallDownAttack);
    case 3:
      var img = new Image();
      img.src = "pics/sofa.png";
      return new DefenseMove("hideundersofa", "hide under sofa", duration + 1, dPower, devPerc, duration, g_AniHideAttack, img);
    case 4:
      return new DefenseMove("sleep", "sleep", duration + 1, dPower, devPerc, duration, g_AniFallDownAttack);
    case 5:
      var img = new Image();
      img.src = "pics/grocerybag.png";
      return new DefenseMove("hideinbag", "hide in bag", duration + 1, dPower, devPerc, duration, g_AniHideAttack, img);
    case 6:
      return new DefenseMove("climbtree", "climb tree", duration + 1, dPower, devPerc, duration, g_AniFallDownAttack);
    case 7:
      var img = new Image();
      img.src = "pics/car.png";
      return new DefenseMove("hideundercar", "hide under car", duration + 1, dPower, devPerc, duration, g_AniHideAttack, img);
    case 8:
      var img = new Image();
      img.src = "pics/litterbox.png";
      return new DefenseMove("gotolitterbox", "goto litter box", duration + 1, dPower, devPerc, duration, g_AniGotoAttack, img);
    case 9:
      duration = 2;
      dPower = getPower(100, dModifier, 80);
      return new DefenseMove("dance", "dance", duration + 1, dPower, devPerc, duration, g_AniFallDownAttack);
    case 10:
      duration = 5;
      dPower = getPower(50, dModifier, 20);
      return new DefenseMove("vomit", "vomit", duration + 2, dPower, devPerc, duration, g_AniFallDownAttack);
    case 11:
      duration = 3;
      dPower = getPower(80, dModifier, 30);
      return new DefenseMove("hairball", "hairball", duration + 2, dPower, devPerc, duration, g_AniFallDownAttack);
    case 12:
      var img = new Image();
      img.src = "pics/dog.png";
      return new DefenseMove("imnotacat", "im not a cat", duration + 1, dPower, devPerc, duration, g_AniHideAttack, img);
    case 13:
      return new DefenseMove("runaway", "run away", duration + 1, dPower, devPerc, duration, g_AniRunAway);
    case 14:
      return new DefenseMove("falldown", "fall down", duration + 1, dPower, devPerc, duration, g_AniFallDownAttack);
    case 15:
      return new DefenseMove("climbwall", "climb wall", duration + 1, dPower, devPerc, duration, g_AniFallDownAttack);
  }
  return null;
}

function buildHealMoves(genetics, healMove) {
  var healArray = [];

  // primary defense
  var healSet = getGeneticSet(genetics, healMove);
  var codes = getAttackCodes(healSet);
  var heal = getHeal(codes);
  if (heal != undefined) {
    healArray.push(heal.clone());
  }

  return healArray;
}

function getHeal(dArray) {
  var dCode = dArray[0];
  var dModifier = dArray[1];
  var dTime = dArray[2];
  var dDev = dArray[3];

  var dPower = getPower(20, dModifier, 10);
  var cooldown = 5;
  var devPerc = getDevPerc(dTime, dDev);

  // TODO: build lick animation
  return new HealMove("lickwounds", "lick wounds", cooldown, dPower, devPerc, g_AniStationaryAttack);
}

function getPower(base, modifier, max) {
  // base +- max
  // modifier is a value between 0 and 15

  // offset will be between -1 and 1
  var offset = modifier * 2 / 15 - 1;
  var factor = offset * max;

  return Math.round(base +  factor);
}

function getCritChance(attackCrit, offset) {
  if (offset == undefined) {
    offset = 5;
  }
  // number between offset and 15 + offset
  return attackCrit + offset;
}

function getDevPerc(attackCrit, attackDev) {
  // number between 10 and 50
  return 10 + (((attackCrit + 1) * (attackDev + 1)) % 40);
}

function getDefenseDuration(dTime) {
  // number between 1 and 3
  return (dTime % 3) + 1;
}
