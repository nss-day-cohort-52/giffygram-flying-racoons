import { postForm } from "./feed/PostForm.js"
import { Posts } from "./feed/PostList.js"
import { MessageForm } from "./message/MessageForm.js"
import { Footer } from "./nav/Footer.js"
import { NavBar } from "./nav/NavBar.js"


const applicationElement = document.querySelector(".giffygram")

export const GiffyGram = () => {

    // Show main main UI
    return `
        ${NavBar()}
        <div class="msgForm" id="msgForm"></div>
        <div class="giffygram__feed">
        <div class="miniMode" id="miniMode">Have a gif to post?</div>
        <div class="postForm"></div>
        ${Posts()}
        </div>
        ${Footer()}
        `
}

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessageIcon") {
       const postFormPopUp = document.querySelector(".msgForm")
       postFormPopUp.innerHTML = MessageForm()
        // applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "miniMode") {
       const postFormPopUp = document.querySelector(".postForm")
       postFormPopUp.innerHTML = postForm()
        // applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})