function displayBanner(currentPhotographer, displayMediaList) {
    const urlParams = new URLSearchParams(window.location.search);
  
    /**
     * name LinkToPhoto
     * @type {string}
     * @description Chemin (path) vers la photo du photographe
     *
     */
    const linkToPhoto =
      "./img/PhotographersID/" + currentPhotographer.portrait;
  
    //  création des elements html
    const bannerBody = document.createElement("div");
    const bannerTitle = document.createElement("h1");
    const bannerLocation = document.createElement("p");
    const bannerTagline = document.createElement("p");
    const containerTagsBanner = document.createElement("nav");
    const containerImgBanner = document.createElement("div");
    const bannerImg = document.createElement("img");
    const btnModal = document.createElement("button");
    const banner = document.querySelector(".banner");
  
    btnModal.addEventListener("click", () => {
      const dialog = document.querySelector(".dialog");
      const main = document.querySelector(".main");
      const closeBtn = document.querySelector(".close-btn");
      const dialogMask = document.querySelector(".dialog-mask");
  
      dialog.classList.add("opened");
      closeBtn.focus();
      dialogMask.addEventListener("click", () => {
        const dialog = document.querySelector(".dialog");
        const main = document.querySelector(".main");
        dialog.classList.remove("opened");
        main.classList.remove("anti-scroll");
        main.setAttribute("aria-hidden", "false");
        dialog.setAttribute("aria-hidden", "true");
      });
      main.classList.add("anti-scroll");
      main.setAttribute("aria-hidden", "true");
      dialog.setAttribute("aria-hidden", "false");
    });

    // ajouts des classes et attributs html
    bannerBody.classList.add("banner-body");
    btnModal.classList.add("banner-btn");
    containerImgBanner.classList.add("banner-img");
    bannerTitle.classList.add("banner-body-title");
    bannerLocation.classList.add("banner-body-location");
    bannerTagline.classList.add("banner-body-tagline");
    bannerTagline.classList.add("banner-body-tagline");
    bannerImg.src = linkToPhoto;
    bannerTitle.setAttribute("lang", "en");
    bannerImg.setAttribute("alt", `${currentPhotographer.name}`);
  
    bannerTitle.textContent = currentPhotographer.name;
    bannerLocation.textContent =
      currentPhotographer.city + " ," + currentPhotographer.country;
    bannerTagline.textContent = currentPhotographer.tagline;
    btnModal.textContent = "Contactez-moi";
  
    // ajout des tags
    currentPhotographer.tags.forEach((el) => {
      const tagsLink = document.createElement("a");
      const tagsSpan = document.createElement("span");
      containerTagsBanner.classList.add("banner-tags-container");
      tagsLink.classList.add("tags-link");
      tagsSpan.classList.add("tags");
      tagsLink.id = `${el}`;
      tagsLink.setAttribute("role", "button");
      tagsLink.textContent = "#";
      tagsSpan.textContent = el;
      tagsLink.href = "#";
  
      tagsLink.addEventListener("click", (e) => {
        e.preventDefault();
        tagsLink.classList.toggle("tag--selected");
        displayMediaList();
      });
  
      if (urlParams.get("tag") && urlParams.get("tag") === el) {
        tagsLink.classList.toggle("tag--selected");
      }
      tagsLink.appendChild(tagsSpan);
      containerTagsBanner.appendChild(tagsLink);
    });
  
    // ajout des éléments dans le DOM
    banner.append(bannerBody, btnModal, containerImgBanner);
    bannerBody.append(
      bannerTitle,
      bannerLocation,
      bannerTagline,
      containerTagsBanner
    );
  
    containerImgBanner.appendChild(bannerImg);
    return btnModal;
  }
  
  export { displayBanner };
  