import { getUsers } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

export const Footer = () => {
    const users = getUsers()
    return `<footer class="footer">
        <div class="footer__item"> Posts since 
        <select id="yearSelection">
        <option>2021</option>
        <option>2020</option>
        </select>
        <span id="postCount">8</span>
        </div>
        <div class="footer__item">
         Posts by user <select id="userSelection">
        <option value="0">Choose a user...</option>
        ${users.map(user => {
            return `<option value="${user.id}">${user.name}</option>`
        }).join("")}
        <option value="all">All</option>
        </select>
        </div>
        <div class="footer__item">
         Show only favorites <input id="showOnlyFavorites" type="checkbox" value="favorites">
        </div>
    </footer>`
}


applicationElement.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "checkbox__showFavs") {
       setDisplayFavorites(true)
    }
})