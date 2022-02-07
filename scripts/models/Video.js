export default class Video {
  constructor(data) {
    this._title = data.title;
    this._idPhotograph = data.idPhotograph;
    this._video = data.video;
  }

  display() {
    const result = `
      <video 
        <video controls>
          <source 
            src="./assets/photographers/${this.idPhotograph}/${this.video}"
            alt="media: ${this.title}"
            type="video/mp4">
        </video>
        `;
    return result;
  }
}
