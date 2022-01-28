import Display from "../factories/Display.js";

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

  photographersSection.innerHTML = photographers.map((photographer) =>
    Display.displayPhotographers(photographer)
  );
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
