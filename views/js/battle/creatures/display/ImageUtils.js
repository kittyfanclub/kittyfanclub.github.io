// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
function mergeImages(image1, image2) {
  var canv = document.createElement('canvas');
  var ctx = canv.getContext("2d");
  if (image1 != undefined) {
    ctx.drawImage(image1, 0, 0, image1.width, image1.height);
  }
  if (image2 != undefined) {
    ctx.drawImage(image2, 0, 0, image2.width, image2.height);
  }
  var imgUrl = canv.toDataURL("image/png");
  var imgObj = new Image();
  imgObj.src = imgUrl;
  return imgObj;
}


/*
var wound1 = new Image();
wound1.src = "pics/wounds/wound1.png";


function addWoundToCreature(creature) {
  creature.display.addWound();
  creature.display.addImage(wound1);
  wound1.overrideX = 100;
  wound1.overrideY = 100;
  wound1.overrideWidth = 30;
  wound1.overrideHeight = 30;
}
*/

function addImageToCreature(creature, img) {
  creature.display.addImage(img);
}

function drawImageStack(imageStack, context, x, y, width, height) {
  if (Array.isArray(imageStack)) {
    for (var i = 0; i < imageStack.length; i++) {
      drawIndividualImage(imageStack[i], context, x, y, width, height);
    }
  }
  else {
    drawIndividualImage(imageStack, context, x, y, width, height);
  }
}

function drawIndividualImage(image, context, x, y, width, height) {
  if (image.overrideX != undefined) {
    x = image.overrideX + x;
  }
  if (image.overrideY != undefined) {
    y = image.overrideY + y;
  }
  if (image.overrideWidth != undefined) {
    width = image.overrideWidth;
  }
  if (image.overrideHeight != undefined) {
    height = image.overrideHeight;
  }
  context.drawImage(image, x, y, width, height);
}

/*
function mergeImages(image1, image2) {
  var c = document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  var imageObj1 = new Image();
  var imageObj2 = new Image();
  imageObj1.src = "1.png"
  imageObj1.onload = function() {
     ctx.drawImage(imageObj1, 0, 0, 328, 526);
     imageObj2.src = "2.png";
     imageObj2.onload = function() {
        ctx.drawImage(imageObj2, 15, 85, 300, 300);
        var img = c.toDataURL("image/png");
        document.write('<img src="' + img + '" width="328" height="526"/>');
     }
  }
}
*/
