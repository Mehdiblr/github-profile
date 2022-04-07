const API_URL = "https://api.github.com/users/";
const twitterProfile = document.querySelector("#twitter-profile")
const name = document.querySelector("#twitter-name");
const userName = document.querySelector("#twitter-username");
const profileLink = document.querySelector("#profile-link")
const twitterPost = document.querySelector("twitter-post");
const followers = document.querySelector("#twitter-follower")
const following = document.querySelector("#twitter-following")
const hireable = document.querySelector("#badge")

let submit = document.querySelector("#submit");
let inputText = document.querySelector("#inputName");
// const inputValue = inputText.value;
const clickFunc = () => {
        if (!inputText.value) {
            toasti("you didn't enter any chars");
            return;
        } else {
            fetch(API_URL + inputText.value, { method: "GET" })
                .then(function(response) {
                    return response.json();
                })
                .then((data) => {
                    if (data.message == "Not Found") {
                        toasti("This username has not been registered yet");
                        return;

                    } else {
                        console.log(data)
                        name.innerHTML = data.name;
                        userName.innerHTML = "@" + data.login;
                        followers.innerHTML = data.followers;
                        following.innerHTML = data.following;
                        twitterProfile.src = data.avatar_url;
                        hireableCheck(data.hireable);
                    }

                });


        }
    }
    // hireable func
function hireableCheck(hireStatus) {
    if (!hireStatus) {
        hireable.classList.add("fa-window-close")
    } else {
        hireable.classList.add("fa-check-square")
    }
}
// toastify 
const toasti = (textValue) => {
    Toastify({
        text: textValue,
        duration: 3000,
        newWindow: true,
        className: "info",
        close: true,
        gravity: "top",
        position: "right",
        onClick: function() {

        }
    }).showToast();
}