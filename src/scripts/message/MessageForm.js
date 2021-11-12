import { getUsers, sendMessage } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

let recipientId = 0
applicationElement.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "recipientIdSelector") {
            [,recipientId] = event.target.value.split("--")
        }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessage__submit") {
        // Get what the user typed into the form fields
        // const [,recipientId] = document.querySelector("input[name='directMessage__userSelect']").value.split("--")
        const messageText = document.querySelector("input[name='message']").value
        const date = new Date().toISOString().slice(0, 10)

        // Make an object out of the user input
        const dataToSendToAPI = {
            recipientId: parseInt(recipientId), 
            message: messageText,
            senderId: parseInt(localStorage.getItem("gg_user")),
            timestamp: date
        }

        // Send the data to the API for permanent storage
        sendMessage(dataToSendToAPI)
        window.alert(`Message sent!`)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessage__cancel") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessage__close") {
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

export const MessageForm = () => {
    const users = getUsers()
    let html = `<div class="directMessage">
    <h3>Direct Message</h3>
    <div>Recipient:
        <select id="recipientIdSelector" name="directMessage__userSelect" class="message__input">
            <option>Choose a recipient...</option>`
    for (const user of users) {
        html += `<option value="messageRecipient--${user.id}">${user.name}</option>`
    }
        
    html += `</select>
    </div>
    <div>
        <label for="message">Message:</label>
        <input name="message" class="message__input" type="text" placeholder="Message to user">
    </div>

    <button id="directMessage__submit">Save</button>
    <button id="directMessage__cancel">Cancel</button>

    <button id="directMessage__close">x</button>

    </div>`

return html
}