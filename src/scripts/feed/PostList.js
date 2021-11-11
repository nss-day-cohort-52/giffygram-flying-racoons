import { getPosts, getUsers } from "../data/provider.js"

const postListItem = (post) => {
    const users = getUsers()

    for (const user of users) {
        if (user.id === post.userId) {
            return `<div class="post_box">
            <p>${post.title}</p>
            <img src="${post.imageUrl}" alt="cat vibin" width="200" height="200">
            <p>${post.description}</p>
            <p>Posted by ${user.name} on ${post.date}</p>
            <div class="post__actions">
                <div>
                    <img class="actionIcon" id="likeImg--${post.id}"><img src="/images/favorite-star-blank.svg" alt="star">
                </div>
            </div>

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