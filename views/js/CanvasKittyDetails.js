
function showKittyDetails(canvasName, kitty) {

  var canvas = document.getElementById(canvasName);
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);


  // draw element
  context.fillStyle = kitty.color;
  context.fillRect(1, 1, 100, 100);

  context.fillStyle = '#000000';

  var x = 110;
  var y = 10;
  context.fillText('name: ' + kitty.id , x, y);
  y += 10;

  context.fillText('children: ' + kitty.children.length , x, y);
  y += 10;

  context.fillText('ancestor levels: ' + kitty.getAncestorLevels() , x, y);
  y += 10;

  context.fillText('descendant levels: ' + kitty.getDescendantLevels() , x, y);
  y += 10;



}
