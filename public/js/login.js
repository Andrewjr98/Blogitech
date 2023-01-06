const usernameLogin = document.querySelector('#username-login').value.trim();
const passwordLogin = document.querySelector('#password-login').value.trim();
const usernameSignUp = document.querySelector("#username-signup").value.trim();
const email = document.querySelector("#email-signup").value.trim();
const passwordSignUp = document.querySelector("#password-signup").value.trim();

const loginFormHandler = async (event) => {
    event.preventDefault();

    if (usernameLogin && passwordLogin) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ usernameLogin, passwordLogin }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Incorrect Login");
        }
    }
};

const signUpFormHandler = async (event) => {
    event.preventDefault();

    if (usernameSignUp && passwordSignUp) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ usernameSignUp, email, passwordSignUp }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/newPost");
        } else {
            alert("Failed to complete signup.");
        }
    }
};

document
.querySelector(".login-form")
.addEventListener("submit", loginFormHandler);

document
.querySelector(".signup-form")
.addEventListener("submit", signUpFormHandler);