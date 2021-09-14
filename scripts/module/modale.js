/**
 * @module modale
 */

function openDialog() {
  const dialog = document.querySelector(".dialog");
  const main = document.querySelector(".main");
  const closeBtn = document.querySelector(".close-btn");
  const dialogMask = document.querySelector(".dialog-mask");

  dialog.classList.add("opened");
  closeBtn.focus();
  dialogMask.addEventListener("click", closeDialog);
  main.classList.add("anti-scroll");
  main.setAttribute("aria-hidden", "true");
  dialog.setAttribute("aria-hidden", "false");
}
function closeDialog() {
  const dialog = document.querySelector(".dialog");
  const main = document.querySelector(".main");
  dialog.classList.remove("opened");
  main.classList.remove("anti-scroll");
  main.setAttribute("aria-hidden", "false");
  dialog.setAttribute("aria-hidden", "true");
}

function verifModal(currentPhotographer) {
  const formFirstName = document.querySelector(".firstName");
  const formLastName = document.querySelector(".lastName");
  const formEmail = document.querySelector(".email");
  const formMsg = document.querySelector(".msg");
  const errorMessage = document.querySelectorAll(".message-alert");

  let verifFirst;
  let verifLast;
  let verifMail;
  let verifMsg;

  // verifie si les champs de la modal sont bien remplis
  formFirstName.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[0].style.display = "inline";
      formFirstName.classList.add("echec");
      formFirstName.classList.add("border");

      setTimeout(() => {
        formFirstName.classList.remove("echec");
        formFirstName.classList.remove("border");
      }, 500);
      verifFirst = false;
    } else {
      errorMessage[0].style.display = "none";
      verifFirst = true;
    }
  });
  formLastName.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[1].style.display = "inline";
      formLastName.classList.add("echec");
      formLastName.classList.add("border");

      setTimeout(() => {
        formLastName.classList.remove("echec");
        formLastName.classList.remove("border");
      }, 500);
      verifLast = false;
    } else {
      errorMessage[1].style.display = "none";
      verifLast = true;
    }
  });
  formEmail.addEventListener("input", (e) => {
    const regexMail = /\S+@\S+\.\S+/;
    if (e.target.value.search(regexMail) === 0) {
      errorMessage[2].style.display = "none";
      verifMail = true;
    } else if (e.target.value.search(regexMail) === -1) {
      errorMessage[2].style.display = "inline";
      formEmail.classList.add("echec");
      formEmail.classList.add("border");

      setTimeout(() => {
        formEmail.classList.remove("echec");
        formEmail.classList.remove("border");
      }, 500);
      verifMail = false;
    }
  });

  formMsg.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[3].style.display = "inline";
      formMsg.classList.add("echec");
      formMsg.classList.add("border");

      setTimeout(() => {
        formMsg.classList.remove("echec");
        formMsg.classList.remove("border");
      }, 500);
      verifMsg = false;
    } else {
      errorMessage[3].style.display = "none";
      verifMsg = true;
    }
  });

  // submit form
  document.getElementById("contact").addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      verifFirst === true &&
      verifLast === true &&
      verifMail === true &&
      verifMsg === true
    ) {
      const modalTitle = document.querySelector(".modal-title");
      const close = document.querySelector(".close-btn");

      const bannerModal = document.querySelector(".modal-form");
      bannerModal.style.display = "none";
      bannerModal.setAttribute("aria-hidden", "true");
      close.focus();
      modalTitle.innerHTML = `Votre message a bien été envoyé à <br>${currentPhotographer.name} `;
      modalTitle.classList.add("message-valid");

      // log des information entrée par l'uttisatteur
      let datas = new FormData(bannerModal);
      for (let i of datas.entries()) {
        console.log(i[0], ":", i[1]);
      }
    }
  });
}

export { verifModal, openDialog, closeDialog };