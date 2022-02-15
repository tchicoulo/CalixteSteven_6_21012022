export default class Form {
  static init() {
    const form = new Form();
    form.displayForm();
  }

  constructor() {
    this.first;
    this.last;
    this.email;
    this.message;
  }

  static displayModal() {
    const formName = document.querySelector(".form-name");

    formName.innerHTML = `Contactez moi <br> ${localStorage.getItem(
      "namePhotograph"
    )}`;
    const modal = document.querySelector(".contact-modal");
    modal.classList.add("modalIn");
  }

  closeModal() {
    const modal = document.querySelector(".contact-modal");
    modal.classList.add("modalOut");
    setTimeout(() => {
      modal.classList.remove("modalOut");
      modal.classList.remove("modalIn");
    }, 600);
  }

  errorDisplay(tag, message, valid) {
    const errorMessage = document.querySelector(".error-" + tag);

    if (!valid) {
      errorMessage.classList.add("error");
      errorMessage.textContent = message;
    } else {
      errorMessage.classList.remove("error");
      errorMessage.textContent = message;
    }
  }

  firstChecker(value) {
    if (value.length > 0 && (value.length < 3 || value.length > 30)) {
      this.errorDisplay(
        "first",
        "Le pseudo doit faire entre 3 et 30 caractères"
      );
      this.first = null;
    } else {
      this.errorDisplay("first", "", true);
      this.first = value;
    }
  }

  lastChecker(value) {
    if (value.length > 0 && (value.length < 3 || value.length > 30)) {
      this.errorDisplay(
        "last",
        "Le pseudo doit faire entre 3 et 30 caractères"
      );
      this.last = null;
    } else {
      this.errorDisplay("last", "", true);
      this.last = value;
    }
  }

  mailChecker(value) {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      this.errorDisplay("email", "Le mail n'est pas valide");
      this.email = null;
    } else {
      this.errorDisplay("email", "", true);
      this.email = value;
    }
  }

  messageChecker(value) {
    if (value.length > 0 && (value.length < 10 || value.length > 200)) {
      this.errorDisplay(
        "message",
        "Le message doit faire entre 10 et 200 caractères"
      );
      this.message = null;
    } else {
      this.errorDisplay("message", "", true);
      this.message = value;
    }
  }

  displayForm() {
    const dom = document.querySelector(".contact-modal");
    dom.innerHTML = `
    <div class="modal">
        <header>
          <h2 class="form-name"></h2>
          <img src="assets/icons/close.svg" class="close-modal" />
        </header>
        <div class="modal-body">
          <form>
              <label for="first">Prénom</label>
              <input type="text" autocomplete="off" name="first" id="first" />
              <span class="error-first"></span>
            <br />
              <label for="last">Nom</label>
              <input type="text" autocomplete="off" name="last" id="last" />
              <span class="error-last"></span>
            <br />
              <label for="mail">Email</label>
              <input type="text" autocomplete="off" name="mail" id="mail" />
              <span class="error-email"></span>
            <br />
              <label for="message">Votre message</label>
              <textarea name="message" autocomplete="off" id="message"></textarea>
              <span class="error-message"></span>

            <button class="btn-submit">Envoyer</button>
          </form>
        </div>
      </div>`;
    const form = document.querySelector("form");
    dom
      .querySelector(".close-modal")
      .addEventListener("click", this.closeModal);

    const inputs = document.querySelectorAll(
      "input[type='text'], textarea[name='message']"
    );
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        switch (e.target.id) {
          case "first":
            this.firstChecker(e.target.value);
            break;
          case "last":
            this.lastChecker(e.target.value);
            break;
          case "mail":
            this.mailChecker(e.target.value);
            break;
          case "message":
            this.messageChecker(e.target.value);
          default:
            null;
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.first && this.last && this.email && this.message) {
        const data = {
          Prenom: this.first,
          Nom: this.last,
          Email: this.email,
          Message: this.message,
        };
        console.log(data);
        inputs.forEach((input) => (input.value = ""));

        this.first = null;
        this.last = null;
        this.email = null;
        this.message = null;

        this.closeModal();
        setTimeout(() => {
          alert("Inscription Validée !");
        }, 500);
      } else {
        alert("Veuillez Remplir correctement les champs");
      }
    });

    return dom;
  }
}

Form.init();
