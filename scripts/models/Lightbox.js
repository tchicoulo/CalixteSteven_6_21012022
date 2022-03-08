/**
 * @property {HTMLElement} element
 * @property {String[]} gallery Chemins des images de la lightbox
 * @param {String} url Image actuellement affiché
 */

export default class Lightbox {
  static init() {
    setTimeout(() => {
      const medias = Array.from(
        document.querySelectorAll(
          ".gallery-content > img, .gallery-content > video"
        )
      );

      console.log(medias);

      medias.forEach((media, index) =>
        media.addEventListener("click", (e) => {
          e.preventDefault();

          new Lightbox(index, medias);
        })
      );
    }, 1500);
  }

  /**
   * @param {String} url URL de l'image et de la video
   * @param {String[]} medias Chemins des images de la lightbox
   */
  constructor(index, medias) {
    this.medias = medias;

    this.i = index;
    let media = this.medias[this.i];

    this.element = this.buildDOM(media);
    this.loadMedia(media);

    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", (e) => this.onKeyUp(e));
  }

  /**
   *
   * @param {String} url URL de l'image et de la video
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
      console.log(media);
      const mediaVideo = media.outerHTML;
      container.innerHTML = mediaVideo;
      container.getElementsByTagName("video")[0].controls = true;
      container.getElementsByTagName("video")[0].autoplay = true;
      h3.textContent = media.querySelector("source").dataset.title;
    } else {
      container.innerHTML = media.outerHTML;
      h3.textContent = media.dataset.title;
    }
  }

  /**
   *
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
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {MouseEvent|KeyboardEvent} e
   */

  next(e) {
    e.preventDefault();

    let i = this.medias.findIndex((media) => media === this.medias[this.i]);
    console.log(i);

    if (i === this.medias.length - 1) {
      i = -1;
      this.i = -1;
    }
    this.i++;
    this.loadMedia(this.medias[i + 1]);
  }

  /**
   * @param {MouseEvent|KeyboardEvent} e
   */

  prev(e) {
    e.preventDefault();

    let i = this.medias.findIndex((media) => media === this.medias[this.i]);
    console.log(i);

    if (i === 0) {
      this.i = this.medias.length;
      i = this.medias.length;
    }
    this.i--;

    this.loadMedia(this.medias[i - 1]);
  }

  /**
   * @return {HTMLElement}
   */
  buildDOM() {
    const dom = document.createElement("div");
    dom.setAttribute("aria-label", "Image closeup view");
    dom.classList.add("lightbox-modal");
    dom.innerHTML = `
      <div class="lightbox">
        <button class="lightbox-close" aria-label="Close dialog">Fermer</button>
        <button class="lightbox-next" aria-label="Next image">Suivant</button>
        <button class="lightbox-prev" aria-label="Previous image">précédent</button>
        <div class="lightbox-container"></div>
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
