import { reset } from "./FormValidator.js";
import { add } from "./index.js";

const butEdit = document.querySelector(".main__button_edit");
const butAdd = document.querySelector(".main__button_add");
const butClose = document.querySelector(".popup__button_close");
const popup = document.querySelector(".popup");
const formEd = document.querySelector("#formEdit");
const formAdd = document.querySelector("#formAdd");
const popimg = document.querySelector(".popup__images");
const paragName = document.querySelector(".main__paragraph_name");
const paragAbout = document.querySelector(".main__paragraph_about");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
const inpTitle = document.querySelector(".popup__input_title");
const inpUrl = document.querySelector(".popup__input_url");

const openEditAdd = (e) => {
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
};

const close = () => {
  popup.classList.remove("popup_opened");
  popimg.classList.remove("popup__item-hidden");
  formAdd.classList.remove("popup__item-hidden");
  formEd.classList.remove("popup__item-hidden");
  reset(popup);
};

butEdit.addEventListener("click", openEditAdd);
butClose.addEventListener("click", close);
butAdd.addEventListener("click", openEditAdd);
document.addEventListener("keydown", (e) => {
  const formList = e.target.classList;
  if (e.key === "Escape") {
    close();
  } else if (e.key === "Enter" && formList.contains("form-edit")) {
    saveChangeEdit();
  } else if (e.key === "Enter" && formList.contains("form-add")) {
    saveCard();
  }
});
document.addEventListener("click", (e) => {
  const popClass = e.target.classList;
  if (popClass.contains("popup_opened")) {
    close();
  }
});

const imagePopup = (name, title) => {
  const popimag = popimg.querySelector(".popup__image");
  const poptxt = popimg.querySelector(".popup__paragraph");
  popimag.src = title;
  popimag.alt = name;
  poptxt.textContent = name;
  popup.classList.toggle("popup_opened");
  formAdd.classList.toggle("popup__item-hidden");
  formEd.classList.toggle("popup__item-hidden");
};

const saveChangeEdit = () => {
  paragName.textContent = inpName.value;
  paragAbout.textContent = inpAbout.value;
  close();
};

const saveCard = () => {
  add(inpTitle.value, inpUrl.value, "#main__template");
  close();
};

formEd.addEventListener("submit", saveChangeEdit);
formAdd.addEventListener("submit", saveCard);

export { imagePopup };