//

function positionAll(mainObject, canvasName, defaultWidth, defaultHeight, eleArray, reductionFactor) {
  var canvas = document.getElementById(canvasName);
  eleArray.push(mainObject);

  // may need to resize canvas
  var canvasHeight = canvas.height;
  var canvasWidth = canvas.width;

  if (defaultWidth == undefined) {
    defaultWidth = 50;
  }
  if (defaultHeight == undefined) {
    defaultHeight = 50;
  }

  mainObject.width = defaultWidth;
  mainObject.height = defaultHeight;

  // count levels up
  var ancestorLevels = countAncestorLevels(mainObject, 0);

  // build all parent Levels
  var parentNodes = buildParentArray(mainObject, eleArray);

  // build all child Levels
  var childNodes = buildChildArray(mainObject, eleArray);

  // count levels down
  var childLevels = childNodes.length - 1;

  var yOffsetFactor = computeYOffset(mainObject, ancestorLevels, childLevels);

  // center main object
  mainObject.left = canvasWidth / 2 - mainObject.width / 2;
  mainObject.top = canvasHeight / 2 * yOffsetFactor;
  console.log(canvasWidth + ':' + mainObject.left);

  var childReductionFactor = 0.7;
  var parentReductionFactor = 0.85;


  if (reductionFactor != undefined) {
    childReductionFactor = reductionFactor;
  }

  if (eleArray != undefined) {
    eleArray.push(mainObject);
  }

  //setAncestorPositions(mainObject, reductionFactor, 1, ancestorLevels, eleArray);
  setAncestorPositions(mainObject, parentNodes, canvasWidth, canvasHeight, parentReductionFactor);

  setSiblingPositions(mainObject, eleArray);

  layoutChildren(mainObject, childNodes, canvasWidth, canvasHeight, childReductionFactor, eleArray);
}

function countAncestorLevels(obj, level) {
  var maxLevels = level;
  if (obj.mom != undefined) {
    maxLevels = countAncestorLevels(obj.mom, level + 1);
  }
  if (obj.dad != undefined) {
    var levelCount = countAncestorLevels(obj.dad, level + 1);
    if (levelCount > maxLevels) {
      maxLevels = levelCount;
    }
  }

  return maxLevels;
}
function computeYOffset(mainObject, maxAncestorLevels, maxChildLevels) {
  var actualParentLevels = mainObject.getAncestorLevels();
  if (maxAncestorLevels < actualParentLevels) {
    actualParentLevels = maxAncestorLevels;
  }

  var actualChildLevels = mainObject.getDescendantLevels();
  if (maxChildLevels < actualChildLevels) {
    actualChildLevels = maxChildLevels;
  }

  if (actualParentLevels == 0) {
    if (actualChildLevels == 0) {
      return 1;
    }
    else {
      // no parents
      return 0.01;
    }
  }

  if (actualChildLevels == 0) {
    return 1.75;
  }

  return 1;
}

function setAncestorPositions(RootNode, nodeLevels, canvasWidth, canvasHeight, reductionFactor) {

  // separation between nodes
  var nodeDistX = 5;
  var nodeDistY = 20;

  // build reduction factors
  var reductionLevels = [];
  for (var i = 0; i < nodeLevels.length; i++) {
    var factor = Math.pow(reductionFactor, i);
    reductionLevels.push(factor);
  }

  // reduce widths and heights, by level and determine widest level
  var maxWidth = 0;
  var widestLevel = 0;
  var childTop = RootNode.top;
  var prevNode = null;
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
      curNode.top = childTop - yOffset - curNode.height;

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
    childTop = curNode.top;
    prevNode = null;
  }

  // layout largest level
  layoutLargestLevel(nodeLevels, widestLevel, maxWidth, canvasWidth)


  // layout parents
  centerAncestorParents(nodeLevels, widestLevel, canvasWidth, nodeDistX);

  // layout children
  centerAncestorChildren(nodeLevels, widestLevel, nodeDistX);

}

function centerAncestorParents(nodeLevels, widestLevel, canvasWidth, nodeDistX) {
  for (var i = widestLevel + 1; i < nodeLevels.length; i++) {
    // center parents based on children
    var curLevel = nodeLevels[i];
    centerParents(curLevel, canvasWidth, nodeDistX);
  }
}

function centerAncestorChildren(nodeLevels, widestLevel, canvasWidth, nodeDistX) {
  for (var i = widestLevel - 1; i > 0; i--) {
    // center children based on parents
    var curLevel = nodeLevels[i];
    for (var j = 0; j < curLevel.length; j++) {
      var curNode = curLevel[j];
      var parentCount = 0;
      var parentCenter = 0;
      if (curNode.mom != undefined) {
        parentCount++;
        parentCenter = curNode.mom.left + curNode.mom.width / 2;
      }
      if (curNode.dad != undefined) {
        parentCount++;
        parentCenter += curNode.dad.left + curNode.dad.width / 2;
      }
      var center = parentCenter / parentCount;
      var xPos = center - curNode.width / 2;
      curNode.left = xPos;
    }
  }
}


