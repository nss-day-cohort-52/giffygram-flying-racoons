import { getPosts, getUsers, deletePost } from "../data/provider.js"

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
                    <img class="actionIcon" id="likeImg--${post.id}"><img src="/images/favorite-star-blank.svg" alt="star">
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