export default class BannerPhotograph {
  constructor(photograph) {
    this._photograph = photograph;
    this.createBannerPhotograph();
  }

  createBannerPhotograph() {
    const photographHeader = document.querySelector(".photograph-header");

    const bannerPhotograph = `
    <div class='details-photograph'>
      <h1>${this._photograph.name}</h1>
      <h2>${this._photograph.city}, ${this._photograph.country}</h2>
      <span>${this._photograph.tagline}</span>
    </div>
    <button class="contact_button">
          Contactez-moi
        </button>
    <img src="assets/photographers/PhotographersIDPhotos/${this._photograph.portrait}" alt="portrait de ${this._photograph.name}" />`;

    photographHeader.innerHTML = bannerPhotograph;

    let name = document.querySelector("h1");
    localStorage.setItem("namePhotograph", name.textContent);

    return photographHeader;
  }
}
