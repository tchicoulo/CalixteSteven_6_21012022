import Photo from "../models/Photo.js";
import Video from "../models/Video.js";

export default class MediasFactory {
  constructor(data) {
    this.media = null;
    if (data.hasOwnProperty("image")) {
      this.media = new Photo(data);
    } else if (data.hasOwnProperty("video")) {
      this.media = new Video(data);
    } else {
      throw "Erreur: Type de format non reconnu";
    }
  }

  display() {
    return this.media.getMedia();
  }
}
