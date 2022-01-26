async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  let photographers = [];
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographers = data));
  // et bien retourner le tableau photographers seulement une fois
  console.log(photographers);
  return photographers;
}

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographersSection.innerHTML = photographers.map(
    (photographer) =>
      `  
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
    `
  );

  // photographers.forEach((photographer) => {
  // const photographerModel = photographerFactory(photographer);
  // const userCardDOM = photographerModel.getUserCardDOM();
  // photographersSection.appendChild(userCardDOM);

  // });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
