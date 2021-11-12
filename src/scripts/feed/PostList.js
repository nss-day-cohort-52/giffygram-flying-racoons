import { getPosts, getUsers, getLikes, deletePost, favePost } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")
let starClicked = null
applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("blockPost--")) {
        const [,postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
    }
})
applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("favoritePost--")) {
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
            postId: postId
        }

        //Send the data to the API for permanent storage
        favePost(dataToSendToAPI)
        applicationElement.dispatchEvent(new CustomEvent("stateHasChanged"))
    }   
}
)

const postListItem = (post) => {
    const users = getUsers()
    let html = ""

    for (const user of users) {
        if (user.id === post.userId) {
            html += `<section class="post">
            <header>
            <h2 class="post__title">${post.title}</h2>
            </header>
            <img class="post__image" src="${post.imgURL}" alt="${post.description}" width="200" height="200">
            <div class="post__description">${post.description}</div>
            <div class="post__tagline">
            Posted by
            <a href="#" class="profileLink" id="profile--5">
                ${user.name}
            </a>
            on ${post.timestamp}
            </div>
            `
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
                    <img class="actionIcon" id="favoritePost--${post.id}" src="${starSrc}" alt="star"/>
                </div>
            </div>`

    const authenticatedUser = parseInt(localStorage.getItem("gg_user"))
    if (authenticatedUser === post.userId) {
        html += `<div>
            <img id="blockPost--${post.id}" class="actionIcon" src="images/block.svg">
            </div>
            </div>`
    }
    html += `</section>`
    return html 
}

let userSelected = null
let filteredPosts = []

applicationElement.addEventListener("change", (event) => {
    if (event.target.id === "userSelection") {
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

export const Posts = () => {
    let posts = getPosts()
        
    let html = ""
    if (userSelected === true) {
        html += `<section class="">
        ${
            filteredPosts.map(postListItem).join("")
        }
        </section>`
    }
    else {
        html +=     `
        <section class="">
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

