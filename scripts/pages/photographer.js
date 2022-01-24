// récupérer le photograph avec l'id
let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotograph = JSON.parse(urlParams.get("id"));

async function getPhotograph() {
  let photographer = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      let results = data.photographers;
      const filter = results.filter((obj) => {
        return obj.id === idPhotograph;
      });
      for (elem of filter) {
        photographer = elem;
      }
    });
  console.log(photographer.name);
  return photographer;
}

getPhotograph();
