
function showKittyDetails(canvasName, kitty) {

  var canvas = document.getElementById(canvasName);
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);


  var kittyWidth = 200;
  var kittyHeight = 200;
  // draw element
  context.fillStyle = kitty.color;
  if (kitty.image != undefined) {
    context.drawImage(kitty.image, 1, 1, kittyWidth, kittyHeight);
  }
  else {
    context.fillRect(1, 1, kittyWidth, kittyHeight);
  }



  context.fillStyle = '#000000';

  var x = kittyWidth + 10;
  var y = 10;
  if (kitty.name != undefined) {
    context.fillText('name: ' + kitty.name , x, y);
  }
  else {
    context.fillText('name: ' + kitty.id , x, y);
  }
  y += 10;

  context.fillText('kitty id: ' + kitty.kittyId , x, y);
  y += 10;

  context.fillText('generation: ' + kitty.generation , x, y);
  y += 10;

  context.fillText('fancy: ' + kitty.is_fancy , x, y);
  y += 10;

  context.fillText('fancy type: ' + kitty.fancy_type , x, y);
  y += 10;

  context.fillText('exclusive: ' + kitty.is_exclusive , x, y);
  y += 10;

  //context.fillText('children: ' + kitty.children.length , x, y);
  //y += 10;


  //context.fillText('ancestor levels: ' + kitty.getAncestorLevels() , x, y);
  //y += 10;

  //context.fillText('descendant levels: ' + kitty.getDescendantLevels() , x, y);
  //y += 10;

  if (kitty.cattributes != undefined) {
    for (var i = 0; i < kitty.cattributes.length; i++) {
      var attr = kitty.cattributes[i];
      if (attr != undefined) {
        var display = attr.type + ': ' + attr.description;
        context.fillText(display , x, y);
        y += 10;

      }
    }
  }

  y = kittyHeight - 20;

  if (kitty.bio != undefined) {
    var bioArray = splitString(kitty.bio, 80, ' ');

    for (var i = 0; i < bioArray.length; i++) {
      context.fillText(bioArray[i] , 10, y);
      y += 10;
    }
  }
}
function splitString(bio, splitJump, splitChar) {
  var bioArray = [];
  var startLoc = 0;
  var splitLoc = splitJump;
  do  {
    if (bio.length > splitLoc) {
      var pos = bio.indexOf(' ', splitLoc);
      if (pos == -1) {
        bioArray.push(bio.substring(startLoc));
        startLoc = 10000;
        splitLoc = 100000;
      }
      else {
        bioArray.push(bio.substring(startLoc, pos));
        splitLoc = pos + splitJump;
        startLoc = pos + 1;
      }
    }
    if ((bio.length < splitLoc) && (bio.length > startLoc)) {
      bioArray.push(bio.substring(startLoc));
    }
  } while (bio.length > splitLoc);
  return bioArray;
}
