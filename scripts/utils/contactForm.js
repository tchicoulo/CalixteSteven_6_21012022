export default class Form {
  static init () {
    const form = new Form()
    form.displayForm()
  }

  constructor () {
    return (this.first, this.last, this.email, this.message)
  }

  static displayModal () {
    const formName = document.querySelector('.form-name')

    formName.innerHTML = `Contactez moi <br> ${localStorage.getItem(
      'namePhotograph'
    )}`
    const modal = document.querySelector('.contact-modal')
    modal.classList.add('modalIn')

    // remove tabindex on medias to have a better accessibility
    const medias = document.querySelectorAll(
      '.gallery-content img, .gallery-content video'
    )
    medias.forEach((media) => media.removeAttribute('tabindex'))

    const hiddenSortButton = document.querySelector('#sort')
    hiddenSortButton.setAttribute('disabled', 'disabled')
  }

  closeModal () {
    const modal = document.querySelector('.contact-modal')
    modal.classList.add('modalOut')
    setTimeout(() => {
      modal.classList.remove('modalOut')
      modal.classList.remove('modalIn')
      const medias = document.querySelectorAll(
        '.gallery-content img, .gallery-content video'
      )
      medias.forEach((media) => media.setAttribute('tabindex', '0'))

      const hiddenSortButton = document.querySelector('#sort')
      hiddenSortButton.removeAttribute('disabled')
    }, 600)
  }

  closeModalKeyUp (e) {
    if (e.key === 'Escape') {
      this.closeModal(e)
    }
  }

  errorDisplay (tag, message, valid) {
    const errorMessage = document.querySelector('.error-' + tag)

    if (!valid) {
      errorMessage.classList.add('error')
      errorMessage.textContent = message
    } else {
      errorMessage.classList.remove('error')
      errorMessage.textContent = message
    }
  }

  firstChecker (value) {
    if (value.length > 0 && (value.length < 3 || value.length > 30)) {
      this.errorDisplay(
        'first',
        'Le prénom doit faire entre 3 et 30 caractères'
      )
      this.first = null
    } else {
      this.errorDisplay('first', '', true)
      this.first = value
    }
  }

  lastChecker (value) {
    if (value.length > 0 && (value.length < 3 || value.length > 30)) {
      this.errorDisplay('last', 'Le nom doit faire entre 3 et 30 caractères')
      this.last = null
    } else {
      this.errorDisplay('last', '', true)
      this.last = value
    }
  }

  mailChecker (value) {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      this.errorDisplay('email', "Le mail n'est pas valide")
      this.email = null
    } else {
      this.errorDisplay('email', '', true)
      this.email = value
    }
  }

  messageChecker (value) {
    if (value.length > 0 && (value.length < 10 || value.length > 200)) {
      this.errorDisplay(
        'message',
        'Le message doit faire entre 10 et 200 caractères'
      )
      this.message = null
    } else {
      this.errorDisplay('message', '', true)
      this.message = value
    }
  }

  displayForm () {
    const dom = document.querySelector('.contact-modal')
    dom.innerHTML = `
    <div class="modal">
        <div class="modal-container" role="form">
          <h2 class="form-name">Nom du contact</h2>
          <img src="assets/icons/close.svg" class="close-modal" aria-label="Close Contact form"/>
        </div>
        <div class="modal-body">
          <form aria-label="Contact Form" >
              <label id="First-name" for="first">Prénom</label>
              <input type="text" autocomplete="off" aria-labelledby="First-name First-name-error" name="first" id="first" />
              <span class="error-first" id="First-name-error"></span>
            <br />
              <label id="Last-name" for="last">Nom</label>
              <input type="text" autocomplete="off" aria-labelledby="Last-name Last-name-error" name="last" id="last" />
              <span class="error-last" id="Last-name-error"></span>
            <br />
              <label id="Email" for="mail">Email</label>
              <input type="text" autocomplete="off" aria-labelledby="Email Email-error" name="mail" id="mail" />
              <span class="error-email" id="Email-error"></span>
            <br />
              <label id="Your-message" for="message">Votre message</label>
              <textarea name="message" autocomplete="off" aria-labelledby="Your-message Your-message-error" id="message"></textarea>
              <span class="error-message" id="Your-message-error"></span>

            <button class="btn-submit" aria-label="Send">Envoyer</button>
          </form>
        </div>
      </div>`
    const form = document.querySelector('form')
    dom
      .querySelector('.close-modal')
      .addEventListener('click', this.closeModal)

    document.addEventListener('keyup', (e) => this.closeModalKeyUp(e))

    const inputs = document.querySelectorAll(
      "input[type='text'], textarea[name='message']"
    )
    inputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        switch (e.target.id) {
          case 'first':
            this.firstChecker(e.target.value)
            break
          case 'last':
            this.lastChecker(e.target.value)
            break
          case 'mail':
            this.mailChecker(e.target.value)
            break
          case 'message':
            this.messageChecker(e.target.value)
            break
          default:
            return null
        }
      })
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()

      if (this.first && this.last && this.email && this.message) {
        const data = {
          Prenom: this.first,
          Nom: this.last,
          Email: this.email,
          Message: this.message
        }
        console.log(data)
        inputs.forEach((input) => (input.value = ''))

        this.first = null
        this.last = null
        this.email = null
        this.message = null

        this.closeModal()
        setTimeout(() => {
          alert('Inscription Validée !')
        }, 1000)
      } else {
        alert('Veuillez Remplir correctement les champs')
      }
    })

    return dom
  }
}

Form.init()
