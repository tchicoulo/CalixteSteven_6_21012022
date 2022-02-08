export default class Video {
  constructor(data) {
    this._title = data.title;
    this._idPhotograph = data.idPhotograph;
    this._video = data.video;
  }

  getVideo() {
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
