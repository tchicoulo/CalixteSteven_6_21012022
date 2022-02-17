/**
 * @property {HTMLElement} element
 * @property {String[]} gallery Chemins des images de la lightbox
 * @param {String} url Image actuellement affiché
 */

export default class Lightbox {
  static init() {
    setTimeout(() => {
      const links = Array.from(
        document.querySelectorAll(
          ".gallery-content > img[src$='.jpg'], .gallery-content > video source[src$='.mp4']"
        )
      );

      const gallery = links.map((link) => link.getAttribute("src"));

      console.log(links);

      // const titlesImg = Array.from(document.querySelectorAll("h3")).map(
      //   (title) => title.outerText
      // );
      // const Titles = titlesImg;

      links.forEach((link) =>
        link.addEventListener("click", (e) => {
          e.preventDefault();

          new Lightbox(e.currentTarget.getAttribute("src"), gallery);
        })
      );
    }, 1500);
  }

  /**
   * @param {String} url URL de l'image et de la video
   * @param {String[]} gallery Chemins des images de la lightbox
   */
  constructor(url, gallery) {
    this.element = this.buildDOM(url);
    this.loadMedia(url);
    this.gallery = gallery;
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   *
   * @param {string} url URL de l'image et de la video
   */

  loadMedia(url) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox-container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox-loader");
    container.innerHTML = "";
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
  }

  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox-container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox-loader");
    container.innerHTML = "";
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
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
      // this.element.remove();
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {MouseEvent|KeyboardEvent} e
   */

  next(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((media) => media === this.url);
    if (i === this.gallery.length - 1) {
      i = -1;
    }
    this.loadMedia(this.gallery[i + 1]);
  }

  /**
   * @param {MouseEvent|KeyboardEvent} e
   */

  prev(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((media) => media === this.url);
    if (i === 0) {
      i = this.gallery.length;
    }
    this.loadMedia(this.gallery[i - 1]);
  }

  /**
   * @param {string} url URL de l'image et de la video
   * @return {HTMLElement}
   */
  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox-modal");
    dom.innerHTML = `
      <div class="lightbox">
        <button class="lightbox-close">Fermer</button>
        <button class="lightbox-next">Suivant</button>
        <button class="lightbox-prev">précédent</button>
        <div class="lightbox-container"></div>
        <h3>${url.split("/")[4].split(".")[0]}</h3>
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
