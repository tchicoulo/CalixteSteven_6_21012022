export default class MediasFactory {
  constructor(data, type) {
    if (type === "image") {
      const photo = new Photo(data);
      return photo.getImg();
    } else if (type === "video") {
      const video = new Video(data);
      return video.getVideo();
    } else {
      throw "Erreur: Type de format non reconnu";
    }
  }
}
