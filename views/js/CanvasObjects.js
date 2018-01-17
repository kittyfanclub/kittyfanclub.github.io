var selection;
var elements = [];


function initCanvasObjects(canvasName) {
  var elem = document.getElementById(canvasName);

  // Add event listener for `click` events.
  elem.addEventListener('click',
    function(event) {
      handleObjectClicked(event, canvasName);
    }
    , false);

  elem.addEventListener('dblclick',
    function(event) {
      handleObjectDoubleClicked(event, canvasName);
    }
    , false);
}

function curSelectedObject() {
  return selection;
}



function getClickedObject(event, canvasName) {
  var elem = document.getElementById(canvasName);
  var elemLeft = elem.offsetLeft;
  var elemTop = elem.offsetTop;
  console.log(elemLeft, elemTop);
  var x = event.pageX - elemLeft,
      y = event.pageY - elemTop;

  var canvas = document.getElementById(canvasName);
  if (canvas != undefined) {
    var scrollOffsetY = document.getElementById(canvasName).scrollTop;
    var scrollOffsetX = document.getElementById(canvasName).scrollLeft;
    y = y + scrollOffsetY;
    x = x + scrollOffsetX;
  }

              // Collision detection between clicked offset and element.
  for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    element.selected = false;
    var selection;
      if (y > element.top && y < element.top + element.height
          && x > element.left && x < element.left + element.width) {

          selection = element;
          element.selected = true;
      }
    }
    return selection;
  }

  // Render elements
  function repaint(canvasName) {

    var canvas = document.getElementById(canvasName);
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0, len = elements.length; i < len; i++) {
      var element = elements[i];

      // draw selection box
      if (element.selected != undefined && element.selected == true) {
        context.fillStyle = '#000000';
      }
      else {
        context.fillStyle = '#FFFFFF';
      }
      context.fillRect(element.left-1, element.top-1, element.width+2, element.height+2);

      // draw element
      context.fillStyle = element.color;
      context.fillRect(element.left, element.top, element.width, element.height);

      /*
      if (element.id != undefined) {
        context.fillStyle = '#000000';
        context.fillText(element.id ,element.left, element.top);
      }
      */

      // draw parent connections
      // mom line
      if (element.mom != undefined) {
        // mom is to the right
        var x1 = element.mom.left + element.mom.width / 2;
        var y1 = element.mom.top + element.mom.height;

        var x2 = element.left + element.width / 2;
        var y2 = element.top;

        // lines
        if (elements.indexOf(element.mom) > -1) {
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.stroke();

          ///*
          context.fillStyle = '#000000';
          context.fillText(element.mom.id ,x1, y1);
          context.fillText(element.id ,x2, y2);
          //*/
        }

      }

      // dad line
      if (element.dad != undefined) {
        // dad is to the left
        var x1 = element.dad.left + element.dad.width / 2;
        var y1 = element.dad.top + element.dad.height;

        var x2 = element.left + element.width / 2;
        var y2 = element.top;

        if (elements.indexOf(element.dad) > -1) {
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.stroke();

          //*
          context.fillStyle = '#000000';
          context.fillText(element.dad.id ,x1, y1);
          context.fillText(element.id ,x2, y2);
          //*/
        }
      }

    }
  }
