import { getPosts, getUsers, getLikes, deletePost, favePost } from "../data/provider.js"
// event listener on delete button to remove post from api
const applicationElement = document.querySelector(".giffygram")
let starClicked = null
applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("blockPost--")) {
        const [,postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
    }
})
//event listener on star button to add liked post to api
applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("favoritePost--")) {
        // Get what the user clicked on and find id of user and id of the post
        starClicked = true
        const posts = getPosts()
        const [,postId] = clickEvent.target.id.split('--')
        for (const post of posts) {
            if(post.id === parseInt(postId)) {
            }         
        } 

       // Make an object out of the user input
        const dataToSendToAPI = {
            userId: parseInt(localStorage.getItem("gg_user")),
            postId: parseInt(postId)
        }

        //Send the data to the API for permanent storage
        favePost(dataToSendToAPI)
        applicationElement.dispatchEvent(new CustomEvent("stateHasChanged"))
    }   
}
)

export const postListItem = (post) => {
    const authenticatedUser = parseInt(localStorage.getItem("gg_user"))
    const likes = getLikes()
    const foundLike = likes.find(
        (like) => {
            return like.postId === post.id && like.userId === authenticatedUser
        }

    )
     



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

    
    const starSrc = (foundLike) ? "images/favorite-star-yellow.svg" : "images/favorite-star-blank.svg" 
    html += `
            <div class="post__actions">
                <div>
                    <img class="actionIcon" id="favoritePost--${post.id}" src="${starSrc}" alt="star"/>
                </div>
            `
            
    
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
