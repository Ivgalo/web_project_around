import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  gallery,
  validationConfig,
  formElements,
  formValidators,
  paragName,
  paragAbout,
  inpName,
  inpAbout,
  editFormSelector,
  addFormSelector,
  avatarFormSelector,
  editButton,
  addButton,
  avatarButton,
  avatarImage,
} from "../constants/utils.js";

const userInfo = new UserInfo({
  nameSelector: paragName,
  jobSelector: paragAbout,
  avatarSelector: avatarImage,
});

const popupImage = new PopupWithImage("#popup-image");
popupImage.setEventListeners();

const popupConfirm = new PopupWithConfirmation("#popup-confirm");
popupConfirm.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "6b0bf576-23ee-4b75-bea4-130f2da1a1a2",
    "Content-Type": "application/json",
  },
});


const createCard = (cardData) => {
  const card = new Card(
    cardData,
    "#main__template",
    popupImage,

    (cardInstance) => {
      api
        .changeLikeCardStatus(
          cardInstance.getId(),
          cardInstance.isLiked()
        )
        .then((updatedCard) => {
          cardInstance.updateLike(updatedCard);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
    (cardInstance) => {
      popupConfirm.setSubmitAction(() => {
        api
          .deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.removeCard();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });

      popupConfirm.open();
    }
  );

  return card.getCreateCard();
};

const sectionCard = new Section(
  {
    renderer: (item) => {
      sectionCard.addItem(createCard(item));
    },
  },
  gallery
);

const popupFormEdit = new PopupWithForm(
  "#popup-edit",
  editFormSelector,
  ({ name, about }) => {
    api
      .editProfile({ name, about })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
        });

        popupFormEdit.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

popupFormEdit.setEventListeners();


const popupFormAdd = new PopupWithForm(
  "#popup-add",
  addFormSelector,
  ({ title, link }) => {
    api
      .addCard({
        name: title,
        link,
      })
      .then((cardData) => {
        sectionCard.addItem(createCard(cardData));
        popupFormAdd.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

popupFormAdd.setEventListeners();


const popupAvatar = new PopupWithForm(
  "#popup-avatar",
  avatarFormSelector,
  ({ avatar }) => {
    api
      .editAvatar({ avatar })
      .then((userData) => {
        userInfo.setAvatar(userData.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

popupAvatar.setEventListeners();


formElements.forEach((form) => {
  const validator = new FormValidator(validationConfig, form);

  validator.enableValidation();
  formValidators.push(validator);
});

const resetFormValidation = (formSelector) => {
  const form = document.querySelector(formSelector);
  const formIndex = Array.from(formElements).indexOf(form);
  const validator = formValidators[formIndex];

  if (validator) {
    validator.resetValidation();
  }
};


editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();

  inpName.value = data.name;
  inpAbout.value = data.job;

  resetFormValidation(editFormSelector);
  popupFormEdit.open();
});

addButton.addEventListener("click", () => {
  resetFormValidation(addFormSelector);
  popupFormAdd.open();
});

avatarButton.addEventListener("click", () => {
  resetFormValidation(avatarFormSelector);
  popupAvatar.open();
});


Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    userInfo.setAvatar(userData.avatar);

    cards.forEach((cardData) => {
      sectionCard.addItem(createCard(cardData));
    });
  })
  .catch((err) => {
    console.log(err);
  });