// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt

//requires battlekitty.js


function drawCat(cat) {
  if (cat != undefined) {
    var flip = cat.flipped;
    var canvas = cat.canvas;
    var context = canvas.getContext("2d");
    var image = cat.image;
    var width = image.width,
        height = image.height;

    var defTransXOff = 0;
    var defImageXOff = getDefImageXOff(cat);
    if (flip == true) {
      defTransXOff = canvas.width;
      context.setTransform(-1, 0, 0, 1, defTransXOff, 0);
    }
    else {
      context.setTransform(1, 0, 0, 1, 0, 0);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, defImageXOff, 0, height, width);
    //drawRect(context, defImageXOff, 1, defImageXOff+width, height);
    //drawRect(context, 1, 1, canvas.width, canvas.height);
  }
}

function getDefImageXOff(cat) {
  var defImageXOff = 0;
  if (cat.flipped == true) {
    defImageXOff = (cat.canvas.width - cat.image.width);
  }
  return defImageXOff;
}


function attackAnimation(cat, attackImage, attackTime) {
  basicAttack(cat, attackImage, attackTime);
}
function getImage(file) {
  var img = new Image();
  img.src = file;
  return img;
}
function basicAttack(cat, attackImage, attackTime) {
  let start = Date.now();
  var canvas = cat.canvas;
  var context = canvas.getContext("2d");
  var image = cat.image;
  var defImageXOff = getDefImageXOff(cat);
  var width = image.width,
      height = image.height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image,
      defImageXOff, 0, height, width);
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
    context.drawImage(attackImage, defImageXOff + 30, 50, 50, 20);
    if (timePassed > totaltime) {
      clearInterval(timer);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, defImageXOff + k1xLoc, k1yLoc, height, width);
    }

  }, 20);
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawRect(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1, y2);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x2, y1);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function spinAnimationOld(image, stepTime, rotateIncr, canvas, totalTime, delayTime) {
   if (stepTime == undefined) {
     stepTime = 30
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



   var width = image.width,
       height = image.height;
   var context = canvas.getContext("2d");
   var rotation = 1.0;
   var xOffset = 1;
   var start = Date.now();
   let timer = setInterval(function() {
     let timePassed = Date.now() - start;
     if (delayTime > 0 && delayTime > timePassed) {
       // do nothing
     }
     else {
       rotation = rotation - rotateIncr;

       xOffset = (1- rotation) * width/ 2;
       context.clearRect(0, 0, width * 2 , height);
       context.setTransform(rotation, 0, 0, 1, xOffset, 0);
       context.drawImage(image,
           0, 0, height, width);
       if (rotation < -1 || rotation > 1) {
         rotateIncr = -rotateIncr;
       }
       if (totalTime > 0 && totalTime < timePassed) {
         clearInterval(timer);
         context.setTransform(1, 0, 0, 1, 0, 0);
         context.drawImage(image, 0, 0, height, width);
       }
     }
   }, stepTime);
}
function spinAnimation(image, stepTime, rotateIncr, canvas, totalTime, delayTime, axis, resetAtEnd, stopAtRotation) {
   if (stepTime == undefined) {
     stepTime = 30
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

   var width = image.width,
       height = image.height;
   var context = canvas.getContext("2d");
   var rotation = 1.0;
   var xOffset = 1;
   var start = Date.now();
   let timer = setInterval(function() {
     let timePassed = Date.now() - start;
     if (stopAtRotation == undefined || stopAtRotation <= rotation) {
       if (delayTime > 0 && delayTime > timePassed) {
         // do nothing
       }
       else {
         rotation = rotation - rotateIncr;

         context.clearRect(0, 0, width * 2 , height);
         if (axis == 'y') {
           yOffset = (1- rotation) * height * 2/3;
           context.setTransform(1, 0, 0, rotation, 0, yOffset);
         }
         else {
           xOffset = (1- rotation) * width/ 2;
           context.setTransform(rotation, 0, 0, 1, xOffset, 0);
         }
         context.drawImage(image,
             0, 0, height, width);
         if (rotation < -1 || rotation > 1) {
           rotateIncr = -rotateIncr;
         }
         if (totalTime > 0 && totalTime < timePassed) {
           clearInterval(timer);
           if (resetAtEnd) {
             context.setTransform(1, 0, 0, 1, 0, 0);
             context.drawImage(image, 0, 0, height, width);
           }
         }
       }
     }
   }, stepTime);
}
function deadAnimation(cat, attackTime) {
  spinAnimation(cat.image, 10, 0.04, cat.canvas, 1000 + attackTime, attackTime, 'y', false, 0.04);
}

function victoryAnimation(cat, attackTime){
  spinAnimation(cat.image, 30, 0.02, cat.canvas, 8000 + attackTime, attackTime);
}
