class FamilyItem {
  constructor(id, color, top, left, width, height) {
    this.id = id;
    this.color = color;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.children = [];
    this.ancestorLevels = -1;
    this.descendantLevels = -1;
    this.leftP = 0;
    this.modifier = 0;
  }

  setDisplayParent(parent) {
    this.displayParent = parent;
  }

  setMom(mom) {
    this.mom = mom;
  }

  setDad(dad) {
    this.dad = dad;
  }
  setModifier(modifier) {
    this.modifier = modifier;
  }
  getModifier() {
    return this.modifier;
  }

  setChildren(children) {
    this.children = children;
  }

  getAncestorLevels() {
    if (this.ancestorLevels < 0) {
      this.ancestorLevels = getParentLevels(this, 100, 0);
    }
    return this.ancestorLevels;
  }

  getDescendantLevels() {
    if (this.descendantLevels < 0) {
      this.descendantLevels = getChildLevels(this, 100, 0);
    }
    return this.descendantLevels;
  }

}

function getParentLevels(object, maxLevel, curLevel) {
  if (curLevel >= maxLevel) {
    return maxLevel;
  }
  if (object == undefined) {
    return curLevel - 1;
  }
  var highestLevel = curLevel;
  var level = 0;
  if (object.mom != undefined) {
      level = getParentLevels(object.mom, max, curLevel + 1);
      highestLevel = max(level, highestLevel);
  }
  if (object.dad != undefined) {
      level = getParentLevels(object.dad, max, curLevel + 1);
      highestLevel = max(level, highestLevel);
  }
  return highestLevel;

}

function max(one, two) {
  if (one > two) {
    return one;
  }
  return two;
}

function getChildLevels(object, maxLevel, curLevel) {
  if (curLevel >= maxLevel) {
    return maxLevel;
  }
  var retVal = curLevel;
  if (object != undefined && object.children != undefined) {
    for (var i = 0; i < object.children.length; i++) {
      var level = getChildLevels(object.children[i], maxLevel, curLevel + 1);
      retVal = max(retVal, level);
    }
  }
  return retVal;
}

function positionAll(mainObject, canvasName, ancestorLevels, defaultWidth, defaultHeight, eleArray) {
  var canvas = document.getElementById(canvasName);

  // may need to resize canvas
  var canvasHeight = canvas.height;
  var canvasWidth = canvas.width;

  if (ancestorLevels == undefined) {
    ancestorLevels = 10;
  }
  if (defaultWidth == undefined) {
    defaultWidth = 50;
  }
  if (defaultHeight == undefined) {
    defaultHeight = 50;
  }
  var childLevels = 5;

  var yOffsetFactor = computeYOffset(mainObject, ancestorLevels, childLevels);

  // center main object
  mainObject.width = defaultWidth;
  mainObject.height = defaultHeight;
  mainObject.left = canvasWidth / 2 - mainObject.width / 2;
  mainObject.top = canvasHeight / 2 * yOffsetFactor;
  console.log(canvasWidth + ':' + mainObject.left);

  var reductionFactor = 0.70;

  if (eleArray != undefined) {
    eleArray.push(mainObject);
  }

  setAncestorPositions(mainObject, reductionFactor, 1, ancestorLevels, eleArray);

  setSiblingPositions(mainObject, eleArray);

  //reductionFactor = 1 - (0.07 * childLevels);
  reductionFactor = 0.70;

  // function layoutChildren(RootNode, width, height, reductionFactor) {
  layoutChildren(mainObject, canvasWidth, canvasHeight, reductionFactor);
  //setDescendantPositions(mainObject, reductionFactor, 1, childLevels, 1, canvasWidth, eleArray);
  //setDescendantPositionsNewAlg(mainObject, eleArray, canvasWidth, canvasHeight);
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

function resizeCanvas(object, ancestorLevels, descendantLevels) {
  var reductionFactor = 0.9;
  // compute how many ancestors at the top level
  var topCount = 2 ^ ancestorLevels;
  var topWidth = computeLevelWidth(topCount, ancestorLevels, reductionFactor);

  // compute how many siblinings
  var siblingCount = 0;
  // loop thru parents

  // get number of children
  var siblingWidth = computeLevelWidth(siblingCount, 0);


  // compute how many descendants at the bottom level
  var bottomCount = getDescendantCount(object, descendantLevels);
  var bottomWidth = computeLevelWidth(bottomCount, descendantLevels, reductionFactor);

  var height = ancestorLevels + descendantLevels + 1;
  var width = topWidth;
  if (siblingWidth > width) {
    width = siblingWidth;
  }
  if (bottomWidth > width) {
    width = bottomWidth;
  }

  var objectLeft = height/2;
  var objectTop = width/2;
  var objectWidth = 100;
  var objectHeight = 100;

  setAncestorPositions(object, objectLeft, objectTop, objectWidth, objectHeight, reductionFactor, level, ancestorLevels);
}

function getDescendantCount(kitty, descendantLevels) {
  // loop thru descendants
  var descendants = 0;
  // for() {
    if (descendantLevels == 0) {
      descendants = descendants + 1;
    }
    else {
      descendants = descendants + getDescendantCount(child, descendantLevels - 1);
    }
  // }
  return descendants;
}
