// display is made up of the following regions:
//
//      stats 1      stats 2
//    |           ||           |           Creature Loader
//    | battle    || battle    |           canvas
//    | creature1 || creature2 |
//    | canvas    || canvas    |           Controls
//    |           ||           |
//     moves1        moves2
//

/*
 canvasinfo contains the following properties
 canvasName - name of the canvas
 canvas - the canvas object
 context - the canvas 2d context
 flip - if the canvas is flipped
 creature - a CreatureDisplay object
*/

var battleCanvasInfo1 = new Object();
var battleCanvasInfo2 = new Object();
var loaderCanvasInfo = new Object();
var battleControls = new Object();
var movesDiv1 = new Object();
var movesDiv2 = new Object();

var showImages = true;


function initCanvases(_battleCanvas1, _battleCanvas2, _loaderCanvas, _movesDiv1, _movesDiv2, _lifeBarName1, _lifeBarName2, _attackBtn) {
  battleControls.attackBtn = document.getElementById(_attackBtn);

  battleCanvasInfo1.canvasName = _battleCanvas1;
  battleCanvasInfo1.canvas = document.getElementById(_battleCanvas1);
  battleCanvasInfo1.context = battleCanvasInfo1.canvas.getContext("2d");
  battleCanvasInfo1.lifeBar = new ldBar(_lifeBarName1);
  battleCanvasInfo1.flip = true;
  battleCanvasInfo1.moves = new Object();
  battleCanvasInfo1.moves.name = _movesDiv1;
  battleCanvasInfo1.moves.div = document.getElementById(_movesDiv1);

  battleCanvasInfo2.canvasName = _battleCanvas2;
  battleCanvasInfo2.canvas = document.getElementById(_battleCanvas2);
  battleCanvasInfo2.context = battleCanvasInfo2.canvas.getContext("2d");
  battleCanvasInfo2.lifeBar = new ldBar(_lifeBarName2);
  battleCanvasInfo2.flip = false;
  battleCanvasInfo2.moves = new Object();
  battleCanvasInfo2.moves.name = _movesDiv2;
  battleCanvasInfo2.moves.div = document.getElementById(_movesDiv2);

  loaderCanvasInfo.canvasName = _loaderCanvas;
  loaderCanvasInfo.canvas = document.getElementById(_loaderCanvas);
  loaderCanvasInfo.context = loaderCanvasInfo.canvas.getContext("2d");
  loaderCanvasInfo.flip = false;

}

// set creatures
function setBattleCreature1(_creature) {
  battleCanvasInfo1.creature = _creature;
  initBattleDisplay(battleCanvasInfo1);
  paintBattleCanvasDefault(battleCanvasInfo1);
  showBattleMoves(battleCanvasInfo1, 0);
  showLifeBar(battleCanvasInfo1);
}

function setBattleCreature2(_creature) {
  battleCanvasInfo2.creature = _creature;
  initBattleDisplay(battleCanvasInfo2);
  paintBattleCanvasDefault(battleCanvasInfo2);
  showBattleMoves(battleCanvasInfo2, 0);
  showLifeBar(battleCanvasInfo2);
}

function setLoaderCreature(_creature) {
  loaderCanvasInfo.creature = _creature;
  initLoaderDisplay(loaderCanvasInfo);
  paintLoaderCanvasDefault(loaderCanvasInfo);
}

function initBattleDisplay(canvasInfo) {
  canvasInfo.creature.display.width = canvasInfo.canvas.width;
  canvasInfo.creature.display.height = canvasInfo.canvas.height;
}

function initLoaderDisplay(canvasInfo) {
  canvasInfo.creature.display.width = canvasInfo.canvas.width / 2;
  canvasInfo.creature.display.height = canvasInfo.canvas.height;
}

function showBattleMoves(battleCanvasInfo, turnNumber) {
  var parent = battleCanvasInfo.moves.div;
  var canvasName = battleCanvasInfo.canvasName;

  var creature = battleCanvasInfo.creature;

  // need to remove old moves
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }

  // add new moves
    var moves = creature.moves.allMoves;
    for (var i = 0; i < moves.length; i++) {
      var move = moves[i];

      // <INPUT TYPE="Radio" Name="attack" value=move.id>move.name
      var newElement = document.createElement("INPUT");
      var radioId = canvasName + "radio_" + move.id;
      newElement.setAttribute("type", "radio");
      newElement.setAttribute("name", canvasName + "move");
      newElement.setAttribute("value", radioId);
      newElement.setAttribute("id", radioId);
      if (move.canUse(turnNumber) != true) {
        newElement.setAttribute("disabled", "true");

      }
      parent.appendChild(newElement);

      // <label for=radioId>move.name</label>
      newElement = document.createElement("LABEL");
      newElement.setAttribute("for", radioId);
      newElement.innerHTML = move.name + " " + move.moveStats() + "<br />";
      parent.appendChild(newElement);
    }
}

function showLifeBar(battleCanvasInfo) {
  var creature = battleCanvasInfo.creature;
  var lifeBar = battleCanvasInfo.lifeBar

  lifeBar.set(creature.battle.currentLife);
}


