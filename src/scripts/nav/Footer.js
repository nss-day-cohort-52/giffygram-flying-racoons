const applicationElement = document.querySelector(".giffygram")



export const Footer = () => {
    return `<footer>
        <input type="checkbox" id="checkbox__showFavs" value="favorites">Show only favorites</input>
    </footer>`
}

// click event listener on the show favorites checkbox
applicationElement.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "checkbox__showFavs") {
       
    }
})