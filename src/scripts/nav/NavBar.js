import { getMessages } from "../data/provider.js"

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
            <div class="notification__count"> 0 </div>
        </div>
        <div class="navigation__item navigation__logout">
            <button id="logout" class="fakeLink">Logout</button>
        </div>
        </nav>
        `
}