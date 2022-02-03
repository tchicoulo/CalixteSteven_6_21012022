export default class Photo {
  constructor(title, idPhotograph, img) {
    this._title = title;
    this._idPhotograph = idPhotograph;
    this._img = img;
  }

  display() {
    const result = `<img src="./assets/photographers/${this.idPhotograph}/${this.img}" alt="media: ${this.title}" />`;

    return result;
  }
}
