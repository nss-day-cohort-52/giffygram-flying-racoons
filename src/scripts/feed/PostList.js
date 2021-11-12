import { getPosts, getUsers, getLikes, deletePost, favePost } from "../data/provider.js"
// event listener on delete button to remove post from api
const applicationElement = document.querySelector(".giffygram")
let starClicked = null
applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("post--")) {
        const [,postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
    }
})
//event listener on star button to add liked post to api
applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("likeImg--")) {
        // Get what the user clicked on and find id of user and id of the post
        starClicked = true
        const posts = getPosts()
        const [,postId] = clickEvent.target.id.split('--')
        let foundUser = 0
        for (const post of posts) {
            if(post.id === parseInt(postId)) {
                foundUser = post.userId 
            }         
        } 

       // Make an object out of the user input
        const dataToSendToAPI = {
            userId: foundUser,
            postId: parseInt(postId)
        }

        //Send the data to the API for permanent storage
        favePost(dataToSendToAPI)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }   
}
)

export const postListItem = (post) => {
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
    const likes = getLikes()
    for (const like of likes) {
        if (post.id === like.postId){
            starClicked = true
        }

        
    }
    const starSrc = (starClicked) ? "/images/favorite-star-yellow.svg" : "/images/favorite-star-blank.svg" 
    html+= `
            <div class="post__actions">
                <div>
                    <img class="actionIcon" id="likeImg--${post.id}" src="${starSrc}" alt="star"/>
                </div>
            </div>`
            
    const authenticatedUser = parseInt(localStorage.getItem("gg_user"))
    if (authenticatedUser === post.userId) {
        html += `
            <div class="post__actions">
                <div>
                    <img class="actionIcon" id="post--${post.id}" src="/images/block.svg">
                </div>
            </div>`
    }

    return html 
}
let userSelected = null
let filteredPosts = []
applicationElement.addEventListener("change", (event) => {
    if (event.target.id === "users") {
        const posts = getPosts()
        for (const post of posts) {
            if (post.userId === parseInt(event.target.value) || event.target.value === "all") {
                userSelected = true 
                filteredPosts.push(post)
            }
        }
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

export const LikedPosts = (post) => {
    const users = getUsers()
    const posts = getPosts()
    const likes = getLikes()

    const likedPostArray = likes.filter(like => like.userId === post.userId)
    console.log(likedPostArray) 
        
}

export const Posts = () => {
    let posts = getPosts()
        
    let html = ""
    if (userSelected === true) {
        html += `<section>
        ${
            filteredPosts.map(postListItem).join("")
        }
        </section>`
    }
    else {
        html +=     `
        <section>
            ${
                posts.map(postListItem).join("")
            }
        </section>
    `
    }
    userSelected = null
    filteredPosts = []
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
