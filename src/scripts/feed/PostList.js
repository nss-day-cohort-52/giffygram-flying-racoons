import { getPosts, getUsers, getLikes, deletePost, favePost } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("post--")) {
        const [,postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
    }
})

const postListItem = (post) => {
    const users = getUsers()
    let html = ""

    for (const user of users) {
        if (user.id === post.userId) {
            html += `<div class="post_box">
            <h3>${post.title}</h3>
            <img src="${post.imgURL}" alt="${post.description}" width="200" height="200">
            <p>${post.description}</p>
            <p>Posted by ${user.name} on ${post.timestamp}</p>
            <div class="post__actions">
                <div>
                    <img class="actionIcon" id="likeImg--${post.id}" src="/images/favorite-star-blank.svg" alt="star">
                </div>
                <div></div>
            </div>

        </div>`
        }
    }
    const authenticatedUser = parseInt(localStorage.getItem("gg_user"))
    if (authenticatedUser === post.userId) {
        html += `<button class="post__delete" id="post--${post.id}">Delete</button>`
    }

    return html 
}

export const Posts = () => {
    const posts = getPosts()
    
    let html = `
        <section>
            ${
                posts.map(postListItem).join("")
            }
        </section>
    `

    return html
}
applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("likeImg--")) {
        // Get what the user clicked on and find id of user and id of the post
        const [,postId] = clickEvent.target.id.split('--')
        const posts = getPosts()
        let foundUser = 0
        for (const post of posts) {
            if(post.id === parseInt(postId)) {
                foundUser = post.userId 
            }         
        } 

       // Make an object out of the user input
        const dataToSendToAPI = {
            userId: foundUser,
            postId: postId
        }

        //Send the data to the API for permanent storage
        favePost(dataToSendToAPI)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))

    }
}
)