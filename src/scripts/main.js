import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchUsers } from "./data/provider.js"
const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))
    fetchUsers().then(
        () => {
            if (user) {
                applicationElement.innerHTML = GiffyGram()
            } else {
                applicationElement.innerHTML = LoginForm()
            }
            
        }
    )
}
//calling function
renderApp()

applicationElement.addEventListener(
    "stateChanged",
    () => {
        renderApp()
    }
)