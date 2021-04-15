const usersEndPoint = "http://localhost:3000/api/v1/users"

function fillUsersDropDown(){
    const usersDropdown = document.querySelector("#users-dropdown")
    let allUsers = []
    let allUsersIds = []
    fetch(usersEndPoint)
    .then(response => response.json())
    .then(users =>{
        users.data.forEach(user =>{
            allUsers.push(user.attributes.name);
            allUsersIds.push(user.id);
        })
        for (let i = 0; i < allUsers.length; i++) {
            let optn = allUsers[i];
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            el.id = allUsersIds[i]
            usersDropdown.add(el, null);
        }
    });
}

document.addEventListener('DOMContentLoaded', () =>{
    fillUsersDropDown();
})

document.querySelector(".update-user").addEventListener("click", function() {
    setCurrentUserName();
    setCurrentUserId();
    ChatsApi.getChats();
    fillOtherUsersDropDown();
})

document.querySelector(".start-chat").addEventListener("click", function() {
    console.log("new user chat with =", document.querySelector("#other-users-dropdown").value);
    ChatsApi.createChat()
})


document.querySelector(`.new-user-form`).addEventListener("submit", function(e){
    e.preventDefault();
    const newUserName = document.querySelector(`.new-user-compose-area`).value
    createUser(newUserName);
});

let currentUserId = "hi"

function setCurrentUserName(){
    let currentUserName = document.querySelector('#users-dropdown').value;
    document.querySelector('.current-user').innerHTML = "The current user is "+currentUserName;
}


function setCurrentUserId(){ //this is probably unnecessary now since fillUsersDropDown() includes id
    let currentUserName = document.querySelector('#users-dropdown').value;
    fetch(usersEndPoint) // you could fetch the specific user name and return the specific id
    .then(response => response.json())
    .then(users => {
        users.data.forEach(user => {
            if (user.attributes.name === currentUserName){
                currentUserId = user.id; 
            }
        })
    })
}

function fillOtherUsersDropDown(){
    const otherUsersDropdown = document.querySelector("#other-users-dropdown");
    let allOtherUsers = [];
    let allOtherUserIds = [];
    fetch (usersEndPoint)
    .then(response => response.json())
    .then(users => {
        users.data.forEach(user => {
            allOtherUsers.push(user.attributes.name);
            allOtherUserIds.push(user.id)
        })
        for (let i = 0; i < allOtherUsers.length; i++) {
            let optn = allOtherUsers[i];
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            el.id = allOtherUserIds[i]
            otherUsersDropdown.add(el, null);
        }
    })
}

function createUser(name){
    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({
            "name": name,
        })
    }
    fetch(`http://localhost:3000/api/v1/users`, configurationObject)
    .then(data=>{return data.json()})
    .then(
        data => {
            currentUserId = data.id
            currentUserName = data.name
            document.querySelector('.current-user').innerHTML = "The current user is "+currentUserName;
            ChatsApi.getChats();
        })
        .catch(error=>console.log(error));
    let select = document.querySelector('#users-dropdown')
    let length = select.options.length;
    for (i = length-1; i >=0; i--){
        select.options[i] = null;
    }
    fillUsersDropDown();
    fillOtherUsersDropDown();
}

