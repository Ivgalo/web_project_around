import Card from "../components/Card.js";
import FormCard from "../components/FormCard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupImageElement,
  popupTextElement,
  gallery,
  initialCards,
  validationConfig,
  formElements,
  formValidators,
  paragName,
  paragAbout,
  editFormSelector,
  addFormSelector,
  editButton,
  addButton,
} from "../constants/utils.js";
export const saveChangeEdit = () => {
  usInfo.setUserInfo({ name: inpName.value, job: inpAbout.value });
  closePop();
};

export const saveCard = () => {
  add(inpTitle.value, inpUrl.value, "#main__template");
  closePop();
};
 const popupFormEdit = new PopupWithForm(
"#popup-edit", editFormSelector,saveChangeEdit);
popupFormEdit.setEventListeners();
export const popupFormAdd = new PopupWithForm(
  "#popup-add",
  addFormSelector,
  saveCard
);
popupFormAdd.setEventListeners();

const popupImage = new PopupWithImage("#popup-image");
popupImage.setEventListeners();

export const usInfo = new UserInfo({
  nameSelector: paragName,
  jobSelector: paragAbout,
});
//const popupEditProfile = new PopupWithForm("#popup-edit", handleEditSubmit);
//const popupAddCard = new PopupWithForm("#popup-add", handleAddSubmit);
const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (items) => {
      const card = new Card(items, "#main__template", popupImage);
      const cardElement = card.getCreateCard();
      sectionCard.addItem(cardElement);
    },
  },
  gallery
);
sectionCard.renderer();

const formCardsAdd = (titleValue, linkValue, cardSelector) => {
  const sectionInstance = new Section(
    {
      items: [],
      renderer: (data) => {
        const formCard = new FormCard(cardSelector, popupImage);
        formCard.handleCreateCard(data.link, data.title);
        return formCard.getCreateCard();
      },
    },
    gallery
  );
  const cardData = { link: linkValue, title: titleValue };
  sectionInstance.addItem(sectionInstance._renderer(cardData));
};

formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
  formValidators.push(formValidator);
});

editButton.addEventListener("click", () => {
  popupFormEdit.open();
});

addButton.addEventListener("click", () => {
  popupFormAdd.open();
});

document.addEventListener("keydown", (e) => {
  const formList = e.target.classList;
  if (e.key === "Enter" && formList.contains("form-edit")) {
    saveChangeEdit();
  } else if (e.key === "Enter" && formList.contains("form-add")) {
    saveCard();
  }
});

export { formCardsAdd as add };

export const openEditAdd = (e, openPop) => {
  const butClass = e.target.classList;
  if (butClass.contains("main__button_edit")) {
    openPop.open();
    formAdd.classList.toggle("popup__item-hidden");
    popimg.classList.toggle("popup__item-hidden");
    const userData = usInfo.getUserInfo();
    inpName.value = userData.name;
    inpAbout.value = userData.job;
    formValidators.forEach((validator) => {
      if (validator._formElement === formEd) {
        validator.resetValidation();
      }
    });
  } else if (butClass.contains("main__button_add")) {
    openPop.open();
    formEd.classList.toggle("popup__item-hidden");
    popimg.classList.toggle("popup__item-hidden");
  }
};

export const closePop = () => {
  popup.classList.remove("popup_opened");
  popimg.classList.remove("popup__item-hidden");
  formAdd.classList.remove("popup__item-hidden");
  formEd.classList.remove("popup__item-hidden");
  resetFormAndValidation(popup);
};

const resetFormAndValidation = (modal) => {
  const formElements = modal.querySelectorAll(validationConfig.formSelector);
  formElements.forEach((formElement) => {
    formElement.reset();
    const formValidator = formValidators.find(
      (validator) => validator._formElement === formElement
    );
    if (formValidator) {
      formValidator.resetValidation();
    }
  });
};