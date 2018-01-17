var ancestorCanvasName;
var detailsCanvasName;
var ancestorLevels;
var id = 1;

function init(selectedItem, canvas1, canvas2, ancLevels, eleArray) {
  initCanvasObjects(canvas1);
  ancestorCanvasName = canvas1;
  detailsCanvasName = canvas2;
  ancestorLevels = ancLevels;
  positionAll(selectedItem, ancestorCanvasName, ancestorLevels, 50, 50, eleArray);
  showKittyDetails(detailsCanvasName, selectedItem);
}

function chooseSelected() {
  var selectedItem = curSelectedObject();

  if (selectedItem != undefined) {
    elements = [];
    positionAll(selectedItem, ancestorCanvasName, ancestorLevels, 50, 50, elements);
    repaint(ancestorCanvasName);
    showKittyDetails(detailsCanvasName, selectedItem);
  }
}

function handleObjectClicked (event, canvasName) {

  selection = getClickedObject(event, canvasName);
  if (selection != undefined) {
    showKittyDetails(detailsCanvasName, selection);
  }
  repaint(canvasName);
}


function handleObjectDoubleClicked (event, canvasName) {
  selection = getClickedObject(event, canvasName);
  if (selection != undefined) {
    chooseSelected();
  }
}


function setup(canvasAncestor, canvasDetails) {
    // build generic family
    var item = new FamilyItem(id++, '#05EFFF', 200, 15, 50, 50);
    var ancestorLevels = 2; // 3;
    var kidCount = 2; //2;
    buildFamily(item,elements, 0, ancestorLevels, kidCount);

    var childLevels = 2;
    var children = 4;
    buildChildren(item, elements, 0, childLevels, children, 0.8);


    init(item, canvasAncestor, canvasDetails, 7, elements);
    repaint(ancestorCanvasName);

}

function position(item) {
  POSITIONTREE(item);
}

function displayLeftMost(item, levels) {

  console.log('children: ' + item.children.length);
  for (var child = 0; child < item.children.length;
    child++) {
    for (var level = 1; level <= levels; level++) {
      //var leftMost = GETLEFTMOST(item.children[child], 0, level);
      var leftMost = LEFTSIBLING(item.children[child], 0, level);
      var id = null;
      if (leftMost != undefined) {
        id = leftMost.id;
      }
      var text = 'child: ' + child + ' level: ' + level + ' leftmost: ' + id;
      console.log(text);
    }
  }


}

function buildFamily(item, list, curLevel, maxLevels, kids) {
  var mom = new FamilyItem(id++, '#0000EF', 20, 20, 50, 50);
  var dad = new FamilyItem(id++, '#EF00EF', 40, 150, 50, 50);

  if (curLevel < maxLevels) {
    // add mom
    item.setMom(mom);
    mom.children.push(item);
    buildFamily(mom, list, curLevel + 1, maxLevels, 0);

    // add dad
    item.setDad(dad);
    dad.children.push(item);
    buildFamily(dad, list, curLevel + 1, maxLevels, 0);
  }

  if (kids > 0 && curLevel == 0) {
    // give parents more children
    for (var i = 0; i < kids; i++) {
      var kid = new FamilyItem(id++, '#0000EF', 20, 20, 50, 50);
      kid.setMom(mom);
      mom.children.push(kid);

      kid = new FamilyItem(id++, '#00AAEF', 20, 20, 50, 50);
      kid.setDad(dad);
      dad.children.push(kid);
    }
  }
}

function buildChildren(item, list, curLevel, maxLevels, maxKids, randomBabies) {
  if (curLevel < maxLevels) {
    //var kids = maxKids * Math.random() ;
    var kids = maxKids;

    var children = [];
    for (var i = 0; i < kids; i++) {
        var kid = new FamilyItem(id++, '#0000EF', 20, 20, 50, 50);
        kid.setMom(item);
        list.push(kid);
        children.push(kid);

        // if at bottom level, build random babies
        if (curLevel == maxLevels - 1) {
          if (Math.random() < randomBabies) {
            var baby = new FamilyItem(id++, '#00EF00', 20, 20, 50, 50);
            baby.setMom(kid);
            list.push(baby);
            var newChildren = [];
            newChildren.push(baby);
            kid.setChildren(newChildren);

            var baby2 = new FamilyItem(id++, '#00EF00', 20, 20, 50, 50);
            baby2.setMom(kid);
            list.push(baby2);
            newChildren.push(baby2);

            var baby3 = new FamilyItem(id++, '#00EF00', 20, 20, 50, 50);
            baby3.setMom(kid);
            list.push(baby3);
            newChildren.push(baby3);
          }
        }
        else {
          buildChildren(kid, list, curLevel + 1, maxLevels, maxKids, randomBabies);
        }

    }
    item.setChildren(children);
  }
}
