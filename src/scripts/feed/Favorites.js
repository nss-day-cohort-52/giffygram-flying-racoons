import { getLikes , getPosts, setDisplayFavorites } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "checkbox__showFavs") {
       setDisplayFavorites(true)
    }
})


