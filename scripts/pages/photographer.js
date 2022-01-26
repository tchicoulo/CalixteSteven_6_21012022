let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotograph = JSON.parse(urlParams.get("id"));

async function getJson() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      Banner(data.photographers);
      Gallery(data.media);
    });
}

function Banner(data) {
  const photographHeader = document.querySelector(".photograph-header");

  const photographId = data.filter(
    (photograph) => photograph.id === idPhotograph
  );

  for (elem of photographId) {
    photographHeader.innerHTML = `
    <div class='details-photograph'>
      <h1>${elem.name}</h1>
      <p>${elem.city}, ${elem.country}</p>
      <span>${elem.tagline}</span>
    </div>
    <button class="contact_button" onclick="displayModal()">
          Contactez-moi
        </button>
    <img src="assets/photographers/Photographers ID Photos/${elem.portrait}" alt="portrait de ${elem.name}" />`;
  }
}

function Gallery(data) {
  console.log(data);
}

const utils = {
  displayModal: function () {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  },

  closeModal: function () {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  },
};

getJson();
