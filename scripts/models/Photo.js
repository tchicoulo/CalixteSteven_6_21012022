export default class Photo {
  constructor(data) {
    this._title = data.title;
    this._idPhotograph = data.idPhotograph;
    this._img = data.img;
  }

  getImg() {
    const result = `
      <img 
        src="./assets/photographers/${this._idPhotograph}/${this._img}"          alt="media: ${this._title}">`;

    return result;
  }
}
