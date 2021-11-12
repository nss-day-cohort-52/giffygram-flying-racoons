import { getUsers } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

export const Footer = () => {
    const users = getUsers()
    return `<footer class=footer>
        <select class="users" id="users">
        <option value="0">Choose a user...</option>
        ${users.map(user => {
            return `<option value="${user.id}">${user.name}</option>`
        }).join("")}
        <option value="all">All</option>
        </select>
        <input type="checkbox" id="checkbox__showFavs" value="favorites">Show only favorites</input>
    </footer>`
}

// click event listener on the show favorites checkbox
applicationElement.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "checkbox__showFavs") {
       
    }
})