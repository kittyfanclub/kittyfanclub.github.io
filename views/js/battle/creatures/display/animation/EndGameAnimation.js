// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
var g_winner1Img = new Image();
g_winner1Img.src = "pics/winner1.png";

var g_winner_rev1Img = new Image();
g_winner_rev1Img.src = "pics/renniw1.png";

var g_loser1Img = new Image();
g_loser1Img.src = "pics/loser1.png";

var g_loser_rev1Img = new Image();
g_loser_rev1Img.src = "pics/resol1.png";

function aniWinner(canvasInfo, animationTime, callbackFunction, reverse) {
  if (reverse == true) {
    aniDropImage(canvasInfo, animationTime, callbackFunction, g_winner_rev1Img );

  }
  else {
    aniDropImage(canvasInfo, animationTime, callbackFunction, g_winner1Img );
  }
}

function aniLoser(canvasInfo, animationTime, callbackFunction, reverse) {
  if (reverse == true) {
    aniDropImage(canvasInfo, animationTime, callbackFunction, g_loser_rev1Img );

  }
  else {
    aniDropImage(canvasInfo, animationTime, callbackFunction, g_loser1Img );
  }
}

function aniDropImage(canvasInfo, animationTime, callbackFunction, dropImg) {
  let start = Date.now();
  var canvas = canvasInfo.canvas;
  var context = canvasInfo.context;
  var image = canvasInfo.creature.display.img;
  var defImageXOff = 0;
  var width = canvasInfo.creature.display.width;
  var height = canvasInfo.creature.display.height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawImageStack(image, context, defImageXOff, 0, width, height)
  let totaltime = animationTime;
  let intervals = 80;
  let intervalTime = animationTime / intervals;
  let yfactor = canvas.height/intervals;

  var k1yLoc = -canvas.height;

  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (yfactor != 0) {
      k1yLoc +=  yfactor;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImageStack(image, context, defImageXOff, 0, width, height)
    context.drawImage(dropImg, defImageXOff, k1yLoc, height, width);
    if (timePassed > totaltime) {
      clearInterval(timer);
      callbackFunction(canvasInfo);
    }

  }, intervalTime);
}
