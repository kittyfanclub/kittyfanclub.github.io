// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
var g_creatureWoundArray = [];
class WoundImage {
    constructor(imageArr, x, y, width, height) {
      // add each entry to the global wound array
      g_creatureWoundArray.push(this);
      this.imageArr = imageArr;
      for (var i = 0; i < imageArr.length; i++) {
        imageArr[i].overrideX = x;
        imageArr[i].overrideY = y;
        imageArr[i].overrideWidth = width;
        imageArr[i].overrideHeight = height;
      }
    }
}

var g_ExpectedCreatureWidth = 250;
var g_ExpectedCreatureHeight = 250;

function setCreatureSize(width, height) {
  g_ExpectedCreatureWidth = width;
  g_ExpectedCreatureHeight = height;
}

// need to resize wounds if display size changes
function resizeWounds(newWidth, newHeight) {
  var factorX = newWidth/g_ExpectedCreatureWidth;
  var factorY = newHeight/g_ExpectedCreatureHeight;
  var moveX = 1 - ((1 - factorX) / 2);
  var moveY = 1 - ((1 - factorY) / 2);

  for (var i = 0; i < g_creatureWoundArray.length; i++) {
    imageArr = g_creatureWoundArray[i].imageArr;
    for (var j = 0; j < imageArr.length; j++) {
      imageArr[j].overrideX = imageArr[j].overrideX * moveX;
      imageArr[j].overrideY = imageArr[j].overrideY * moveY;
      imageArr[j].overrideWidth = imageArr[j].overrideWidth * factorX;
      imageArr[j].overrideHeight = imageArr[j].overrideHeight * factorX;
    }

  }
}
