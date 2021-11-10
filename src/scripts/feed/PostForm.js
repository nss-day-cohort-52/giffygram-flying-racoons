import { savePost } from "../data/provider.js"
const applicationElement = document.querySelector(".giffygram")


//this function builds the HTML tha contains the input fields for the post form
export const postForm = () => {
    return`

    <section id="form">
        <div class="field">
            <label class="label" for="title">Title</label>
            <input type="text" name="title" class="input" />
        </div>
        <div class="field">
            <label class="label" for="imgURL">Image Url</label>
            <input type="text" name="imgURL" class="input" />
        </div>
        <div class="field">
            <label class="label" for="description">Description</label>
            <input type="text" name="description" class="input" />
        </div>
    </section>

    <button class="button" id="save">Save</button>

`
}


applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "save") {
        // Get what the user typed into the form fields
        const title = document.querySelector("input[name='title']").value
        const imgURL = document.querySelector("input[name='imgURL']").value
        const description = document.querySelector("input[name='description']").value
        const date = new Date()

        // Make an object out of the user input
        const dataToSendToAPI = {
            title: title, 
            imgURL: imgURL,
            description: description,
            userId: parseInt(localStorage.getItem("gg_user")),
            timestamp: date
        }

        // Send the data to the API for permanent storage
        savePost(dataToSendToAPI)
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})