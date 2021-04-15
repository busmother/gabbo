// const usersEndPoint = "http://localhost:3000/api/v1/users"

document.addEventListener('DOMContentLoaded', () =>{
    UsersApi.getUsers(); //used to be fillUsersDropdown()
})

document.querySelector(".update-user").addEventListener("click", function() {
    User.setCurrentUser();
    ChatsApi.getChats(); // fetches and renders chats
    User.fillOtherUsersDropdown(); //renders usernames
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
    fillUsersDropdown();
    fillOtherUsersDropDown();
}

