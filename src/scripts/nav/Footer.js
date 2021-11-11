const applicationElement = document.querySelector(".giffygram")



export const Footer = () => {
    return `<footer>
        <input type="checkbox" id="checkbox__showFavs" value="favorites">Show only favorites</input>
    </footer>`
}

applicationElement.addEventListener("change", changeEvent => {
    if (changeEvent.target.value === "favorites") {
       
    }
})