import { getMessages } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")
let count = 0 
let clicker = null

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logo") {
       clicker = true
    }
})
const msgCount = () => {
    const authenticatedUser = parseInt(localStorage.getItem("gg_user"))
    const messages = getMessages()

    if (clicker === true) {
        count = 0
    }
    else {
        for (const message of messages) {
            if (message.recipientId === authenticatedUser) {
                count += 1
            }
        }
    }
    return count
}


export const NavBar = () => {
    const messages = getMessages()
    // const userMessages = messages.filter(message => )
    return `
        <nav class="navigation">
        <div class="navigation__item navigation__icon">
            <img id="logo" src="images/pb.png" alt="peanut-butter-jar">
        </div>
        <div class="navigation__item navigation__name">Giffygram</div>
        <div class="navigation__item navigation__search"></div>
        <div class="navigation__item navigation__message">
            <img id="directMessageIcon" src="images/fountain-pen.svg" alt="pen">
            <div id="inbox" class="notification__count"> ${msgCount()} </div>
        </div>
        <div class="navigation__item navigation__logout">
            <button id="logout" class="fakeLink">Logout</button>
        </div>
        </nav>
        `
}