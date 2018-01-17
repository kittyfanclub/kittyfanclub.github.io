//

function setAncestorPositions(object, reductionFactor, level, maxLevels, eleArray) {
  var dad = object.dad;
  var mom = object.mom;
  var centerX = object.left + object.width / 2;
  var shiftDivisor = 2;
  var levelExponent = level;
  var parentCount = 2;

  if (dad == undefined || mom == undefined) {
    parentCount = 1;
  }

  if (dad != undefined) {
    if (eleArray != undefined) {
      eleArray.push(dad);
    }

    dad.width = object.width * reductionFactor^levelExponent;
    dad.height = object.height * reductionFactor^levelExponent;

    if (parentCount == 1) {
      var shift = dad.width * (1 + maxLevels/level/shiftDivisor) / 4;
      dad.left = (object.left - shift);
    }
    else {
      var shift = dad.width * (1 + maxLevels/level/shiftDivisor) / 2;
      dad.left = (object.left - shift);
    }
    dad.top = object.top - dad.height * 2;
    if (level < maxLevels) {
      // keep going
      setAncestorPositions(dad, reductionFactor, level + 1, maxLevels, eleArray);
    }
  }

  if (mom != undefined) {
    if (eleArray != undefined) {
      eleArray.push(mom);
    }

    mom.width = object.width * reductionFactor^levelExponent;
    mom.height = object.height * reductionFactor^levelExponent;

    if (parentCount == 1) {
      var shift = mom.width * (maxLevels/level/shiftDivisor) / 5;
      mom.left = (object.left + object.width + shift);
    }
    else {
      var shift = mom.width * (maxLevels/level/shiftDivisor)/3;
      mom.left = (object.left + object.width + shift);
    }

    mom.top = object.top - mom.height * 2;
    if (level < maxLevels) {
      // keep going
      setAncestorPositions(mom, reductionFactor, level + 1, maxLevels, eleArray);
    }
  }
}

function setSiblingPositions(mainObject, eleArray) {
  var mom = mainObject.mom;
  if (mom != undefined) {
    var children = mom.children;
    if (children != undefined) {
      var offset = 1;
      setupSiblings(mainObject, mom, children, 1, eleArray);
    }
  }

  var dad = mainObject.dad;
  if (dad != undefined) {
    var children = dad.children;
    if (children != undefined) {
      var offset = 1;
      setupSiblings(mainObject, dad, children, -1, eleArray);
    }
  }
}

function setupSiblings(mainObject, parent, children, offset, eleArray) {
  var count = children.length;
  var width;
  var height;
  var maxPerRow = 5;
  var xOffset = 0;

  // compute sizes
  if (count < 3) {
    width = parent.width;
    height = parent.height;
  }
  else if (count <= maxPerRow) {
    width = parent.width * 0.6;
    height = parent.height * 0.6;
    xOffset = width;
  }
  else {
    width = parent.width * 0.6;
    height = parent.height * 0.6;
    xOffset = width;
  }

  var rowNum = 0;
  var colNum = 0;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (child != mainObject) {  // don't move the chosen one
      if (eleArray != undefined) {
        eleArray.push(child);
      }

      child.left = parent.left + rowNum * width * 1.5 * offset + xOffset * (-offset);
      if (offset > 0) {
        child.left = child.left + parent.width;
      }
      child.top = mainObject.top + colNum * height * 1.5;
      child.width = width;
      child.height = height;
      rowNum++;
      if (rowNum >= maxPerRow) {
        rowNum = 0;
        colNum++;
      }
    }
  }
}

function layoutChildren(RootNode, canvasWidth, canvasHeight, reductionFactor) {
  // separation between nodes
  var nodeDistX = 2;
  var nodeDistY = 40;

  // build all Level
  var nodeLevels = buildChildArray(RootNode);

  // build reduction factors
  var reductionLevels = [];
  for (var i = 0; i < nodeLevels.length; i++) {
    var factor = Math.pow(reductionFactor, i);
    reductionLevels.push(factor);
  }

  // reduce widths and heights, by level and determine widest level
  var maxWidth = 0;
  var widestLevel = 0;
  var parentBottom = RootNode.top + RootNode.height;
  var prevNode = null;;
  // start at 1, skip top Node
  for (var level = 1; level < nodeLevels.length; level++) {
    var reduction = reductionLevels[level];
    var nodes = nodeLevels[level];
    var yOffset = nodeDistY * reduction;
    var levelWidth = 0;
    var curNode = null;
    for (var n = 0; n < nodes.length; n++) {
      curNode = nodes[n];
      curNode.width = curNode.width * reduction;
      curNode.height = curNode.height * reduction;
      curNode.top = parentBottom + yOffset;

      // initial position
      if (prevNode == undefined) {
        curNode.left = 0;
      }
      else {
        curNode.left = prevNode.left + prevNode.width + nodeDistX;
      }

      levelWidth = levelWidth + curNode.width + nodeDistX;

      prevNode = curNode;
    }
    if (levelWidth > maxWidth) {
      maxWidth = levelWidth;
      widestLevel = level;
    }
    parentBottom = curNode.top + curNode.height;
    prevNode = null;
  }

  // layout largest level
  layoutLargestLevel(nodeLevels, widestLevel, maxWidth, canvasWidth)


  // layout parents
  layoutParents(nodeLevels, widestLevel, canvasWidth, nodeDistX);

  // layout children
  layoutLevelChildren(nodeLevels, widestLevel, nodeDistX);
}

