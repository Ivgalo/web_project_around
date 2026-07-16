export const editFormSelector = ".form-edit";
export const addFormSelector = ".form-add";
export const editButton = document.querySelector(".main__button_edit");
export const addButton = document.querySelector(".main__button_add");
export const closeButton = document.querySelector(".popup__button_close");
export const formEdit = document.querySelector(editFormSelector);
export const formAdd = document.querySelector(addFormSelector);
export const popimg = document.querySelector("#popup-image");
export const paragName = document.querySelector(".main__paragraph_name");
export const paragAbout = document.querySelector(".main__paragraph_about");
export const inpName = document.querySelector(".popup__input_name");
export const inpAbout = document.querySelector(".popup__input_about");
export const inpTitle = document.querySelector(".popup__input_title");
export const inpUrl = document.querySelector(".popup__input_url");
export const popupImageElement = popimg.querySelector(".popup__image");
export const popupTextElement = popimg.querySelector(".popup__paragraph");
export const gallery = ".main__gallery";
export const avatarButton = document.querySelector(".main__button_avatar");
export const avatarFormSelector = ".form-avatar";
export const inpAvatar = document.querySelector(".popup__input_avatar");
export const avatarImage = document.querySelector(
  ".main__profile-image"
);
export const initialCards = [
  
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
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const { formSelector } = validationConfig;
export const formElements = document.querySelectorAll(formSelector);
export const formValidators = [];
