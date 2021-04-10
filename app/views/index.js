const usersEndPoint = "http://localhost:3000/api/v1/users"
const chatsEndPoint = "http://localhost:3000/api/v1/chats"

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


document.addEventListener('DOMContentLoaded', () =>{
    fillUsersDropDown();
})

document.querySelector(".update-user").addEventListener("click", function() {
    setCurrentUserName();
    setCurrentUserId();
    getChats();
})

function setCurrentUserName(){
    let currentUserName = document.querySelector('#users-dropdown').value;
    document.querySelector('.output').innerHTML = "The current user's name is "+currentUserName;
}

let currentUserId = "hi"

function setCurrentUserId(){
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

function clearChats() {
    const chatMarkup = ``;
    document.querySelector('.grid-container').innerHTML = chatMarkup;
}

function getChats() {
    clearChats()
    fetch(chatsEndPoint)
    .then(response => response.json())
    .then(chats => {
        chats.data.forEach(chat => {
            console.log("inside getChats, currentUserId = ", currentUserId)
            console.log("inside getChats, chat.attributes.sender_id = ", chat.attributes.sender_id)
            if (chat.attributes.sender_id == currentUserId){ 
                const chatMarkup =`
                <div class = "chat">
                    <h3>Chat between ${chat.attributes.recipient.name} and ${chat.attributes.sender.name}</h3>
                    <div class = "messages">
                        <br><br><br>
                    </div>
                    <br><br>
                    <textarea class="message-compose-area"></textarea><br><br><br>
                    <button class="send-message"> Gab </button>
                </div>`;
                document.querySelector('.grid-container').innerHTML += chatMarkup;
            }
            if (chat.attributes.recipient_id == currentUserId){
                const chatMarkup =`
                <div class = "chat">
                    <h3>Chat between ${chat.attributes.recipient.name} and ${chat.attributes.sender.name}</h3>
                    <div class = "messages">
                        <br><br><br>
                    </div>
                    <br><br>
                    <textarea class="message-compose-area"></textarea><br><br><br>
                    <button class="send-message"> Gab </button>
                </div>`;
                document.querySelector('.grid-container').innerHTML += chatMarkup;
            }
        });
    })
}

function sendMessage(body, chat_id){
    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({
            "chat_id": chat_id,
            "user_id": currentUserId,
            "body": body,
        })
    }
    return fetch("http://localhost:3000/chats", configurationObject)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        // addMessage(json);
        console.log("sendMessage json = ", json)
    })
} 

// function addMessage(){

// }