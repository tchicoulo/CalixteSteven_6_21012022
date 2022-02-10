export default class Video {
  constructor(data) {
    this._title = data.title;
    this._idPhotograph = data.photographerId;
    this._video = data.video;
  }

  getMedia() {
    const result = `
      <video 
        <video controls>
          <source 
            src="./assets/photographers/${this._idPhotograph}/${this._video}"
            alt="media: ${this._title}"
            type="video/mp4">
        </video>
        `;
    return result;
  }
}
