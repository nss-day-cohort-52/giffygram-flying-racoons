const apiURL = "http://localhost:3000"
const applicationElement = document.querySelector(".giffygram")

const applicationState = {
    users: [],
    posts: [],
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    },
    likes: [],
    messages: []
}

export const fetchUsers = async () => {
    const response = await fetch(`${apiURL}/users`)
    const users = await response.json()
    applicationState.users = users
}

export const getUsers = () => {
    return applicationState.users.map(user => ({...user}))
}

//this is the POST method tells API to create a post state object to be saved in permanent state & returning the application state for posts

export const savePost = (userReservation) => {

    const fetchOptions = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userReservation),
    }

    return fetch (`${apiURL}/posts`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const fetchPosts = async () => {
    const response = await fetch(`${apiURL}/posts`)
    const posts = await response.json()
    applicationState.posts = posts
}

export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}))
}
export const favePost = (userLike) => {

    const fetchOptions = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userLike),
    }

    return fetch (`${apiURL}/likes`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
        .then(response => response.json())
        .then(
            (likes) => {
                // Store the external state in application state
                applicationState.likes = likes
            }
        )
}
export const getLikes = () => {
    return applicationState.likes.map(like => ({...like}))
}

export const deletePost = async (id) => {
    await fetch(`${apiURL}/posts/${id}`, { method: "DELETE" })
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
}

//set display favorites to true in application state
export const setDisplayFavorites = (boolean) => {
    applicationState.feed.displayFavorites = boolean
}

export const sendMessage = async (message) => {

    const fetchOptions = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message),
    }

    const response = await fetch(`${apiURL}/messages`, fetchOptions)
    await response.json()
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
}

export const fetchMessages = async () => {
    const response = await fetch(`${apiURL}/messages`)
    const messages = await response.json()
    applicationState.messages = messages
}

export const getMessages = () => {
    return applicationState.messages.map(message => ({...message}))
}
export const deleteLike = (id) => {
    return fetch(`${apiURL}/likes/${id}`, { method: "DELETE" })
        .then(
            () => {
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}