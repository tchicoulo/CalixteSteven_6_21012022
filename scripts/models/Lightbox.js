/**
 * @property {HTMLElement} element
 * @property {String[]} gallery Chemins des images de la lightbox
 */

export default class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll(
        ".gallery-content > img[src$='.jpg'], .gallery-content > video source[src$='.mp4']"
      )
    );
    const gallery = links.map((link) => link.getAttribute("src"));

    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();

        new Lightbox(e.currentTarget.getAttribute("src"), gallery);
      })
    );
  }

  /**
   * @param {String} url URL de l'image et de la video
   * @param {String[]} gallery Chemins des images de la lightbox
   */
  constructor(url, gallery) {
    this.element = this.buildDOM(url);
    this.gallery = gallery;
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   *
   * @param {KeyboardEvent} e
   */

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
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

  next(e) {}

  /**
   * @param {MouseEvent|KeyboardEvent} e
   */

  prev(e) {}

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
        <div class="lightbox-container">
          <img src="${url}" alt="" />
          <h3>Nom de l'image</h3>
        </div>
      </div>`;
    dom
      .querySelector(".lightbox-close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox-next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox-prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

setTimeout(() => {
  Lightbox.init();
}, 3000);
