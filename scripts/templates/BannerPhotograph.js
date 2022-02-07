export default class BannerPhotograph {
  constructor(photographId) {
    this._photographId = photographId;
  }

  createBannerPhotograph() {
    localStorage.setItem("namePhotograph", photographId.name);

    const photographHeader = document.querySelector(".photograph-header");

    const bannerPhotograph = `
    <div class='details-photograph'>
      <h1>${this.photographId.name}</h1>
      <p>${this.photographId.city}, ${this.photographId.country}</p>
      <span>${this.photographId.tagline}</span>
    </div>
    <button class="contact_button">
          Contactez-moi
        </button>
    <img src="assets/photographers/Photographers ID Photos/${this.photographId.portrait}" alt="portrait de ${this.photographId.name}" />`;

    photographHeader.innerHTML = bannerPhotograph;

    return photographHeader;
  }
}
