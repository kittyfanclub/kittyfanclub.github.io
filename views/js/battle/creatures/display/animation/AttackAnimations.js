// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
var g_AniJumpTowardAttack =
function aniJumpTowardAttack(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, 1, 1);
}

var g_AniRunAttack =
function aniRunAttack(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, 1, 0);
}

var g_AniRunAway =
function aniRunAway(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, -0.25, 0);
}

var g_AniJumpUpAttack =
function aniRunAttack(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, 0, 1);
}

var g_AniStationaryAttack =
function aniRunAttack(canvasInfo, attackTime, callbackFunction) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, 0, 0);
}


var g_aniHideImage = function aniHideImage(canvasInfo, attackTime, callbackFunction, attack) {
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var defImageXOff = 0;
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;
  canvasInfo.creature.display.removeLastImage();
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawImageStack(image, context, defImageXOff, 0, width, height);
  callbackFunction();
}


var g_aniLoadImage =
function aniLoadImage(canvasInfo, attackTime, callbackFunction, attack) {

  let start = Date.now();
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var defImageXOff = 0;
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;
  var loadImg = attack.images;

  context.clearRect(0, 0, canvas.width, canvas.height);
  // draw image
  if (loadImg != undefined) {
    canvasInfo.creature.display.addImage(loadImg);
  }
  var image = canvasInfo.creature.display.img;
  drawImageStack(image, context, defImageXOff, 0, width, height);


  let totaltime = attackTime;

  // wait until time is done
  let timer = setInterval(function() {
    drawImageStack(image, context, defImageXOff, 0, width, height);
    let timePassed = Date.now() - start;
    if (timePassed > totaltime) {
      clearInterval(timer);
      callbackFunction(canvasInfo);
    }

  }, 100);
}

var g_AniGotoAttack =
function aniHideAttack(canvasInfo, attackTime, callbackFunction, attack) {
  // need to store the hiding place image
  var hidingPlace = null;

  let start = Date.now();
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var defImageXOff = 0;
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;
  var hidingImg = attack.images;

  context.clearRect(0, 0, canvas.width, canvas.height);
  // draw goto place
  if (hidingImg != undefined) {
    context.drawImage(hidingImg, defImageXOff, 0, height, width);
  }
  drawImageStack(image, context, defImageXOff, 0, width, height)


  let totaltime = attackTime;

  // wait until time is done
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (timePassed > totaltime) {
      clearInterval(timer);
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawImageStack(image, context, 0, 0, width, height)
      callbackFunction(canvasInfo);
    }

  }, 100);
}

var g_AniHideAttack =
function aniHideAttack(canvasInfo, attackTime, callbackFunction, attack) {
  let start = Date.now();
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var defImageXOff = 0;
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;
  var hidingImg = attack.images;

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawImageStack(image, context, defImageXOff, 0, width, height)

  // draw hiding place
  if (hidingImg != undefined) {
    drawImageStack(hidingImg, context, defImageXOff, 0, width, height)
  }

  let totaltime = attackTime;

  // wait until time is done
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (timePassed > totaltime) {
      clearInterval(timer);
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawImageStack(image, context, 0, 0, width, height)
      callbackFunction(canvasInfo);
    }

  }, 100);
}

var g_AniMoveObjectUp =
function aniMoveObjectUp(canvasInfo, attackTime, callbackFunction, attack) {
  aniMoveObjectOnTop(canvasInfo, attackTime, callbackFunction, attack, 0, 1, false);
}

var g_AniMoveObjectForwardAttack =
function aniRunAttack(canvasInfo, attackTime, callbackFunction, attack) {
  aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, attack, 1, 0, true);
}

function aniMoveObjectOnTop(canvasInfo, attackTime, callbackFunction, attack, xPercent, yPercent, returnObject) {
  let start = Date.now();
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var defImageXOff = 0; //getDefImageXOff(canvasInfo);
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;
  var onTopImages = attack.images;

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawImageStack(image, context, 0, 0, width, height)
  drawImageStack(onTopImages, context, 0, 0, width, height)

  let totaltime = attackTime;
  let intervals = 40;
  let intervalTime = attackTime / intervals;
  let xfactor = intervals / 5 * xPercent;
  let yfactor = intervals / 4 * yPercent;

  if (returnObject == false)  {
    xfactor = xfactor / 2;
    yfactor = yfactor / 2;
  }

  var k1xLoc = 0;
  var k1yLoc = 0;

  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (timePassed < totaltime/2  || returnObject == false) {
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
    drawImageStack(image, context, 0, 0, width, height);
    drawImageStack(onTopImages, context, defImageXOff + k1xLoc, k1yLoc, width, height);

    if (timePassed > totaltime) {
      clearInterval(timer);
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawImageStack(image, context, defImageXOff + k1xLoc, k1yLoc, width, height)
      callbackFunction(canvasInfo);
    }

  }, 20);
}


