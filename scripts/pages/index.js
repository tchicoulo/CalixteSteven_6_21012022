import BannerPhotographers from "../templates/BannerPhotographers.js";

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
  photographers.map((photographer) => {
    const template = new BannerPhotographers(photographer);
    return template.createBannerPhotographers();
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