function getSelectedMove(creatureNumber) {
  var battleCanvas = null;

  if (creatureNumber == 1) {
      battleCanvas = battleCanvasInfo1;
  }
  else if (creatureNumber == 2) {
      battleCanvas = battleCanvasInfo2;
  }
  else {
    return null;
  }
  var canvasName = battleCanvas.canvasName;
  var radioName = canvasName + "move";

  var children = battleCanvas.moves.div.children;
  var moveName = null;
  for (var i = 0; i < children.length; i++) {
    var element = children[i];
    if (element.checked) {
      var id = element.id;
      var pos = id.indexOf("_");
      moveName = id.substring(pos + 1);
      break;
    }
  }

  var moves = battleCanvas.creature.moves.allMoves
  if (moveName != undefined) {
    for (var i = 0; i < moves.length; i++) {
      var move = moves[i];
      if (moveName == move.id) {
        return move;
      }
    }
  }

  return null;
}

function refreshScreenAfterAttack(turnNumber) {
  paintBattleCanvasDefault(battleCanvasInfo1);
  paintBattleCanvasDefault(battleCanvasInfo2);
  showBattleMoves(battleCanvasInfo1, turnNumber);
  showBattleMoves(battleCanvasInfo2, turnNumber);
  showLifeBar(battleCanvasInfo1);
  showLifeBar(battleCanvasInfo2);
}
function paintLoaderCanvasDefault(canvasInfo) {
  if (canvasInfo.creature != undefined) {
    var creatureDisplay = canvasInfo.creature.display;
    var context = canvasInfo.context;
    context.clearRect(0, 0, canvasInfo.canvas.width, canvasInfo.canvas.height);
    if (showImages == true) {
      context.drawImage(creatureDisplay.img, 0, 0, creatureDisplay.height, creatureDisplay.width);
    }

    // show attributes
    var creature = canvasInfo.creature;
    var attributes = creature.attributes;
    var x = creatureDisplay.width - 20;
    var y = 10;
    if (creature.name != undefined) {
      context.fillText('name: ' + creature.name , x, y);
    }
    y += 10;

    context.fillText('life: ' + attributes.life , x, y);
    y += 10;

    context.fillText('defense: ' + attributes.baseDefense , x, y);
    y += 10;

    context.fillText('attacks (pwr, cldwn, crit, dev)', x, y);
    y += 10;

    var moves = creature.moves.attackMoves;
    for (var i = 0; i < moves.length; i++) {
      var move = moves[i];
      var desc = "     " + move.name + move.moveStats(); //"(" + move.power + "," + move.cooldown + "," + move.critChance + "," + move.dev + ")";
      context.fillText(desc, x, y);
      y += 10;
    }

    context.fillText('defense (pwr, cldwn, turns, dev)', x, y);
    y += 10;

    var moves = creature.moves.defenseMoves;
    for (var i = 0; i < moves.length; i++) {
      var move = moves[i];
      var desc = "     " + move.name + move.moveStats(); //"(" + move.protectLevel + "," + move.cooldown + "," + move.duration + "," + move.dev + ")";
      context.fillText(desc, x, y);
      y += 10;
    }

    //canvasInfo.context.fillStyle = '#D3D3D3';
    //canvasInfo.context.fillRect(0, 0, canvasInfo.canvas.width, canvasInfo.canvas.height);
  }
}

function paintBattleCanvasDefault(canvasInfo) {
  if (canvasInfo.creature != undefined) {
    if (canvasInfo.flip == true) {
      var defTransXOff = canvasInfo.canvas.width;
      canvasInfo.context.setTransform(-1, 0, 0, 1, defTransXOff, 0);
    }
    var creatureDisplay = canvasInfo.creature.display;
    canvasInfo.context.clearRect(0, 0, canvasInfo.canvas.width, canvasInfo.canvas.height);
    if (showImages == true) {
      canvasInfo.context.drawImage(creatureDisplay.img, 0, 0, creatureDisplay.height, creatureDisplay.width);
    }

    //canvasInfo.context.fillStyle = '#D3D3D3';
    //canvasInfo.context.fillRect(0, 0, canvasInfo.canvas.width, canvasInfo.canvas.height);
  }
}

function animateAttack(parentCallback, move1, move2) {
  var attackTime = 5.5 * battleCanvasInfo1.canvas.width;
  var attack1 = g_AniRunAttack;
  var attack2 = g_AniRunAttack;

  if (move1 != undefined && move1.animation != undefined) {
    attack1 = move1.animation;
  }
  if (move2 != undefined && move2.animation != undefined) {
    attack2 = move2.animation;
  }

  var callbackCount = 0;
  var callback = function(battleCanvasInfo) {
    callbackCount++;
    if (callbackCount >= 2) {
      paintBattleCanvasDefault(battleCanvasInfo1);
      paintBattleCanvasDefault(battleCanvasInfo2);
      parentCallback();
    }
  }

  if (showImages == true) {
    attack1(battleCanvasInfo1, attackTime, callback, move1);
    attack2(battleCanvasInfo2, attackTime, callback, move2);
  }
  else {
    // just do callbacks
    callback(battleCanvasInfo1);
    callback(battleCanvasInfo2);
  }
}

function disableAttackBtn(disable) {
  battleControls.attackBtn.disabled = disable;
}
function displayEndGame(dead1, dead2) {
  var callback = function() {
    
  }
  var time = 5000;
  if (dead1) {
    aniLoser(battleCanvasInfo1, time, callback, true);
  }
  else {
    aniWinner(battleCanvasInfo1, time, callback, true);
  }
  if (dead2) {
    aniLoser(battleCanvasInfo2, time, callback, false);
  }
  else {
    aniWinner(battleCanvasInfo2, time, callback, false);
  }
}
