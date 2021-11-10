const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    currentUser: {},
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