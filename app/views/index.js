const usersEndPoint = "http://localhost:3000/api/v1/users"
const chatsEndPoint = "http://localhost:3000/api/v1/chats"
let currentUser = 


document.addEventListener('DOMContentLoaded', () =>{
    fillUsersDropDown();
    getChats();
})

document.querySelector(".update-user").addEventListener("click", function() {
    setCurrentUser();
})

function getChats() {
    fetch(chatsEndPoint)
    .then(response => response.json())
    .then(chats => {
        chats.data.forEach(chat => {
            const chatMarkup =`
            <div class = "chat">
                <h3>Chat between ${chat.attributes.recipient.name} and ${chat.attributes.sender.name}</h3>
                <div class = "messages">
                    <br><br><br>
                </div>
                <br><br>
                <textarea class="message-compose-area"></textarea><br><br><br>
                <button> Gab </button>
            </div>`;
            document.querySelector('.grid-container').innerHTML += chatMarkup;
        });
    })
}

function fillUsersDropDown(){
    const usersDropdown = document.querySelector("#users-dropdown")
    let allUsers = []
    fetch(usersEndPoint)
    .then(response => response.json())
    .then(users =>{
        users.data.forEach(user =>{
            allUsers.push(user.attributes.name);
        })
        for (let i = 0; i < allUsers.length; i++) {
            let optn = allUsers[i];
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            usersDropdown.add(el, null);
        }
    });
}

function setCurrentUser(){
    let currentUser = document.querySelector('#users-dropdown').value;
    document.querySelector('.output').innerHTML = "I am the user "+currentUser;
    console.log(currentUser);
    // return currentUser; //use this to find the currentUser
}

function showCurrentUser(){

}