function setAncestorPositionsOld(object, reductionFactor, level, maxLevels, eleArray) {
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
  var nodeDistX = 2;
  var mom = mainObject.mom;
  var dad = mainObject.dad;
  var parentCount = 0;
  var singleParent;
  if (mom != undefined) {
    parentCount ++;
    singleParent = mom;
  }
  if (dad != undefined) {
    parentCount ++;
    singleParent = dad;
  }

  if (parentCount == 0) {
    return;
  }


  var leftArray = [];
  var rightArray = [];

  if (parentCount == 1) {
    // use single parent
    var children = singleParent.children;
    if (children != undefined) {
      var end = children.length;
      var mid = Math.round(end / 2);
      leftArray = [];
      rightArray = [];

      // put 1/2 on left and 1/2 on right
      for (var i = 0; i < mid; i++) {
        leftArray.push(children[i]);
      }
      for (var i = mid; i < end; i++) {
        rightArray.push(children[i]);
      }
    }
  }
  else if (parentCount == 2) {
    // which one is on the left
    if (mom.left < dad.left) {
      leftArray = mom.children;
      rightArray = dad.children;
    }
    else {
      rightArray = mom.children;
      leftArray = dad.children;
    }

  }

  placeSiblings(mainObject, leftArray, eleArray, -1, nodeDistX);
  placeSiblings(mainObject, rightArray, eleArray, 1, nodeDistX);
}

function placeSiblings(mainObject, nodeArray, eleArray, leftOrRight, nodeDistX) {

  if (nodeArray != undefined && nodeArray.length > 0) {
    var width = mainObject.width * 0.6;
    var height = mainObject.height * 0.6;
    var xOffset = (width + nodeDistX) * leftOrRight;
    // how many fit on a row
    var space = mainObject.left;
    var maxPerRow = Math.round(space / (width + nodeDistX) - 1.5);
    var rowNum = 0;
    var colNum = 0;
    var curPosX = 0;
    var startPosX = 0;
    if (leftOrRight > 0) {
      // right of the main object
      startPosX = mainObject.left + mainObject.width + nodeDistX + width / 2;
    }
    else {
      // left of the main object
      startPosX = mainObject.left - nodeDistX - width * 1.5;
    }
    curPosX = startPosX;

    for (var i = 0; i < nodeArray.length; i++) {
      var child = nodeArray[i];
      if (child != mainObject) {  // don't move the chosen one
        if (eleArray != undefined) {
          eleArray.push(child);
        }

        child.left = curPosX;
        child.top = mainObject.top + colNum * height * 1.2;
        child.width = width;
        child.height = height;
        rowNum++;
        if (rowNum >= maxPerRow) {
          rowNum = 0;
          colNum++;
          curPosX = startPosX;
        }
        else {
          curPosX = curPosX + xOffset;
        }

      }
    }
  }
}

function layoutChildren(RootNode, nodeLevels, canvasWidth, canvasHeight, reductionFactor, eleArray) {
  // separation between nodes
  var nodeDistX = 2;
  var nodeDistY = 40;

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
  if (widestLevel > 0) {
    var offset = (canvasWidth - levelWidth)/2;
    var level = nodeLevels[widestLevel];
    for (var i = 0; i < level.length; i++) {
      level[i].left = level[i].left + offset - level[i].width / 2;
    }
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


function buildParentArray(BaseNode, eleArray) {
  var completeArray = [];

  var levelArr = [];
  levelArr.push(BaseNode);
  completeArray.push(levelArr);

  INITPARENTNODEARRAY(completeArray, levelArr, eleArray);
  return completeArray;
}

function INITPARENTNODEARRAY(completeArray, parentArr, eleArray) {
  if (parentArr.length > 0) {
    var levelArr = [];
    for(var i = 0; i < parentArr.length; i++) {
      var node = parentArr[i];
      if (node.mom != undefined) {
        var mom = node.mom;
        levelArr.push(mom);
        eleArray.push(mom);
        // reset width/height
        mom.width = node.width;
        mom.height = node.height;
      }
      if (node.dad != undefined) {
        var dad = node.dad;
        levelArr.push(dad);
        eleArray.push(dad);
        // reset width/height
        dad.width = node.width;
        dad.height = node.height;
      }
    }
    if (levelArr.length > 0) {
      completeArray.push(levelArr);
      // init those parents
      INITPARENTNODEARRAY(completeArray, levelArr, eleArray);
    }
  }
}

function buildChildArray(BaseNode, eleArray) {
  var completeArray = [];

  var levelArr = [];
  levelArr.push(BaseNode);
  completeArray.push(levelArr);

  INITCHILDNODEARRAY(completeArray, levelArr, eleArray);
  return completeArray;
}

function INITCHILDNODEARRAY(completeArray, parentArr, eleArray) {
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
          eleArray.push(child);
          // reset width/height
          child.width = node.width;
          child.height = node.height;
          // set parent that caused node to be displayed
          child.displayParent = node;
        }
      }
    }
    if (levelArr.length > 0) {
      completeArray.push(levelArr);
      // init those children
      INITCHILDNODEARRAY(completeArray, levelArr, eleArray);
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
