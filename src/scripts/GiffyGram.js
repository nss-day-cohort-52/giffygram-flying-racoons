import { postForm } from "./feed/PostForm.js"
import { LikedPosts, postListItem, Posts } from "./feed/PostList.js"
import { Footer } from "./nav/Footer.js"


const applicationElement = document.querySelector(".giffygram")

export const GiffyGram = () => {

    // Show main main UI
    return `<h1>Giffygram</h1>
    
        <button id="post__button">Have a gif to post?</button>
        <div class="postForm"></div>
        <h2>Posts</h2>
            ${Posts()}
            
            
        ${Footer()}
            `


}


applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "post__button") {
       const postFormPopUp = document.querySelector(".postForm")
       postFormPopUp.innerHTML = postForm()
        // applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})