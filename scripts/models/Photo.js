/**
 * Données de la photo
 * @property {object} data
 */

export default class Photo {
  constructor(data) {
    this._title = data.title;
    this._idPhotograph = data.photographerId;
    this._img = data.image;
  }

  getMedia() {
    const result = `
      <img data-title="${this._title}" tabindex="1"
        src="./assets/photographers/${this._idPhotograph}/${this._img}" alt="media: ${this._title}">`;

    return result;
  }
}
