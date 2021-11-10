import { getPosts, getUsers, getLikes } from "../data/provider.js"

const postListItem = (post) => {
    const users = getUsers()

    for (const user of users) {
        if (user.id === post.userId) {
            return `<div class="post_box">
            <h3>${post.title}</h3>
            <img src="${post.imgURL}" alt="${post.description}" width="200" height="200">
            <p>${post.description}</p>
            <p>Posted by ${user.name} on ${post.timestamp}</p>
        </div>`
        }
    }
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