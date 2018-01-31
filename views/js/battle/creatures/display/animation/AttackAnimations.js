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

function aniMoveAndReturn(canvasInfo, attackTime, callbackFunction, xPercent, yPercent) {
  let start = Date.now();
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

   let intervals = attackTime / stepTime;

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
