/**
 * @module Medium-class
 */
/**
 * Class pour créer un nouveau média (vidéo ou image)
 */
 export class Medium {
    /**
     * détails concernant le media
     * @param {string} type type de média (image ou vidéo)
     * @param {string} alt  balise Alt
     * @param {date} date   date d'ajout du média
     * @param {number} id   ID du média
     * @param {string} link Lien vers le média
     * @param {number} likes Nombre de likes du média
     * @param {number} photographerId ID du photographe liée au média
     * @param {string} tags tags associés au média
     * @param {string} title titre du média
     * @param {string} path chemin vers le média
     * @returns {object}
     */
    createMedia(type, alt, date, id, link, likes, photographerId, tags, path) {
      if (type === "jpg") {
        const photo = new Photo();
        photo.type = type;
        photo.alt = alt;
        photo.date = new Date(date);
        photo.id = id;
        photo.link = link;
        photo.likes = likes;
        photo.photographerId = photographerId;
        photo.tags = tags;
        photo.title = link.replace(".jpg", "").replaceAll("_", " ");
        photo.path = path + link;
  
        return photo;
      } else if (type === "mp4") {
        const video = new Video();
        video.type = type;
        video.alt = alt;
        video.date = new Date(date);
        video.id = id;
        video.link = link;
        video.likes = likes;
        video.photographerId = photographerId;
        video.tags = tags;
        video.title = link.replace(".mp4", "").replaceAll("_", " ");
        return video;
      }
    }
  }
  
  export class Photo extends Medium {
    createImg(photographer) {
      const linkToPhoto = `./img/${photographer}/`;
  
      const cardsMediaImg = document.createElement("img");
  
      cardsMediaImg.src = linkToPhoto + this.link;
      cardsMediaImg.alt = this.alt;
      cardsMediaImg.classList.add("media-img");
  
      return cardsMediaImg;
    }
  }
  
  export class Video extends Medium {
    createImg(photographer) {
      const linkToPhoto = `./img/${photographer}/`;
      const cardsMediaVideo = document.createElement("video");
      cardsMediaVideo.loop = true;
      cardsMediaVideo.muted = true;
  
      cardsMediaVideo.src = linkToPhoto + this.link;
      cardsMediaVideo.alt = this.alt;
      cardsMediaVideo.classList.add("media-img");
  
      return cardsMediaVideo;
    }
  }