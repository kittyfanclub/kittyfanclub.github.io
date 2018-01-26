class CreatureDisplay {
  constructor(_left, _top, _width, _height, _imgAddress, _img) {
    this.left = _left;
    this.top = _top;
    this.width = _width;
    this.height = _height;
    this.imgAddress = _imgAddress;
    this.img = _img;
  }

  clone() {
    var clone = new CreatureDisplay(this.left, this.top, this.width, this.height, this.imgAddress, this.img);
    return clone;
  }
}
