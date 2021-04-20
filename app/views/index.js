document.addEventListener('DOMContentLoaded', () =>{
    UsersApi.getUsers(); //first fetch
})

document.querySelector(".update-user").addEventListener("click", function() {
    User.setCurrentUser(); // updates text
    ChatsApi.getChats(); // fetches (second fetch) and renders chats
    User.fillOtherUsersDropdown(); // renders usernames
})

document.querySelector(".start-chat").addEventListener("click", function() {
    const chatWindow = ChatsApi.createChat() // posts new chat and calls getChats()

})

document.querySelector(`.new-user-form`).addEventListener("submit", function(e){
    e.preventDefault();
    const newUserName = document.querySelector(`.new-user-compose-area`).value
    UsersApi.createUser(newUserName); // posts new user and calls setCurrentUser()
});
