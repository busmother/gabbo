const usersEndPoint = "http://localhost:3000/api/v1/users"
const chatsEndPoint = "http://localhost:3000/api/v1/chats"

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
    // addCreateUserButtonEvent()

})

document.querySelector(".update-user").addEventListener("click", function() {
    setCurrentUserName();
    setCurrentUserId();
    ChatApi.getChats();
    fillOtherUsersDropDown();
})

document.querySelector(".start-chat").addEventListener("click", function() {
    console.log("new user chat with =", document.querySelector("#other-users-dropdown").value);
    createChat()
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


// function clearChats() { //might not need, keeping here for now
//     const chatMarkup = ``;
//     document.querySelector('.grid-container').innerHTML = chatMarkup;
// }

 function createChat(){
    const dropdown = document.querySelector(`#other-users-dropdown`)
    const recipient_id = dropdown.options[dropdown.selectedIndex].id;
    console.log("you want to start a chat between",currentUserId, "and", recipient_id)
    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({ 
            "sender_id": currentUserId,
            "recipient_id": recipient_id,
        })
    }
    fetch(`http://localhost:3000/api/v1/chats`, configurationObject)
    .then(data=>{return data.json()})
    .catch(error=>console.log(error))
    getChats()
}
 
function getMessages(chat){
    chat.messages.forEach(message => {
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
            getChats();
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