function layoutLargestLevel(nodeLevels, widestLevel, levelWidth, canvasWidth) {
  var offset = (canvasWidth - levelWidth)/2;
  var level = nodeLevels[widestLevel];
  for (var i = 0; i < level.length; i++) {
    level[i].left = level[i].left + offset - level[i].width / 2;
  }
}

function layoutParents(nodeLevels, widestLevel, canvasWidth, nodeDistX) {
  for (var i = widestLevel - 1; i > 0; i--) {
    // center parents based on children
    var curLevel = nodeLevels[i];
    centerParents(curLevel, canvasWidth, nodeDistX);
  }
}

function centerParents(curLevel, canvasWidth, nodeDistX) {
  var lastX = 0;
  for (var i = 0; i < curLevel.length; i++) {
    var item = curLevel[i];
    var done = null;

    // center based on children
    if (item.children != undefined && item.children.length > 0) {
      var firstChild = item.children[0];
      var lastChild = item.children[item.children.length - 1];

      var center = (firstChild.left + lastChild.left + lastChild.width) / 2;
      item.left = center - item.width / 2;

      done = true;
    }

    // center based on siblings
    if (done == undefined) {
      if (i > 0) {
        var prev = curLevel[i-1];
        item.left = prev.left + prev.width + nodeDistX;
        done = true;
      }

    }

    // center based on canvas
    if (done == undefined) {
      item.left = canvasWidth / 2 - item.width / 2;
    }
    // move over if this runs into last item
    if (item.left < lastX) {
      item.left = lastX;
    }

    lastX = item.left + item.width + nodeDistX;


  }
}


function layoutLevelChildren(nodeLevels, levelNum, nodeDistX) {

  // center under parent
  for (var i = levelNum + 1; i <  nodeLevels.length; i++) {
    var curLevel = nodeLevels[i];
    centerLevelByParents(curLevel, nodeDistX);
  }
}

function centerLevelByParents(curLevel, nodeDistX) {
  var siblings = [];
  var prevParent = null;
  var node = curLevel[i];
  var endX = 0;
  if (curLevel.length > 0) {
    endX = - curLevel[0].width - nodeDistX;
  }
  for (var i = 0; i <= curLevel.length; i++) {
    // next node
    if (i >= curLevel.length) {
      // past end of list
      node = null;
    }
    else {
      node = curLevel[i];
    }
    if (siblings.length == 0) {
      // first item, just record it
      siblings.push(node);
      prevParent = getDisplayParent(node);
    }
    else {
      var curParent = getDisplayParent(node);
      if (node == null || curParent != prevParent) {
        // got all the children, line them up
        var parentCenter = prevParent.left + prevParent.width / 2;
        var firstSibling = siblings[0];
        var offset = firstSibling.width + nodeDistX;
        var width = offset * siblings.length;
        var startX = parentCenter - width / 2;
        if (startX < endX + offset) {
          // make sure we don't run into the last set
          startX = endX + offset;
        }

        for (var j = 0; j < siblings.length; j++) {
          endX = startX + offset * j;
          siblings[j].left = endX;
        }

        // reset list
        siblings = [];
      }
      // add current item to list
      siblings.push(node);
      prevParent = curParent;

    }

  }

}


function getDisplayParent(Node) {
  // revisit this!!!, might be dad
  if (Node == undefined) {
    return null;
  }
  var parent = Node.displayParent;
  if (parent == undefined) {
    parent = Node.mom;
    if (parent == undefined) {
      parent = Node.dad;
    }
  }
  return parent;
}

function buildChildArray(BaseNode) {
  var completeArray = [];

  var levelArr = [];
  levelArr.push(BaseNode);
  completeArray.push(levelArr);

  INITCHILDNODEARRAY(completeArray, levelArr);
  return completeArray;
}

function INITCHILDNODEARRAY(completeArray, parentArr) {
  if (parentArr.length > 0) {
    var levelArr = [];
    // loop thru array
    for(var i = 0; i < parentArr.length; i++) {
      var node = parentArr[i];
      if (node.children != undefined) {
        // add the children to the array
        for (var j = 0; j < node.children.length; j++) {
          var child = node.children[j];
          levelArr.push(child);
          // set parent that caused node to be displayed
          child.displayParent = node;
        }
      }
    }
    if (levelArr.length > 0) {
      completeArray.push(levelArr);
      // init those children
      INITCHILDNODEARRAY(completeArray, levelArr);
    }
  }
}

/*
function showNodeLevels(NodeLevels) {
  for(var i = 0; i < NodeLevels.length; i++) {
    var level = NodeLevels[i];
    for (var j = 0; j < level.length; j++) {
      var display = i + "," + j + ":" +level[j].id;
      console.log(display);
    }
  }
}
*/