var g_AniGrowFatAnimation =
function aniGrowFatAnimation(canvasInfo, attackTime, callbackFunction, attack) {
  aniGrowShrink(canvasInfo, attackTime, callbackFunction, 1.5, 1);
}

var g_AniGetSkinnyAnimation =
function aniGetSkinnyAnimation(canvasInfo, attackTime, callbackFunction, attack) {
  aniGrowShrink(canvasInfo, attackTime, callbackFunction, 1, 1);
}

function buildTransform(canvasInfo) {
  if (canvasInfo.transform != undefined) {
    return canvasInfo.transform;
  }
  else {
    var matrix = new Object();
    matrix.a = 1;
    matrix.b = 0;
    matrix.c = 0;
    matrix.d = 1;
    matrix.e = 0;
    matrix.f = 0;

    if (canvasInfo.flip == true) {
      matrix.a = -1;
      matrix.e = canvasInfo.canvas.width;
    }
  }
  return matrix;
}

function setTransform(canvasInfo, a, b, c, d, e, f) {
  var matrix = new Object();
  matrix.a = a;
  matrix.b = b;
  matrix.c = c;
  matrix.d = d;
  matrix.e = e;
  matrix.f = f;
  canvasInfo.transform = matrix;
}


function aniGrowShrink(canvasInfo, attackTime, callbackFunction, xFinal, yFinal) {
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var creatureDisplay = canvasInfo.creature.display;

  // determine transform
  var matrix = buildTransform(canvasInfo);

  var xScale = matrix.a;
  var xSkew = matrix.b;
  var ySkew = matrix.c;
  var yScale = matrix.d;
  var xOffset = matrix.e;
  var yOffset = matrix.f;

  let totaltime = attackTime;
  let intervals = 40;
  let intervalTime = attackTime / intervals;

  if (xScale < 0) {
    xFinal = -xFinal;
  }
  var changeX = xFinal - xScale;
  let xfactor = changeX / attackTime;

  var changeY = yFinal - yScale;
  let yfactor = changeY / attackTime;


  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    var curXScale = xScale + timePassed * xfactor;
    var curYScale = yScale + timePassed * yfactor;

    context.setTransform(curXScale, xSkew, ySkew, curYScale, xOffset, yOffset);
    canvasInfo.context.clearRect(0, 0, canvasInfo.canvas.width, canvasInfo.canvas.height);
    if (showImages == true) {
      drawImageStack(creatureDisplay.img, canvasInfo.context, 0, 0, creatureDisplay.height, creatureDisplay.width);
    }
    if (timePassed > totaltime) {
      clearInterval(timer);
      setTransform(canvasInfo, curXScale, xSkew, ySkew, curYScale, xOffset, yOffset);
      callbackFunction(canvasInfo);
    }

  }, intervalTime);
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
      drawImageStack(creatureDisplay.img, canvasInfo.context, 0, 0, creatureDisplay.height, creatureDisplay.width);
    }

    //canvasInfo.context.fillStyle = '#D3D3D3';
    //canvasInfo.context.fillRect(0, 0, canvasInfo.canvas.width, canvasInfo.canvas.height);
  }
}

function aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, xPercent, yPercent) {
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var defImageXOff = 0; //getDefImageXOff(canvasInfo);
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawImageStack(image, context, defImageXOff, 0, width, height)
  let totaltime = attackTime;
  let intervals = 40;
  let intervalTime = attackTime / intervals;
  let xfactor = intervals / 5 * xPercent;
  let yfactor = intervals / 4 * yPercent;

  var k1xLoc = 0;
  var k1yLoc = 0;

  let start = Date.now();
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
    drawImageStack(image, context, defImageXOff + k1xLoc, k1yLoc, width, height)
    if (timePassed > totaltime) {
      clearInterval(timer);
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawImageStack(image, context, defImageXOff + k1xLoc, k1yLoc, width, height)
      callbackFunction(canvasInfo);
    }

  }, 20);
}

var g_AniFallDownAttack =
function aniFallDown(canvasInfo, attackTime, callbackFunction) {
  aniSpin(canvasInfo, 0.04, attackTime, 'y', 0.04);
}


var g_AniSpin =
function aniSpinInPlace(canvasInfo, attackTime, callbackFunction) {
  aniSpin(canvasInfo, 0.07, attackTime, 'x');
}

var g_AniFastSpin =
function aniSpinInPlace(canvasInfo, attackTime, callbackFunction) {
  aniSpin(canvasInfo, 0.3, attackTime, 'x');
}



