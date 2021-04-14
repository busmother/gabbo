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
    addCreateUserButtonEvent()

})

document.querySelector(".update-user").addEventListener("click", function() {
    setCurrentUserName();
    setCurrentUserId();
    getChats();
})

document.querySelector(".load-other-users").addEventListener("click", function() {
    fillOtherUsersDropDown();
})

document.querySelector(".start-chat").addEventListener("click", function() {
    console.log("new user chat with =", document.querySelector("#other-users-dropdown").value)
})


function setCurrentUserName(){
    let currentUserName = document.querySelector('#users-dropdown').value;
    document.querySelector('.current-user').innerHTML = "The current user is "+currentUserName;
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

function fillOtherUsersDropDown(){
    const otherUsersDropdown = document.querySelector("#other-users-dropdown");
    let allOtherUsers = [];
    fetch (usersEndPoint)
    .then(response => response.json())
    .then(users => {
        users.data.forEach(user => {
            if(user.id != currentUserId) {
                allOtherUsers.push(user.attributes.name);
            }
        })
        for (let i = 0; i < allOtherUsers.length; i++) {
            let optn = allOtherUsers[i];
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            otherUsersDropdown.add(el, null);
        }
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
         renderChat(chat);
        });
    })
 }

function renderChat(chat){
    if ((chat.attributes.sender_id.toString() === currentUserId.toString()) || (chat.attributes.recipient_id.toString() === currentUserId.toString())){ 
        const chatWindow = document.createElement("div")
        const chatMarkup =`
            <div class = "chat", id = "chat-${chat.id}">
                <h3>Chat between ${chat.attributes.recipient.name} and ${chat.attributes.sender.name}</h3>
                <div class = "messages">
                    <br><br><br>
                </div>
                <br><br>
                <form method="post" class = "chat-form-chat-${chat.id}">
                    <input class="message-compose-area" id = "chat-form-chat-${chat.id}" type="text" name="body"></input><br><br><br>
                    <input type="submit" value="Gab" class="send-message" id= "gab-button-${chat.id}">  </input>
                </form>
            </div>`;
        chatWindow.innerHTML += chatMarkup;
        document.querySelector('.grid-container').append(chatWindow);
        addGabButtonEvent(chat.id);
        getMessages(chat);
    }
}
 
function getMessages(chat){
    chat.attributes.messages.forEach(message => {
        if (message.user_id == currentUserId){
            const messageBody = `<div class=current-user-message id = message-user-${message.user_id}>${message.body}</div><br>`;
            document.querySelector(`#chat-${chat.id} .messages`).innerHTML += messageBody
        } else {
            const messageBody = `<div class=other-user-message id = message-user-${message.user_id}>${message.body}</div><br>`;
            document.querySelector(`#chat-${chat.id} .messages`).innerHTML += messageBody
        }
        
    })
}


function postMessage(body, chat_id){
    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({
            "chat_id": chat_id,
            "user_id": currentUserId,
            "body": body
        })
    }
    fetch(`http://localhost:3000/api/v1/chats/${chat_id}/messages`, configurationObject)
    .then(data=>{return data.json()})
    .catch(error=>console.log(error))
    getChats();
}

function addGabButtonEvent(id){ 
    document.querySelector(`.chat-form-chat-${id}`).addEventListener("submit", function(e){
        e.preventDefault();
        const messageInput = document.querySelector(`#chat-form-chat-${id}`).value
        postMessage(messageInput, id);
    });
}

function addCreateUserButtonEvent(){
    document.querySelector(`.new-user-form`).addEventListener("submit", function(e){
        e.preventDefault();
        const newUserName = document.querySelector(`.new-user-compose-area`).value
        createUser(newUserName);
    });
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
    .catch(error=>console.log(error))
    fillUsersDropDown();
}

function createChat(userName){
    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({ //check if the sender / recipient ids are the same as user_id
            "sender_id": currentUserId,
            "recipient_id": userName,
        })
    }
    fetch(`http://localhost:3000/api/v1/chats`, configurationObject)
    .then(data=>{return data.json()})
    .catch(error=>console.log(error))
    getChats()
}