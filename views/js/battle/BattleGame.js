
var battleGameCreature1;
var battleGameCreature2;
var g_battleRound = 1;

function initGame(_battleCanvas1, _battleCanvas2, _loaderCanvas, _movesDiv1, _movesDiv2, _lifeBarName1, _lifeBarName2) {
  initCanvases(_battleCanvas1, _battleCanvas2, _loaderCanvas, _movesDiv1, _movesDiv2, _lifeBarName1, _lifeBarName2);
}

function resetBattle() {
  g_battleRound = 1;
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
      battleGameCreature1 = loaderCanvasInfo.creature;
      setBattleCreature1(loaderCanvasInfo.creature);
    }
    else if (number == 2) {
      battleGameCreature2 = loaderCanvasInfo.creature;
      setBattleCreature2(loaderCanvasInfo.creature);
    }
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

  }
  // animate attack
  animateAttack(animateComplete, move1, move2);

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
