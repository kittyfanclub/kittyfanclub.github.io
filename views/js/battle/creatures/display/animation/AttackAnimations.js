function aniJumpAttackOld(canvasInfo, attackTime, callbackFunction) {
  let start = Date.now();
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var defImageXOff = 0; //getDefImageXOff(canvasInfo);
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, defImageXOff, 0, height, width);
  let totaltime = attackTime;
  let intervals = 40;
  let intervalTime = attackTime / intervals;
  let xfactor = intervals / 5;
  let yfactor = intervals / 4;


  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (timePassed < totaltime/2) {
      k1xLoc = -timePassed / xfactor;
      k1yLoc = -timePassed / yfactor;
      k2xLoc = -timePassed / xfactor;
      k2yLoc = -timePassed / yfactor;
    }
    else {
      k1xLoc = -(totaltime - timePassed) / xfactor;
      k1yLoc = -(totaltime - timePassed) / yfactor;
      k2xLoc = -(totaltime - timePassed) / xfactor;
      k2yLoc = -(totaltime - timePassed) / yfactor;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, defImageXOff + k1xLoc, k1yLoc, height, width);
    //context.drawImage(attackImage, defImageXOff + 30, 50, 50, 20);
    if (timePassed > totaltime) {
      clearInterval(timer);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, defImageXOff + k1xLoc, k1yLoc, height, width);
      callbackFunction(canvasInfo);
    }

  }, 20);
}

var g_AniJumpTowardAttack =
function aniJumpTowardAttack(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, 1, 1);
}

var g_AniRunAttack =
function aniRunAttack(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, 1, 0);
}

var g_AniJumpUpAttack =
function aniRunAttack(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, 0, 1);
}

var g_AniStationaryAttack =
function aniRunAttack(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, 0, 0);
}

// fix me
var g_AniFallDownAttack = g_AniStationaryAttack;


function aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, xPercent, yPercent) {
  let start = Date.now();
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var defImageXOff = 0; //getDefImageXOff(canvasInfo);
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, defImageXOff, 0, height, width);
  let totaltime = attackTime;
  let intervals = 40;
  let intervalTime = attackTime / intervals;
  let xfactor = intervals / 5 * xPercent;
  let yfactor = intervals / 4 * yPercent;

  var k1xLoc = 0;
  var k1yLoc = 0;

  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (timePassed < totaltime/2) {
      if (xfactor != 0) {
        k1xLoc = -timePassed / xfactor;
      }
      if (yfactor != 0) {
        k1yLoc = -timePassed / yfactor;
      }
    }
    else {
      if (xfactor != 0) {
        k1xLoc = -(totaltime - timePassed) / xfactor;
      }
      if (yfactor != 0) {
        k1yLoc = -(totaltime - timePassed) / yfactor;
      }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, defImageXOff + k1xLoc, k1yLoc, height, width);
    //context.drawImage(attackImage, defImageXOff + 30, 50, 50, 20);
    if (timePassed > totaltime) {
      clearInterval(timer);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, defImageXOff + k1xLoc, k1yLoc, height, width);
      callbackFunction(canvasInfo);
    }

  }, 20);
}
