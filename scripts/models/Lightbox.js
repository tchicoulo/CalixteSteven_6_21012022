/**
 * @property {HTMLElement} element Création du Dom avec le media sélectionné
 * @property {String[]} medias Array des images de la lightbox
 * @param {Number} index Index de l'image ou de la video actuellement affiché
 */

export default class Lightbox {
  static init() {
    setTimeout(() => {
      const medias = Array.from(
        document.querySelectorAll(
          ".gallery-content > img, .gallery-content > video"
        )
      );

      medias.forEach((media, index) =>
        media.addEventListener("click", (e) => {
          e.preventDefault();

          new Lightbox(index, medias);
          document.querySelector(".gallery").style.visibility = "hidden";
        })
      );

      medias.forEach((media, index) =>
        media.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            new Lightbox(index, medias);
            document.querySelector(".gallery").style.visibility = "hidden"; //make it invisible for a better accessibility
          }
        })
      );
    }, 1500);
  }

  /**
   * @param {Number} index Index de l'image ou de la video actuellement affiché
   * @param {String[]} medias Array des images de la lightbox
   */

  constructor(index, medias) {
    this.medias = medias;
    this.i = index;

    let media = this.medias[this.i];
    this.element = this.buildDOM(media);
    this.loadMedia(media);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", (e) => this.onKeyUp(e));
  }

  /**
   * media de l'image actuellement sélectionné
   * @param {String} media
   */

  loadMedia(media) {
    const container = this.element.querySelector(".lightbox-container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox-loader");
    container.innerHTML = "";
    container.appendChild(loader);
    container.removeChild(loader);
    const h3 = this.element.querySelector(".lightbox-title");

    if (media == "[object HTMLVideoElement]") {
      const mediaVideo = media.outerHTML;
      container.innerHTML = mediaVideo;
      container.getElementsByTagName("video")[0].autoplay = true;
      container.getElementsByTagName("video")[0].loop = true;
      h3.textContent = media.querySelector("source").dataset.title;
    } else {
      container.innerHTML = media.outerHTML;
      h3.textContent = media.dataset.title;
    }
  }

  /**
   * Evènements des touches aux claviers de la lightbox
   * @param {KeyboardEvent} e
   */

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    }
    if (e.key === "ArrowLeft") {
      this.prev(e);
    }
    if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent|KeyboardEvent} e
   */

  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    document.querySelector(".gallery").style.visibility = "visible"; //make it visible for enabled the accessibility
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * Passe à l'image suivante
   * @param {MouseEvent|KeyboardEvent} e
   */

  next(e) {
    e.preventDefault();

    let i = this.medias.findIndex((media) => media === this.medias[this.i]);

    if (i === this.medias.length - 1) {
      i = -1;
      this.i = -1;
    }
    this.i++;
    this.loadMedia(this.medias[i + 1]);
  }

  /**
   * Passe à l'image précédente
   * @param {MouseEvent|KeyboardEvent} e
   */

  prev(e) {
    e.preventDefault();

    let i = this.medias.findIndex((media) => media === this.medias[this.i]);

    if (i === 0) {
      this.i = this.medias.length;
      i = this.medias.length;
    }
    this.i--;

    this.loadMedia(this.medias[i - 1]);
  }

  /**
   * Création du DOM
   * @return {HTMLElement}
   */
  buildDOM() {
    const dom = document.createElement("section");
    dom.setAttribute("aria-label", "Image closeup view");
    dom.classList.add("lightbox-modal");
    dom.innerHTML = `
      <div class="lightbox">
      <button class="lightbox-prev" aria-label="Previous image">précédent</button>
      <div class="lightbox-container"></div>
      <button class="lightbox-next" aria-label="Next image">Suivant</button>
      <button class="lightbox-close" aria-label="Close dialog">Fermer</button>
        <h3 class="lightbox-title"></h3>
      </div>`;
    dom
      .querySelector(".lightbox-close")
      .addEventListener("click", (e) => this.close(e));
    dom
      .querySelector(".lightbox-next")
      .addEventListener("click", (e) => this.next(e));
    dom
      .querySelector(".lightbox-prev")
      .addEventListener("click", (e) => this.prev(e));
    return dom;
  }
}

Lightbox.init();
