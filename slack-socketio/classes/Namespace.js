class Namespace {
  constructor(id, nsTitile, img, endpoint) {
    this.id = id;
    this.img = img;
    this.nsTitile = nsTitile;
    this.endpoint = endpoint;
    this.rooms = [];
  }

  addRoom(roomObj) {
    this.rooms.push(roomObj);
  }
}

module.exports = Namespace;
