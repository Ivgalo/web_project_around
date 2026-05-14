const butEdit = document.querySelector(".main__button_edit");
const butAdd = document.querySelector(".main__button_add");
const butClose = document.querySelector(".popup__button_close");
const popButSave = document.querySelector(".popup__button_save");
const popButAdd = document.querySelector(".popup__button_add");
const popup = document.querySelector(".popup");
const formEd = document.querySelector("#formEdit");
const formAdd = document.querySelector("#formAdd");
const popimg = document.querySelector(".popup__images");
const gallery = document.querySelector(".main__gallery");
const paragName = document.querySelector(".main__paragraph_name");
const paragAbout = document.querySelector(".main__paragraph_about");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
const inpTitle = document.querySelector(".popup__input_title");
const inpUrl = document.querySelector(".popup__input_url");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/valle-yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "./images/lago-louise.png",
  },
  {
    name: "Montañas Calvas",
    link: "./images/montañas-calvas.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanois National Park",
    link: "./images/vanois-national-park.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago-braies.png",
  },
];

function openEditAdd(e) {
  const butClass = e.target.classList;
  if (butClass.contains("main__button_edit")) {
    popup.classList.toggle("popup_opened");
    formAdd.classList.toggle("popup__item-hidden");
    popimg.classList.toggle("popup__item-hidden");
  } else if (butClass.contains("main__button_add")) {
    popup.classList.toggle("popup_opened");
    formEd.classList.toggle("popup__item-hidden");
    popimg.classList.toggle("popup__item-hidden");
  }
}

function close() {
  popup.classList.remove("popup_opened");
  popimg.classList.remove("popup__item-hidden");
  formAdd.classList.remove("popup__item-hidden");
  formEd.classList.remove("popup__item-hidden");
  popButSave.classList.remove("popup__item-hidden");
  popButAdd.classList.remove("popup__item-hidden");
  resetValidation();
}

butEdit.addEventListener("click", openEditAdd);
butClose.addEventListener("click", close);
butAdd.addEventListener("click", openEditAdd);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    close();
  } else if (e.key === "Eenter") {
    saveCard();
    saveChangeEdit();
  }
});
document.addEventListener("click", function (e) {
  const popClass = e.target.classList;
  if (popClass.contains("popup_opened")) {
    close();
  }
});

function saveChangeEdit() {
  paragName.textContent = inpName.value;
  paragAbout.textContent = inpAbout.value;
  close();
}

formEd.addEventListener("submit", saveChangeEdit);

function cardsInitials() {
  initialCards.forEach((item) => {
    const cardTemplate = document.querySelector("#main__template").content;
    const cardElement = cardTemplate
      .querySelector(".main__gallery-card")
      .cloneNode(true);
    cardElement.querySelector(".main__gallery-image").src = item.link;
    cardElement.querySelector(".main__gallery-image").alt = item.name;
    cardElement.querySelector(".main__gallery-paragraph").textContent =
      item.name;
    cardElement
      .querySelector(".main__button_like")
      .addEventListener("click", function (e) {
        e.target.classList.toggle("main__button_like_active");
      });
    cardElement
      .querySelector(".main__button_trash")
      .addEventListener("click", function () {
        cardElement.remove();
      });
    cardElement
      .querySelector(".main__gallery-image")
      .addEventListener("click", function () {
        imagePopup(item.name, item.link);
      });
    gallery.append(cardElement);
  });
}
cardsInitials();

function cardsAdd(titleValue, linkValue) {
  const cardTemplate = document.querySelector("#main__template").content;
  const cardElement = cardTemplate
    .querySelector(".main__gallery-card")
    .cloneNode(true);
  cardElement.querySelector(".main__gallery-image").src = linkValue;
  cardElement.querySelector(".main__gallery-image").alt = titleValue;
  cardElement.querySelector(".main__gallery-paragraph").textContent =
    titleValue;
  cardElement
    .querySelector(".main__button_like")
    .addEventListener("click", function (e) {
      e.target.classList.toggle("main__button_like_active");
    });
  cardElement
    .querySelector(".main__button_trash")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  cardElement
    .querySelector(".main__gallery-image")
    .addEventListener("click", function () {
      imagePopup(titleValue, linkValue);
    });
  gallery.prepend(cardElement);
}

function saveCard() {
  cardsAdd(inpTitle.value, inpUrl.value);
  close();
}

formAdd.addEventListener("submit", saveCard);

function imagePopup(name, title) {
  const popimag = popimg.querySelector(".popup__image");
  const poptxt = popimg.querySelector(".popup__paragraph");
  popimag.src = title;
  popimag.alt = name;
  poptxt.textContent = name;
  popup.classList.toggle("popup_opened");
  formAdd.classList.toggle("popup__item-hidden");
  formEd.classList.toggle("popup__item-hidden");
}