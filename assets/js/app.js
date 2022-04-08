const API_URL = "https://api.github.com/users/";
const twitterProfile = document.querySelector("#twitter-profile")
const nameGithub = document.querySelector("#twitter-name");
const userName = document.querySelector("#twitter-username");
const profileLink = document.querySelector("#profile-link")
const twitterPost = document.querySelector("twitter-post");
const followers = document.querySelector("#twitter-follower")
const following = document.querySelector("#twitter-following")
const hireable = document.querySelector("#badge")
const gitBio = document.querySelector("#gitBio");
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
                    console.log(data);
                    nameCheck(data.name);
                    gitBioCkeck(data.bio);
                    userName.innerHTML = "@" + data.login;
                    userName.href = data.html_url;
                    followers.innerHTML = data.followers;
                    following.innerHTML = data.following;
                    twitterProfile.src = data.avatar_url;
                    hireableCheck(data.hireable);
                }

            });


    }
}

//Git Hib bio Ckeck
function gitBioCkeck(gitBioStatus) {
    if (!gitBioStatus || " ") {
        gitBio.innerHTML = "They don't have any bio !";
        return;
    } else {
        gitBio.innerHTML = gitBioStatus;
    }
}
// name check
function nameCheck(dataName) {
    if (!dataName) {
        nameGithub.innerHTML = "Not Found this user's name";

    } else {
        nameGithub.innerHTML = dataName;
    }
}
// hireable func
function hireableCheck(hireStatus) {
    if (hireStatus == false) {
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


//tootlip with popper