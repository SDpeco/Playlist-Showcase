const grid = document.querySelector("[data-grid]");
const headerImage = document.querySelector("[data-header-image]");
const albumTitle = document.querySelector("[data-album-title]");
const albumAtist = document.querySelector("[data-album-artist]");
const headerContainer = document.querySelector("[data-header-container]");
const albumLink = document.querySelector("[data-album-link]");
const albumFlavor = document.querySelector("[data-flavor]");
const buttons = document.querySelectorAll("[data-btn]");
const buttonGlows = document.querySelectorAll("[data-glow]");

const greenFlavor = "It do be bopping.";
const purpleFlavor = "Quite interesting, give it a listen.";
const goldFlavor = "It's interesting AND it bops.";

let previousEvent = null;

fetch("./albums.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    headerImage.setAttribute("src", data.albums[data.albums.length - 1].image);
    albumTitle.innerHTML = data.albums[data.albums.length - 1].name;
    albumAtist.innerHTML = data.albums[data.albums.length - 1].artist;
    albumLink.setAttribute("href", data.albums[data.albums.length - 1].link);

    switch (data.albums[data.albums.length - 1].highlight) {
      case "green":
        headerImage.classList.add("green-album");
        albumFlavor.classList.add("green-flavor");
        albumFlavor.innerHTML = greenFlavor;
        break;
      case "purple":
        headerImage.classList.add("purple-album");
        albumFlavor.classList.add("purple-flavor");
        albumFlavor.innerHTML = purpleFlavor;
        break;
    }

    for (let i = data.albums.length - 1; i > -1; i--) {
      let newGridElement = document.createElement("img");
      newGridElement.classList.add("grid-item", "grid-id-" + i);

      switch (data.albums[i].highlight) {
        case "green":
          newGridElement.classList.add("green-album");
          break;
        case "purple":
          newGridElement.classList.add("purple-album");
          break;
        case "gold":
          newGridElement.classList.add("gold-album");
        default:
          newGridElement.classList.add("regular-album");
      }

      newGridElement.src = data.albums[i].image;
      newGridElement.addEventListener("click", (event) => {
        headerImage.setAttribute(
          "src",
          event.currentTarget.getAttribute("src")
        );

        let albumId = event.currentTarget.classList[1];
        albumId = albumId.substring(8, 999);

        albumFlavor.innerHTML = "";
        headerImage.classList.remove("green-album");
        albumFlavor.classList.remove("green-flavor");
        headerImage.classList.remove("purple-album");
        albumFlavor.classList.remove("purple-flavor");
        headerImage.classList.remove("bronze-album");
        albumFlavor.classList.remove("bronze-flavor");
        headerImage.classList.remove("silver-album");
        albumFlavor.classList.remove("silver-flavor");
        headerImage.classList.remove("gold-album");
        albumFlavor.classList.remove("gold-flavor");

        switch (data.albums[albumId].highlight) {
          case "green":
            headerImage.classList.add("green-album");
            albumFlavor.classList.add("green-flavor");
            albumFlavor.innerHTML = greenFlavor;
            break;
          case "purple":
            headerImage.classList.add("purple-album");
            albumFlavor.classList.add("purple-flavor");
            albumFlavor.innerHTML = purpleFlavor;
            break;
          case "gold":
            headerImage.classList.add("gold-album");
            albumFlavor.classList.add("gold-flavor");
            albumFlavor.innerHTML = goldFlavor;
        }

        if (previousEvent != null) {
          previousEvent.target.classList.remove("album-selected");
        }

        previousEvent = event;
        event.currentTarget.classList.add("album-selected");

        albumTitle.innerHTML = data.albums[albumId].name;
        albumAtist.innerHTML = data.albums[albumId].artist;
        albumLink.setAttribute("href", data.albums[albumId].link);
      });

      grid.appendChild(newGridElement);
    }
    buttonInit(grid);
  });

function buttonInit(grid) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
      let selectedBtn = document.getElementsByClassName("selected-btn")[0]
        ? document.getElementsByClassName("selected-btn")[0]
        : "none";
      let selectedGlow = document.getElementsByClassName("selected-glow")[0];
      if (event.target != selectedBtn) {
        if (selectedBtn != "none") {
          selectedBtn.classList.remove("selected-btn");
          selectedGlow.classList.remove("selected-glow");
        }

        event.target.classList.add("selected-btn");
        btnType = event.target.classList[1];
        let target = "";

        switch (btnType) {
          case "regular-btn":
            target = "regular-album";
            buttonGlows[0].classList.add("selected-glow");
            break;
          case "green-btn":
            target = "green-album";
            buttonGlows[1].classList.add("selected-glow");
            break;
          case "purple-btn":
            target = "purple-album";
            buttonGlows[2].classList.add("selected-glow");
            break;
          case "gold-btn":
            target = "gold-album";
            buttonGlows[3].classList.add("selected-glow");
            break;
          case "none":
        }

        for (let i = 0; i < grid.children.length; i++) {
          gridItem = grid.children[i];
          gridItem.classList.remove("hidden");
          if (target != gridItem.classList[2]) {
            gridItem.classList.add("hidden");
          }
        }
      } else {
        selectedBtn.classList.remove("selected-btn");
        selectedGlow.classList.remove("selected-glow");
        for (let i = 0; i < grid.children.length; i++) {
          gridItem = grid.children[i];
          gridItem.classList.remove("hidden");
        }
      }
    });
  }
}
