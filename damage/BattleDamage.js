class BattleDamage {
  constructor(_creature, _damage, _source, _info) {
    this.creature = _creature;
    this.damage = _damage;
    this.source = _source;
    this.info = _info;
  }
}

function computeDamage(creature1, creature2, move1, move2) {
  var damageArr = [];

  var damage = computeAttackDamage(creature1, creature2, move1, move2);
  if (damage != undefined) {
    damageArr.push(damage);
  }

  damage = computeAttackDamage(creature2, creature1, move2, move1);
  if (damage != undefined) {
    damageArr.push(damage);
  }
  return damageArr;
}

function computeAttackDamage(attacker, victim, move, defenseMove) {
  if (move.power != undefined && move.power > 0) {

    // number between -move.dev/100 to move.dev/100
    var devPower = computeDevFactor(move.dev);
    var totalPower = move.power * (1 + devPower);
    var crit = computeIsCritical(move.critChance);

    var damageDesc = "";
    if (crit == true) {
      totalPower = totalPower * 2;
      damageDesc = "Critical Hit";
    }

    var defense = victim.attributes.baseDefense;

    if (defenseMove.protectLevel != undefined && defenseMove.protectLevel > 0) {
      var defenseDevPower = computeDevFactor(move.dev);
      defense = defense + defenseMove.protectLevel * (1 + defenseDevPower);
    }

    /*
    if (victim.battle != undefined && victim.battle.aoeDefense != undefined && victim.battle.aoeDefense > 0) {
      defense = defense + victim.battle.aoeDefense;
    }
    */

    var defenseFactor = 1 - defense / 300;

    var netDamage = Math.round(totalPower * defenseFactor);

    var damageObj = new BattleDamage(victim, netDamage, move.name, damageDesc);
    return damageObj;
  }
  return null;
}

function computeDevFactor(dev) {
  return ((Math.random() * 2 - 1) * dev) / 100;
}

function computeIsCritical(critChance) {
  var rnd = (Math.random()) * 100;
  if (rnd < critChance) {
    return true;
  }
  return false;
}


function applyDamage(damageArr) {
  if (damageArr != undefined) {
    for (var i = 0; i < damageArr.length; i++) {
      var damageEntry = damageArr[i];
      var creature = damageEntry.creature;
      var damage = damageEntry.damage;
      var source = damageEntry.source;
      var info = damageEntry.info;

      creature.battle.currentLife -= damage;

      var desc = source + " " + info + " caused " + damage +  " damage to " + creature.name;
      console.log(desc);

    }
  }
}
