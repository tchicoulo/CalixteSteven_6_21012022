export default class BannerPhotographers {
  constructor(photographers) {
    this._photographers = photographers;
  }

  createBannerPhotographers() {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    const bannerPhotographers = `  
    <article>
      <a href="./photographer.html?id=${this._photographers.id}"><div>
        <img
          src="./assets/photographers/Photographers ID Photos/${
            this._photographers.portrait
          }"
          alt="Aller sur la page photographe du nom de ${
            this._photographers.name
          }"
        />
        <h2>${this._photographers.name}</h2>
        </a>
      </div>
      <div class="description">
        <p class= "home-city">
          ${this._photographers.city}, ${this._photographers.country}
        </p>
        <p>${this._photographers.tagline}</p>
        <p class="home-price">${Math.round(
          this._photographers.price / 7
        )}€/heure</p>
      </div>
    </article>
    `;

    photographersSection.innerHTML += bannerPhotographers;

    return bannerPhotographers;
  }
}
