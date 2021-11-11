import { getPosts, getUsers, getLikes, deletePost } from "../data/provider.js"

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
        // Get what the user typed into the form fields
        const foundUser = (id) => {


            
        }


        const postId = clickEvent.
        const imgURL = document.querySelector("input[name='imgURL']").value
        const description = document.querySelector("input[name='description']").value
        const date = new Date().toISOString().slice(0, 10)

        // Make an object out of the user input
        const dataToSendToAPI = {
            title: title, 
            imgURL: imgURL,
            description: description,
            userId: parseInt(localStorage.getItem("gg_user")),
            timestamp: date
        }

        // Send the data to the API for permanent storage
        savePost(dataToSendToAPI)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})