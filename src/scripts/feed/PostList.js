import { getPosts, getUsers } from "../data/provider.js"

const postListItem = (post) => {
    const users = getUsers()

    for (const user of users) {
        if (user.id === post.userId) {
            return `<div class="post_box">
            <p>${post.title}</p>
            <p>${post.imageUrl}</p>
            <p>${post.description}</p>
            <p>Posted by ${user.name} on ${post.date}</p>
        </div>`
        }
    }
}

export const Posts = () => {
    const posts = getPosts()
    
    let html = `
        <section>
            ${
                posts.map(postListItem).join("")
            }
        </section>
    `

    return html
}