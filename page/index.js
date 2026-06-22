import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  gallery,
  initialCards,
  validationConfig,
  formElements,
  formValidators,
  paragName,
  paragAbout,
  inpName,
  inpAbout,
  editFormSelector,
  addFormSelector,
  editButton,
  addButton,
} from "../constants/utils.js";
const userInfo = new UserInfo({
  nameSelector: paragName,
  jobSelector: paragAbout,
});
const popupImage = new PopupWithImage("#popup-image");
popupImage.setEventListeners();
const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#main__template", popupImage);
      sectionCard.addItem(card.getCreateCard());
    },
  },
  gallery
);

sectionCard.renderItems();
const popupFormEdit = new PopupWithForm(
  "#popup-edit",
  editFormSelector,
  ({ name, about }) => {
    userInfo.setUserInfo({
      name,
      job: about,
    });

    popupFormEdit.close();
  }
);

popupFormEdit.setEventListeners();
const popupFormAdd = new PopupWithForm(
  "#popup-add",
  addFormSelector,
  ({ title, link }) => {
    const card = new Card(
      { name: title, link },
      "#main__template",
      popupImage
    );

    sectionCard.addItem(card.getCreateCard());
    popupFormAdd.close();
  }
);

popupFormAdd.setEventListeners();

formElements.forEach((formElement) => {
  const formValidator = new FormValidator(
    validationConfig,
    formElement
  );

  formValidator.enableValidation();
  formValidators.push(formValidator);
});
editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();

  inpName.value = data.name;
  inpAbout.value = data.job;

  popupFormEdit.open();
});

addButton.addEventListener("click", () => {
  popupFormAdd.open();
});
