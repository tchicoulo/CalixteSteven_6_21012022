export default class Lightbox {
  constructor(arrayMedias, currentMedia = 0) {
    this.arrayMedia = arrayMedias;
    this._currentMedia = currentMedia;
  }

  next() {} //pour la lightbox

  prev() {} // Pour la lightbox

  closeLightbox() {} //fermer la lighbox
}
