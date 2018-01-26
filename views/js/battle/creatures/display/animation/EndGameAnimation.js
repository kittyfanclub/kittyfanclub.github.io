var g_winner1Img = new Image();
g_winner1Img.src = "pics/winner1.png";

var g_loser1Img = new Image();
g_loser1Img.src = "pics/loser1.png";

function aniWinner(canvasInfo, animationTime, callbackFunction) {
  aniDropImage(canvasInfo, animationTime, callbackFunction, g_winner1Img );
}

function aniLoser(canvasInfo, animationTime, callbackFunction) {
  aniDropImage(canvasInfo, animationTime, callbackFunction, g_loser1Img );
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
  context.drawImage(image, defImageXOff, 0, height, width);
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
    context.drawImage(image, defImageXOff, 0, height, width);
    context.drawImage(dropImg, defImageXOff, k1yLoc, height, width);
    if (timePassed > totaltime) {
      clearInterval(timer);
      callbackFunction(canvasInfo);
    }

  }, intervalTime);
}
