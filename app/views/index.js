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
    // add event listeners to buttons, button event => formHandler()
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
        document.querySelector('.grid-container').innerHTML += chatMarkup;
        addEvents(chat.id);
        getMessages(chat);
    }
}

function addEvents(id){ //rename to be more descriptive
    console.log(`chat_id ${id} length = `, document.querySelectorAll(`.chat-form-chat-${id}`).length)
    document.querySelector(`.chat-form-chat-${id}`).addEventListener("submit", function(e){
        e.preventDefault();
        // debugger
        console.log(`You clicked the button for chat # ${id}`);
        console.log(document.querySelector(`#chat-form-chat-${id}`).value);
        const messageInput = document.querySelector(`#chat-form-chat-${id}`).value
        postMessage(messageInput, id);
    });
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
    .then(res=>{console.log(res)})
    .catch(error=>console.log(error))
    getChats();
}
