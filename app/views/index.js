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
    UsersApi.createUser(newUserName);
});

