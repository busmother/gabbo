document.addEventListener('DOMContentLoaded', () =>{
    UsersApi.getUsers(); //first fetch
})

document.querySelector(".update-user").addEventListener("click", function() {
    User.setCurrentUser(); // updates text
    ChatsApi.getChats(); // fetches (second fetch) and renders chats
    User.fillOtherUsersDropdown(); //renders usernames
})

document.querySelector(".start-chat").addEventListener("click", function() {
    console.log("new user chat with =", document.querySelector("#other-users-dropdown").value);
    ChatsApi.createChat()
})

document.querySelector(`.new-user-form`).addEventListener("submit", function(e){
    e.preventDefault();
    const newUserName = document.querySelector(`.new-user-compose-area`).value
    UsersApi.createUser(newUserName);
});