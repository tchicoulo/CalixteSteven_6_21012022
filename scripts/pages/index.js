import BannerPhotographers from "../templates/BannerPhotographers.js";

async function getPhotographers() {
  // Fetch Json data
  let photographers = [];
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographers = data));

  //return photographers data
  return photographers;
}

function displayData(photographers) {
  photographers.map((photographer) => {
    const template = new BannerPhotographers(photographer);
    return template.createBannerPhotographers();
  });
}

async function init() {
  // Get photographers
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
