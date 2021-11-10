const apiURL = "http://localhost:3000"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    users: [],
    posts: [],
    currentUser: {},
    posts: [],
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    }

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
