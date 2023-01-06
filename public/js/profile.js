const newForm = async (event) => {
    console.log("Added new Post!!!!");
    event.preventDefault();

    const title = document.querySelector("post-title");
    const username = document.querySelector("#creator-username");
    const description = document.querySelector("#post-desc");
    const dateCreated = document.querySelector("#date-created");

    console.log(title, username, description, dateCreated);

    if (title && username && description && dateCreated) {
        const response = await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({
                title,
                username,
                description,
                dateCreated
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);

        if (response.ok) {
            document.location.replace("/newpost");
        } else {
            alert("Failed to Post new Post :(")
        }
    }
};


const delButtonHandler = async (url, redirectURL) => {
    const response = await fetch(url, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace(redirectURL);
    } else {
        alert("Failed to delete Post");
    }
};

if (document.querySelector(".new-post-form")) {
    document
    .querySelector(".new-post-form")
    .addEventListener("submit", newForm);
}

const deletePost = document.querySelectorAll(".del-button");
deletePost.forEach((d) => {
    d.addEventListener("click", () => {
        const id = d.getAttribute("data-id");
        const url = `/api/post/${id}`;
        const redirectURL = "/";
        delButtonHandler(url, redirectURL);
    });
});

const deleteUserPost = document.querySelectorAll(".del-user-button");
deleteUserPost.forEach((d) => {
    d.addEventListener("click", () => {
        const id= d.getAttribute("data-id");
        const url = `/api/post/user/${id}`;
        const redirectURL = "/newPost";
        delButtonHandler(url, redirectURL);
    });
});