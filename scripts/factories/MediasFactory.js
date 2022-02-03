export default class MediasFactory {
  constructor(data, type) {
    if (type === "photo") {
      return new Photo(data);
    } else if (type === "video") {
      return new Video(data);
    } else {
      throw "Erreur: Type de format non reconnu";
    }
  }
}
