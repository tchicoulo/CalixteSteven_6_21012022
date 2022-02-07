export default class Photo {
  constructor(data) {
    this._title = data.title;
    this._idPhotograph = data.idPhotograph;
    this._img = data.img;
  }

  display() {
    const result = `
      <img 
        src="./assets/photographers/${this.idPhotograph}/${this.img}"          alt="media: ${this.title}">`;

    return result;
  }
}
