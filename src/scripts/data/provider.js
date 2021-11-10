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

export const fetchPosts = async () => {
    const response = await fetch(`${apiURL}/posts`)
    const posts = await response.json()
    applicationState.posts = posts
}

export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}))
}