import { getMessages, getUsers } from "../data/provider.js"

const authenticatedUser = parseInt(localStorage.getItem("gg_user"))

const inboxListItem = (message) => {
    const messages = getMessages()
    const users = getUsers()

    for (const user of users) {
        if (message.recipientId === authenticatedUser){
            if (message.senderId === user.id) {
                return `<div class="message">
                    <div>${message.timestamp}</div>
                    <div>${message.message}</div>
                    <div> From ${user.name}</div>
                    </div>`
                }
            }
        }
}
    
export const Inbox = () => {
    const messages = getMessages()
    
    let html = `
        <section>
            ${
                messages.map(inboxListItem).join("")
            }
        </section>
    `

    return html
}