var g_AniSpinAttack =
function aniSpinInPlace(canvasInfo, attackTime, callbackFunction) {
  aniSpin(canvasInfo, 0.07, attackTime, 'x', null, 1);
}

var g_AniCartwheel =
function aniSpinInPlace(canvasInfo, attackTime, callbackFunction) {
  aniSpin(canvasInfo, 0.14, attackTime, 'z');
}

var g_AniCartwheelAttack =
function aniSpinInPlace(canvasInfo, attackTime, callbackFunction) {
  aniSpin(canvasInfo, 0.14, attackTime, 'z', null, 1);
}

function aniSpin(canvasInfo, rotateIncr, totalTime, axis, stopAtRotation, moveX, moveY, moveAndReturn) {
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var delayTime = 0;
  var resetAtEnd = true;
  var stepTime = 20;

//  let totaltime = attackTime;
//  let intervals = 40;
//  let intervalTime = attackTime / intervals;

   if (stepTime == undefined) {
     stepTime = 20
   };
   if (totalTime == undefined) {
     totalTime =  -1;
   };
   if (rotateIncr == undefined) {
     rotateIncr =  0.02
   };
   if (delayTime == undefined || delayTime < 0) {
     delayTime =  0;
   };
   if (axis == undefined) {
     axis = 'x';
   }
   if (resetAtEnd == undefined) {
     resetAtEnd = true;
   }
   if (moveX == undefined) {
     moveX = 0;
   }
   if (moveY == undefined) {
     moveY = 0;
   }
   if (moveAndReturn == undefined) {
     moveAndReturn = true;
   }

   // moveX, moveY, moveAndReturn

   var width = canvasInfo.creature.display.width;
   var height = canvasInfo.creature.display.height;
   var context = canvas.getContext("2d");
   var rotation = 1.0;
   var spin = 0;
   var xOffset = 1;
   var start = Date.now();
   var rotateBack = true;

   let intervals = totalTime / stepTime;

   let xfactor = intervals / 5 * moveX;
   let yfactor = intervals / 4 * moveY;
   var k1xLoc = 0;
   var k1yLoc = 0;

   let timer = setInterval(function() {
     let timePassed = Date.now() - start;
     if (stopAtRotation == undefined || stopAtRotation <= rotation) {
       if (delayTime > 0 && delayTime > timePassed) {
         // do nothing
       }
       else {
         rotation = rotation - rotateIncr;
         spin = spin - rotateIncr;
         context.clearRect(0, 0, width * 2 , height);

         // compute x and y movement

         // 1st 1/2 of time
         if (timePassed < totalTime/2 || (moveAndReturn != true)) {
           if (xfactor != 0) {
             k1xLoc = -timePassed / xfactor;
           }
           if (yfactor != 0) {
             k1yLoc = -timePassed / yfactor;
           }
         }
         // 2nd 1/2 of time
         else {
           if (xfactor != 0) {
             k1xLoc = -(totalTime - timePassed) / xfactor;
           }
           if (yfactor != 0) {
             k1yLoc = -(totalTime - timePassed) / yfactor;
           }
         }

         context.clearRect(0, 0, context.width, context.height);
         if (axis == 'z') {
           var zOffset = spin*Math.PI/180;
           //surfaceContext.save();
            // Translate to the center point of our image
            context.translate((width + k1xLoc) * 0.5, height * 0.5);
            // Perform the rotation
            context.rotate(zOffset);
            // Translate back to the top left of our image
            context.translate((-width - k1xLoc) * 0.5, -height * 0.5);
            // And restore the context ready for the next loop
            //surfaceContext.restore();
           //context.rotate(zOffset);
           rotateBack = false;
           // Finally we draw the image
           drawImageStack(image, context, k1xLoc, k1yLoc, width, height)
         }
         else if (axis == 'y') {
           yOffset = (1- rotation) * height * 2/3;
           context.setTransform(1, 0, 0, rotation, 0, yOffset);
           drawImageStack(image, context, k1xLoc, k1yLoc, width, height)
         }
         else { // x
           xOffset = (1- rotation) * width/ 2;
           context.setTransform(rotation, 0, 0, 1, xOffset, 0);
           drawImageStack(image, context, -k1xLoc, -k1yLoc, width, height)
         }
         if (rotateBack && (rotation < -1 || rotation > 1)) {
           rotateIncr = -rotateIncr;
         }
         if (totalTime > 0 && totalTime < timePassed) {
           clearInterval(timer);
           if (resetAtEnd) {
             context.setTransform(1, 0, 0, 1, 0, 0);
             context.translate(0, 0);
             context.rotate(0);
             context.clearRect(0, 0, width, height);
             drawImageStack(image, context, 0, 0, width, height)
           }
         }
       }
     }
   }, stepTime);
}
