/**
 * @module main
 */

 import { Photographers } from "../constructor/Photographers.js";
 import { PhotographerList } from "../constructor/photographerList.js";
 /**
  * name photographerList
  * @type {array}
  * @description Tableau des objets instanciés avec la classe photographer
  *
  */
 const photographerList = new PhotographerList();
 
 /**
  * name linkToData
  * @type {string}
  * @description le lien vers les données Json Fisheye
  *
  */
 
 const linkToData = "./data/FishEyeDataFR.json";
 
 
 window.addEventListener("load", () => {
   fetch(linkToData)
     .then((response) => {
       if (response.ok) {
         return response.json();
       } else {
         console.log(`Une erreur de type ${response.status}  est survenu ! `);
       }
     })
     .then((data) => createPhotographerList(data))
     .then(displayPage);
 });
 
 /**
  *créer un objet pour chaque photographe et les push dans un nouveau tableau
  * @param {string} data linkToData
  * @returns {array}
  */
 function createPhotographerList(data) {
   data.photographers.forEach((photographer) => {
     photographerList.addPhotographer(
       new Photographers(
         photographer.name,
         photographer.id,
         photographer.city,
         photographer.country,
         photographer.tags,
         photographer.tagline,
         photographer.price,
         photographer.portrait
       )
     );
   });
   return PhotographerList;
 }
 
 function displayPage() {
   displayTags();
   displayPhotographers();
   displayReturnMain();
 }
 
 // création et affichage des tags (header) plus ajout toggle au click
 function displayTags() {
   const tagList = document.querySelector(".tag-list");
 
   photographerList.getAllTags().forEach((tag) => {
     const a = document.createElement("a");
     a.innerHTML = `#<span id="portrait href="#" aria-label="${tag}">${tag}</span>`;
     a.classList.add("tags-link");
     a.href = "#";
     a.setAttribute("aria-label", `${tag}`);
     tagList.append(a);
 
     //ajoute la classe tag--selected si le tag est sélectionné par l'utilisateur
     a.addEventListener("click", (e) => {
       e.preventDefault();
       a.classList.toggle("tag--selected");
       displayPhotographers();
     });
   });
 }
 
 function displayPhotographers() {
   const main = document.querySelector("#main");
   /**
    * name filters
    * @type {array}
    * @description tableau des tags sélectionnés
    *
    */
   const filters = [];
 
   main.innerHTML = "";
   document.querySelectorAll(".tag--selected").forEach((tagselected) => {
     filters.push(tagselected.textContent.replace("#", ""));
   });
 
   photographerList.getPhotographerList(...filters).forEach((photographer) => {
     const linkToPage = "photographerPage.html?id=" + photographer.id;
     const linkToPhoto =
       "./img/PhotographersID/" + photographer.portrait;
     const cardPhotographer = document.createElement("section");
     const cardPhotographerHeader = document.createElement("header");
     const cardPhotographerFooter = document.createElement("div");
     const cardLink = document.createElement("a");
     const cardImg = document.createElement("img");
     const cardTitle = document.createElement("h2");
     const cardBody = document.createElement("div");
     const cardLocation = document.createElement("h3");
     const cardTagline = document.createElement("p");
     const cardPrice = document.createElement("p");
     const cardTags = document.createElement("nav");
     const modalBg = document.createElement("form");
 
     photographer.tags.forEach((el) => {
       const tagsA = document.createElement("a");
       const tagsspan = document.createElement("span");
       cardTags.classList.add("cards-tags");
       cardTags.append(tagsA);
       tagsA.append(tagsspan);
       tagsspan.textContent = "#" + el;
       tagsA.classList.add("tags-link");
       tagsspan.classList.add("tags");
 
       tagsA.setAttribute("aria-label", `${el}`);
 
       tagsA.href = linkToPage + "&tag=" + el;
     });
 
     cardPhotographer.classList.add("photographer-cards");
     cardImg.classList.add("cards-img");
     cardTitle.classList.add("cards-title");
     cardLocation.classList.add("cards-location");
     cardLink.classList.add("cards-photographer-link");
     cardTagline.classList.add("cards-tagline");
     cardPrice.classList.add("cards-price");
     modalBg.classList.add("modal");
     cardBody.classList.add("cards-body");
     cardPhotographerFooter.classList.add("footer-cards");
 
     cardLink.setAttribute("role", "link");
     cardLink.href = linkToPage;
     cardImg.src = linkToPhoto;
     cardImg.alt = "";
 
     cardTitle.textContent = photographer.name;
     cardLocation.textContent = photographer.city + ", " + photographer.country;
     cardTagline.textContent = photographer.tagline;
     cardPrice.textContent = photographer.price + "€/Jour";
 
     main.append(cardPhotographer);
     cardPhotographer.append(
       cardPhotographerHeader,
       cardBody,
       cardPhotographerFooter
     );
     cardPhotographerHeader.append(cardLink);
     cardPhotographerFooter.append(cardTags);
     cardLink.append(cardImg, cardTitle);
 
     cardBody.append(cardLocation, cardTagline, cardPrice);
   });
 }
 
 function displayReturnMain() {
   const returnMain = document.querySelector(".return-main ");
   window.addEventListener("scroll", () => {
     if (window.scrollY > 40) {
       returnMain.style.display = "block";
       returnMain.style.opacity = "1";
     } else {
       returnMain.style.display = "none";
       returnMain.style.opacity = "0";
     }
   });
 }