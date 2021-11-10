const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    users: [],
    currentUser: {},
    posts: [],
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    }

}

export const fetchUsers = async () => {
    const response = await fetch(`${API}/users`)
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
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
