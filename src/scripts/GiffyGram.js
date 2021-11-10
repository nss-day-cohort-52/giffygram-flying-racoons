import { postForm } from "./feed/PostForm.js"
const applicationElement = document.querySelector(".giffygram")



export const GiffyGram = () => {

    // Show main main UI
    return `<h1>Giffygram</h1>
    <button id="post__button">Have a gif to post?</button>
    <div class="postForm"></div>
    `
}


applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "post__button") {
       const postFormPopUp = document.querySelector(".postForm")
       postFormPopUp.innerHTML = postForm()
        // applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})