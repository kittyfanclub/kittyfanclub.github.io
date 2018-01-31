// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
var kittiesLoaded = 0;
class Cattribute {
  constructor(description, type) {
    this.description = description;
    this.type = type;
  }
}
class FamilyKitty extends FamilyItem {
  constructor(id, color, top, left, width, height, kittyId, loadParents, loadChidren, kittyType) {
    super(id, color, top, left, width, height);
    this.kittyId = kittyId;
    this.loadComplete = false;
    this.name = null;
    this.generation = null;
    this.created_at = null;
    this.image_url = null;
    this.image = null;
    this.bio = null;
    this.is_fancy = null;
    this.is_exclusive = null;
    this.fancy_type = null;

    loadFamilyKittyData(this, kittyId, loadParents, loadChidren, kittyType);
  }

  setName(name) {
    this.name = name;
  }
}
function loadFamilyKittyData(kitty, kittyId, loadParents, loadChidren, kittyType) {
  if (kittyId != undefined) {
    var kittyUrl = 'https://api.cryptokitties.co/kitties/' + kittyId;
    try {
      $.getJSON(kittyUrl, function(data) {
        readKittyJson(kitty, data, loadParents, loadChidren, kittyType);
      })
      .done(function() {
        //console.log("Load Done");
        })
      .fail(function() {
        //console.log("Load Failed");
        })
    } catch(e) {
      alert(e);
    }
  }
}

function readKittyJson(kitty, jsonData, loadParentObj, loadChidrenObj, kittyType) {
  //console.log(jsonData);
  kitty.loadComplete = false;
  kitty.kittyId = jsonData.id;
  kitty.setName(jsonData.name);
  kitty.generation = jsonData.generation;
  kitty.created_at = jsonData.created_at;
  kitty.image_url = jsonData.image_url;
  //console.log(kitty.name + ":" + kitty.generation + ":" + kitty.image_url);

  try {
    var img = new Image();
    img.src = kitty.image_url;
    kitty.image = img;
  } catch (err) {
    console.log(err);
  }

  kitty.bio = jsonData.bio;
  kitty.is_fancy = jsonData.is_fancy;
  kitty.is_exclusive = jsonData.is_exclusive;
  kitty.fancy_type = jsonData.fancy_type;

  // cattributes
  var data = jsonData.cattributes;
  var len = data.length;
  kitty.cattributes = new Array(len);
  for (var i = 0; i < len; i++) {
    kitty.cattributes[i] = new Cattribute(data[i].description, data[i].type);
  }

  // parents
  if (loadParentObj != undefined && loadParentObj == true) {
    var loadChildrenParam = null;
    var kittyTypeParam = null;
    if (kittyType != undefined && kittyType=='mainkitty') {
      loadChildrenParam = true;
      kittyTypeParam = 'directparent';
    }
    try {
      kitty.matronId = jsonData.matron.id;
      if (kitty.matronId != undefined) {
        // for mainKitty, load parents children, so we can see siblings
        var mom = new FamilyKitty('', '#FFFFFF', i * 50, 300, 50, 50, kitty.matronId, loadParentObj, loadChildrenParam, kittyTypeParam);
        kitty.setMom(mom);
        mom.children = [];
        mom.children.push(kitty);
      }
    } catch (err) {
    }

    try {
      kitty.sireId = jsonData.sire.id;
      if (kitty.sireId != undefined) {
        var dad = new FamilyKitty('', '#FFFFFF', i * 50, 300, 50, 50, kitty.sireId, loadParentObj, loadChildrenParam, kittyTypeParam);
        kitty.setDad(dad);
        dad.children = [];
        dad.children.push(kitty);
      }
    } catch (err) {
    }
  }

  // children
  if (loadChidrenObj != undefined && loadChidrenObj == true) {
    var children = jsonData.children;
    var loadChildrenParm = loadChidrenObj;
    if (kittyType != undefined && kittyType=='directparent') {
      // don't keep loading children of the main kitties parents
      loadChildrenParm = null;
    }
    if (children != undefined) {
      len = children.length;
      kitty.childrenIds = new Array(len);
      for (var i = 0; i < len; i++) {
        kitty.childrenIds[i] = children[i].id;

        var child = new FamilyKitty('', '#FFFFFF', i * 50, 300, 50, 50, kitty.childrenIds[i], false, loadChildrenParm, false);
        if (child.mom == undefined) {
          // make this better
          child.setMom(kitty);
        }

        kitty.children.push(child)
      }
    }
  }

  // siblings

  kittiesLoaded++;
  kitty.loadComplete = true;
}

/*
  constructor(jsonData) {
    this.loadComplete = false;
    this.id = jsonData.id;
    this.name = jsonData.name;
    this.generation = jsonData.generation;
    this.created_at = jsonData.created_at;
    this.image_url = jsonData.image_url;
    this.color = jsonData.color;
    this.bio = jsonData.bio;
    this.is_fancy = jsonData.is_fancy;
    this.is_exclusive = jsonData.is_exclusive;
    this.fancy_type = jsonData.fancy_type;

    // cattributes
    var data = jsonData.cattributes;
    var len = data.length;
    this.cattributes = new Array(len);
    for (var i = 0; i < len; i++) {
      this.cattributes[i] = new Cattribute(data[i].description, data[i].type);
    }

    try {
      this.matronId = jsonData.matron.id;
      this.sireId = jsonData.sire.id;
    } catch (err) {

    }

    // children
    var children = jsonData.children;
    if (children != undefined) {
      len = children.length;
      this.childrenIds = new Array(len);
      for (var i = 0; i < len; i++) {
        this.childrenIds[i] = children[i].id;
      }
    }

    this.loadComplete = true;
  }

  startBattle() {
    this.health = 100;
  }

}
*/
