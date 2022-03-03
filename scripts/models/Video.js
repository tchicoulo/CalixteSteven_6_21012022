export default class Video {
  constructor(data) {
    this._title = data.title;
    this._idPhotograph = data.photographerId;
    this._video = data.video;
  }

  getMedia() {
    const result = `
      <video>
          <source data-title="${this._title}"
            src="./assets/photographers/${this._idPhotograph}/${this._video}"
            type="video/mp4">
            <track src="./assets/photographers/${this._idPhotograph}/${this._video}" label="${this._title}" kind="captions" default >
        </video>
        `;
    return result;
  }
}
