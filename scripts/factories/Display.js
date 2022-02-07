export default class Display {
  static displayPhotographers(photographer) {
    return `  
    <article>
      <a href="./photographer.html?id=${photographer.id}"><div>
        <img
          src="./assets/photographers/Photographers ID Photos/${
            photographer.portrait
          }"
          alt="Aller sur la page photographe du nom de ${photographer.name}"
        />
        <h2>${photographer.name}</h2>
        </a>
      </div>
      <div class="description">
        <p class= "home-city">
          ${photographer.city}, ${photographer.country}
        </p>
        <p>${photographer.tagline}</p>
        <p class="home-price">${Math.round(photographer.price / 7)}€/heure</p>
      </div>
    </article>
    `;
  }

  // static displayCounter {

  // }
}
