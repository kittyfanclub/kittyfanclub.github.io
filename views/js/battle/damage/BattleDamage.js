// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
class BattleDamage {
  constructor(_creature, _damage, _source, _info, _lingeringEffect) {
    this.creature = _creature;
    this.damage = _damage;
    this.source = _source;
    this.info = _info;
    this.lingeringEffect = _lingeringEffect;
  }
}

class LingeringEffectDamage {
  constructor(_name, _damage) {
    this.name = _name;
    this.damage = _damage;
  }
}

function computeDamage(creature1, creature2, move1, move2) {
  var damageArr = [];

  var heal = computeHeal(creature1, move1);
  if (heal != undefined) {
    damageArr.push(heal);
  }

  heal = computeHeal(creature2, move2);
  if (heal != undefined) {
    damageArr.push(heal);
  }

  // attack damage received by creature 2
  var damage = computeAttackDamage(creature1, creature2, move1, move2);
  if (damage != undefined) {
    damageArr.push(damage);
  }

  // lingering effects of previous attacks received by creature 2
  damage = computeBleedDamage(creature2);
  if (damage != undefined) {
    for (var i = 0; i < damage.length; i++) {
      damageArr.push(damage[i]);
    }
  }

  // attack damage received by creature 1
  damage = computeAttackDamage(creature2, creature1, move2, move1);
  if (damage != undefined) {
    damageArr.push(damage);
  }

  // lingering effects of previous attacks received by creature 1
  damage = computeBleedDamage(creature1);
  if (damage != undefined) {
    for (var i = 0; i < damage.length; i++) {
      damageArr.push(damage[i]);
    }
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


    // determine lingering effect
    var lingering = computeIsCritical(move.lingeringEffectChance);
    var lingeringEffect = null;
    if (lingering == true) {
      damageDesc = "with " + move.lingeringEffectName;
      lingeringEffect = new LingeringEffectDamage(move.lingeringEffectName, move.lingeringEffectDamage);
      victim.battle.lingeringEffects.push(lingeringEffect);
    }

    var damageObj = new BattleDamage(victim, netDamage, move.name, damageDesc, lingeringEffect);
    return damageObj;
  }
  return null;
}

function computeBleedDamage(creature) {
  // look at lingering effects to compute bleed damage

  if (creature.battle.lingeringEffects != undefined) {
    var effects = creature.battle.lingeringEffects;
    if (effects.length > 0) {
      var damageArr = [];
      for (var i = 0; i < effects.length; i++) {
        var eff = effects[i];
        var damageObj = new BattleDamage(creature, eff.damage, eff.name, "", null);
        damageArr.push(damageObj);
      }
      return damageArr;
    }
  }
  return null;
}

function computeHeal(creature, move) {
  // check if this is a heal move
  if (move.healLevel != undefined && move.healLevel > 0) {
    // clear all lingering effects
    creature.clearLingeringEffects();

    // compute healing
    // number between -move.dev/100 to move.dev/100
    var devHeal = computeDevFactor(move.dev);
    var totalHeal = Math.round(move.healLevel * (1 + devHeal));

    var damageObj = new BattleDamage(creature, -totalHeal, move.name, "", null);

    return damageObj;
  }

}


function computeDevFactor(dev) {
  return ((Math.random() * 2 - 1) * dev) / 100;
}

function computeIsCritical(critChance) {
  var rnd = (Math.random()) * 100;
  if (critChance != undefined && rnd < critChance) {
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

      var lifePercent = creature.battle.currentLife / creature.attributes.life;
      creature.display.lifeUpdated(lifePercent);

      var desc = source + " " + info + " caused " + damage +  " damage to " + creature.name;
      if (damage < 0) {
        desc = source + " " + info + " healed " + creature.name + " for " + (-damage) +  " life ";
      }
      addToBattleLog(desc);
      console.log(desc);

    }
  }
}
