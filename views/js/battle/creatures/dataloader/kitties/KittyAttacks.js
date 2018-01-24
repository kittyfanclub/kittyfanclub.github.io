function buildAttackMoves(genetics, primaryAttack1, primaryAttack2, secondaryAttack, specialAttacks) {
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
  var attack3 = getSecondaryAttack(codes1);
  if (attack3 != undefined) {
    attackArray.push(attack3.clone());
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
  var attackPower = getPower(10, attackModifier, 2);
  var critChance = getCritChance(attackCrit);
  var devPerc = getDevPerc(attackCrit, attackDev);
  var cooldown = 1;
  switch (attackCode) {
    case 0: return new AttackMove("claw", "claw", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 1: return new AttackMove("scratch", "scratch", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 2: return new AttackMove("bite", "bite", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 3: return new AttackMove("tackle", "tackle", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 4: return new AttackMove("kick", "kick", cooldown, attackPower, critChance, devPerc, g_AniJumpTowardAttack);
    case 5: return new AttackMove("spit", "spit", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 6: return new AttackMove("nibble", "nibble", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 7: return new AttackMove("swipe", "swipe", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 8: return new AttackMove("leap", "leap", cooldown, attackPower, critChance, devPerc, g_AniJumpTowardAttack);
    case 9: return new AttackMove("slam", "slam", cooldown, attackPower, critChance, devPerc, g_AniJumpTowardAttack);
    case 10: return new AttackMove("tailwhip", "tail whip", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 11: return new AttackMove("tailthump", "tail thump", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 12: return new AttackMove("pounce", "pounce", cooldown, attackPower, critChance, devPerc, g_AniJumpTowardAttack);
    case 13: return new AttackMove("poke", "poke", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 14: return new AttackMove("hump", "hump", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 15: return new AttackMove("lick", "lick", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
  }
  return null;
}

function getSecondaryAttack(attackArray) {
  var attackCode = attackArray[0];
  var attackModifier = attackArray[1];
  var attackCrit = attackArray[2];
  var attackDev = attackArray[3];

  //constructor(_name, _cooldown, _power, _critChance, _dev) {
  var attackPower = getPower(20, attackModifier, 5);
  var critChance = getCritChance(attackCrit);
  var devPerc = getDevPerc(attackCrit, attackDev);
  var cooldown = 2;
  switch (attackCode) {
    case 0: return new AttackMove("stare", "stare", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 1: return new AttackMove("lookconfused", "look confused", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 2: return new AttackMove("steal", "steal", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 3: return new AttackMove("chasetail", "chase tail", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 4: return new AttackMove("taunt", "taunt", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 5: return new AttackMove("lookdumb", "look dumb", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 6: return new AttackMove("tease", "tease", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 7: return new AttackMove("groom", "groom", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 8: return new AttackMove("sniffbutt", "sniff butt", cooldown, attackPower, critChance, devPerc, g_AniRunAttack);
    case 9: return new AttackMove("spilllitter", "spill litter", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 10: return new AttackMove("knockofftable", "knock off table", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 11: return new AttackMove("chaseball", "chase ball", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 12: return new AttackMove("chasenothing", "chase nothing", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
    case 13: return new AttackMove("lookwise", "look wise", cooldown, attackPower, critChance, devPerc, g_AniStationaryAttack);
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

  var dPower = getPower(50, dModifier, 30);
  var duration = getDefenseDuration(dTime);
  var devPerc = getDevPerc(dTime, dDev);

  var cooldown = duration + 1;
  //   constructor(_name, _cooldown, _protectLevel, _dev, _duration)
  switch (dCode) {
    case 0: return new DefenseMove("hideinbox", "hide in box", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 1: return new DefenseMove("blamedog", "blame dog", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 2: return new DefenseMove("runaway", "run away", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 3: return new DefenseMove("hideundersofa", "hide under sofa", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 4: return new DefenseMove("sleep", "sleep", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 5: return new DefenseMove("hideinbag", "hide in bag", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 6: return new DefenseMove("climbtree", "climb tree", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 7: return new DefenseMove("hideundercar", "hide under car", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 8: return new DefenseMove("gotolitterbox", "goto litter box", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 9: return new DefenseMove("dance", "dance", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 10: return new DefenseMove("vomit", "vomit", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 11: return new DefenseMove("hairball", "hairball", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 12: return new DefenseMove("imnotacat", "im not a cat", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 13: return new DefenseMove("ignore", "ignore", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 14: return new DefenseMove("fallofftable", "fall off table", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
    case 15: return new DefenseMove("climbwall", "climb wall", cooldown, dPower, devPerc, duration, g_AniFallDownAttack);
  }
  return null;
}


function getPower(base, modifier, max) {
  // base +- max
  return base +  Math.round((modifier - 7) / (8 / max));
}

function getCritChance(attackCrit) {
  // number between 5 and 20
  return attackCrit + 5;
}

function getDevPerc(attackCrit, attackDev) {
  // number between 10 and 50
  return 10 + (((attackCrit + 1) * (attackDev + 1)) % 40);
}

function getDefenseDuration(dTime) {
  // number between 1 and 3
  return (dTime % 3) + 1;
}
