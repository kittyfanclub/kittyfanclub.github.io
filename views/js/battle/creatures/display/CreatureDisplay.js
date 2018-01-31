// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
class CreatureDisplay {
  constructor(_left, _top, _width, _height, _imgAddress, _img) {
    this.left = _left;
    this.top = _top;
    this.width = _width;
    this.height = _height;
    this.imgAddress = _imgAddress;
    this.img = _img;
    this.origImg = _img;
    this.woundList = [];
  }

  clone() {
    var clone = new CreatureDisplay(this.left, this.top, this.width, this.height, this.imgAddress, this.img);
    return clone;
  }

  reset() {
    this.img = this.origImg;
    this.woundList = [];
  }

  lifeUpdated(lifePercent) {
    var woundsNeeded =  Math.round(g_creatureWoundArray.length * (1 - lifePercent));
    woundsNeeded = Math.max(Math.min(woundsNeeded, g_creatureWoundArray.length), 0);
    // add wounds
    if (woundsNeeded > this.woundList.length) {
      while (woundsNeeded > this.woundList.length) {
        this.addWound();
      }
    }
    else {
      // remove wounds
      while (woundsNeeded < this.woundList.length) {
        this.removeLastWound();
      }
    }
  }

  addImage(newImg) {
    if (Array.isArray(this.img) != true) {
      var tmp = this.img;
      this.img = [];
      this.img.push(tmp);
    }
    this.img.push(newImg);
  }

  removeLastImage() {
    if (Array.isArray(this.img) == true) {
      var entries = this.img.length;
      if (entries > 0) {
        this.img.splice(entries - 1, 1);
      }
    }
  }

  addWound() {
    var woundNumber = this.nextWoundNumber();
    if (woundNumber >= 0) {
      var woundImage = g_creatureWoundArray[woundNumber];
      // get random element in array
      var entry = Math.floor(Math.random() * (woundImage.imageArr.length));
      var wound = woundImage.imageArr[entry];
      this.woundList.push(woundNumber);
      this.addImage(wound);
    }
  }

  removeLastWound() {
    var entries = this.woundList.length;
    if (entries > 0) {
      this.woundList.splice(entries - 1, 1);
      this.removeLastImage();
    }
  }


  nextWoundNumber() {
    if (this.woundList.length == 0) {
      // random number
      return Math.floor(Math.random() * (g_creatureWoundArray.length))
    }
    else if (this.woundList.length >= g_creatureWoundArray.length) {
      return -1;
    }
    else {
      // get next wound number
      var lastNumber = this.woundList[this.woundList.length - 1];
      return (lastNumber + 1) % g_creatureWoundArray.length;
    }
  }
}
