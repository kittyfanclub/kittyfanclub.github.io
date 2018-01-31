// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt

var battleGameCreature1;
var battleGameCreature2;
var g_battleRound = 1;

function initGame(_battleCanvas1, _battleCanvas2, _loaderCanvas, _movesDiv1, _movesDiv2, _lifeBarName1, _lifeBarName2, _attackBtn) {
  initCanvases(_battleCanvas1, _battleCanvas2, _loaderCanvas, _movesDiv1, _movesDiv2, _lifeBarName1, _lifeBarName2, _attackBtn);
  disableAttackBtn(true);
}

function resetArena() {
  if (battleGameCreature1 != undefined && battleGameCreature2 != undefined) {
    g_battleRound = 1;
    battleGameCreature1.startBattle();
    battleGameCreature2.startBattle();
    refreshScreenAfterAttack(0);
    disableAttackBtn(false);
  }
}



function loadEntryCreature(id) {
  var callbackFunction = function(creature) {
    console.log(creature);
    setLoaderCreature(creature);
  }
  // this global function must be declared by one of the loaded js files
  g_creatureBuilderFunction(id, callbackFunction);
}

function useInBattle(number) {
  if (loaderCanvasInfo.creature != undefined) {
    if (number == 1) {
      battleGameCreature1 = loaderCanvasInfo.creature.clone();
      setBattleCreature1(battleGameCreature1);
    }
    else if (number == 2) {
      battleGameCreature2 = loaderCanvasInfo.creature.clone();
      setBattleCreature2(battleGameCreature2);
    }
    resetArena();
  }
}
function attackRound() {
  // get attack 1
  var move1 = getSelectedMove(1);

  // get attack 2
  var move2 = getSelectedMove(2);

  // validate attacks
  if (move1 == undefined || move2 == undefined) {
    return;
  }

  var animateComplete = function() {
    // compute damage
    var damage = computeDamage(battleGameCreature1, battleGameCreature2, move1, move2);

    applyDamage(damage);

    // update attacks
    move1.use(g_battleRound);
    move2.use(g_battleRound);

    g_battleRound++;
    // update screen
    refreshScreenAfterAttack(g_battleRound);

    // check for death
    deadCheck();

  }
  // animate attack
  animateAttack(animateComplete, move1, move2);

}
function dead() {
  battleGameCreature1.battle.currentLife = -1;
  deadCheck();
}

function deadCheck() {
  var dead1 = false;
  var dead2 = false;
  if (battleGameCreature1.battle.currentLife <= 0) {
    dead1 = true;
  }
  if (battleGameCreature2.battle.currentLife <= 0) {
    dead2 = true;
  }

  if (dead1 || dead2) {
    displayEndGame(dead1, dead2);
    disableAttackBtn(true);
  }
}

/*
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
*/
/*
function updateKittyImage(name, image, number, canvas, lifeBarName) {
    var flipped = false;
    if (number == 0) {
      flipped = true;
    }
    cats[number].image = image;
    repaintCanvas();
}
*/
