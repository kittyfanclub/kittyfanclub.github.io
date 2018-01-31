// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
populateWoundArray();

function buildWounds() {
  var wounds = [];

  var wound1 = new Image();
  wound1.src = "pics/wounds/wound1.png";
  wounds.push(wound1);

  var wound2 = new Image();
  wound2.src = "pics/wounds/wound2.png";
  wounds.push(wound2);

  var bruise1 = new Image();
  bruise1.src = "pics/wounds/bruise1.png";
  wounds.push(bruise1);

  var bruise2 = new Image();
  bruise2.src = "pics/wounds/bruise2.png";
  wounds.push(bruise2);

  var bandage = new Image();
  bandage.src = "pics/wounds/bandage2.png";
  wounds.push(bandage);

  return wounds;
}

function populateWoundArray() {
  setCreatureSize(250, 250);

  new WoundImage(buildWounds(), 105, 70, 30, 30);

  new WoundImage(buildWounds(), 85, 115, 30, 30);

  new WoundImage(buildWounds(), 90, 155, 30, 30);

  new WoundImage(buildWounds(), 135, 115, 20, 20);

  new WoundImage(buildWounds(), 125, 145, 35, 35);
}

function populateWoundArray_old() {
  var wound1 = new Image();
  wound1.src = "pics/wounds/wound1.png";
  //var bruise1 = new Image();
  //wound1.src = "pics/wounds/bruise1.png";

  wound1.overrideX = 85;
  wound1.overrideY = 115;
  wound1.overrideWidth = 30;
  wound1.overrideHeight = 30;
  g_creatureWoundArray.push(wound1);

  var wound2 = new Image();
  wound2.src = "pics/wounds/wound1.png";
  wound2.overrideX = 90;
  wound2.overrideY = 155;
  wound2.overrideWidth = 30;
  wound2.overrideHeight = 30;
  g_creatureWoundArray.push(wound2);

  var wound3 = new Image();
  wound3.src = "pics/wounds/wound1.png";
  wound3.overrideX = 135;
  wound3.overrideY = 115;
  wound3.overrideWidth = 20;
  wound3.overrideHeight = 20;
  g_creatureWoundArray.push(wound3);

  var wound4 = new Image();
  wound4.src = "pics/wounds/wound1.png";
  wound4.overrideX = 125;
  wound4.overrideY = 145;
  wound4.overrideWidth = 35;
  wound4.overrideHeight = 35;
  g_creatureWoundArray.push(wound4);
}
