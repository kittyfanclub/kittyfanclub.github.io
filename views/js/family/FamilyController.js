// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
var ancestorCanvasName;
var detailsCanvasName;
var id = 1;

function buildCanvas(canvas1, canvas2) {
  initCanvasObjects(canvas1);
  ancestorCanvasName = canvas1;
  detailsCanvasName = canvas2;
}

function showKitties(selectedItem) {
  selectedItem.selected = true;
  positionAll(selectedItem, ancestorCanvasName, 50, 50, familyTreeElements);
  showKittyDetails(detailsCanvasName, selectedItem);
  repaint(ancestorCanvasName);
}

function chooseSelected() {
  var selectedItem = curSelectedObject();

  if (selectedItem != undefined) {
    familyTreeElements = [];
    positionAll(selectedItem, ancestorCanvasName, 50, 50, familyTreeElements);
    repaint(ancestorCanvasName);
    showKittyDetails(detailsCanvasName, selectedItem);
  }
}
function showSelectedFamilyTree() {
  var selectedItem = curSelectedObject();

  if (selectedItem != undefined) {
    familyTreeElements = [];
    //buildCanvas(canvasAncestor, canvasDetails);
    loadKitty(ancestorCanvasName, detailsCanvasName, selectedItem.kittyId);
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

function showKittyFamilyTree(canvasAncestor, canvasDetails) {
  var kittyId = document.getElementById('kittyid').value;
  buildCanvas(canvasAncestor, canvasDetails);
  loadKitty(canvasAncestor, canvasDetails, kittyId);
}

function loadKitty(canvasAncestor, canvasDetails, kittyId) {
  kittiesLoaded = 0;
  //   constructor(id, color, top, left, width, height, kittyId, loadParents, loadChidren, mainKitty)
  // 138400
  var item = new FamilyKitty(id++, '#FFFFFF', 200, 15, 50, 50, kittyId, true, true, 'mainkitty');

  let start = Date.now();
  let totalTime = 10000;
  var curKittiesLoaded = -1;
  console.log("Start Loading: " + kittiesLoaded);
  let timer = setInterval(function() {
    if (curKittiesLoaded <= 0) {
      paintText("Calling Kitties", canvasAncestor);
    }
    else {
      paintText(curKittiesLoaded + " Kitties Loaded", canvasAncestor);

    }

    let timePassed = Date.now() - start;
    if (curKittiesLoaded == kittiesLoaded) {
      // no new kitties
      clearInterval(timer);
      console.log("Done loading: " + kittiesLoaded);
      showKitties(item);
    }
    else {
      console.log("Loading: " + kittiesLoaded);
      curKittiesLoaded = kittiesLoaded;
      // check for timeout
      if (timePassed > totalTime) {
        clearInterval(timer);
        showKitties(item);
      }
    }
  }, 500);
  //loadKittyDescendants(item);
}
/*
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

function buildChildren(item, list, curLevel, maxLevels, maxKids) {
  if (curLevel < maxLevels) {
    var kids = maxKids;

    var children = [];
    for (var i = 0; i < kids; i++) {
        var kid = new FamilyItem(id++, '#0000EF', 20, 20, 50, 50);
        kid.setMom(item);
        list.push(kid);
        children.push(kid);
        buildChildren(kid, list, curLevel + 1, maxLevels, maxKids);
    }
    item.setChildren(children);
  }
}
*/
