let butEdit = document.querySelector(".main__button_edit");
let popup = document.querySelector(".popup");
let butClose = document.querySelector(".popup__button_close");
let form = document.querySelector(".popup__container");
let inName = document.querySelector(".main__paragraph_name");
let inAbout = document.querySelector(".main__paragraph_about");
let inpName = document.querySelector(".popup__input_name");
let inpAbout = document.querySelector(".popup__input_about");

function openEdit() {
  inpName.value = inName.textContent;
  inpAbout.value = inAbout.textContent;
  popup.classList.add("popup_opened");
}

function closeEdit() {
  popup.classList.remove("popup_opened");
}

butEdit.addEventListener("click", openEdit);
butClose.addEventListener("click", closeEdit);

function saveChange(e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
  openEdit();
}

form.addEventListener("submit", saveChange);