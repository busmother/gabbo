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
            console.log("chat number = ", chat)
            renderChats(chat);
            })
        }
    );
}

function renderChats(chat){
    if ((chat.attributes.sender_id.toString() === currentUserId.toString()) || (chat.attributes.recipient_id.toString() === currentUserId.toString())){ 
        const chatMarkup =`
            <div class = "chat">
                <h3>Chat between ${chat.attributes.recipient.name} and ${chat.attributes.sender.name}</h3>
                <div class = "messages">
                    <br><br><br>
                </div>
                <br><br>
                <form method="post" class = "chat-form-chat-${chat.id}">
                    <input type="text" name="body"></input><br><br><br>
                    <input type="submit" class="send-message" id= "gab-button-${chat.id}"> Gab </input>
                </form>
            </div>`;
        document.querySelector('.grid-container').innerHTML += chatMarkup;
        addEvents(chat.id);
    }
}

function addEvents(id){
    console.log(`chat_id ${id} length = `, document.querySelectorAll(`.chat-form-chat-${id}`).length)
    document.querySelector(`.chat-form-chat-${id}`).addEventListener("submit", function(e){
        e.preventDefault();
        // debugger
        console.log(`You clicked the button for chat # ${id}`);
    });
}


// // function createFormHandler(e) {
// //     e.preventDefault();
// //     const messageInput = document.querySelector("#input-name").value;
// //     more attributes like chat_id
// //     postMessage(messageInput) // but with more attributes
// // }

// // function sendMessage(chat_id, body){
// //     const configurationObject = {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Accept": "application/json"
// //         },

// //         body: JSON.stringify({
// //             "chat_id": chat_id, //this is the id of the chat div
// //             "user_id": currentUserId,
// //             "body": body, //not yet sure how to locate this
// //         })
// //     }
// //     return fetch("http://localhost:3000/chats", configurationObject)
// //     .then(function(response){
// //         return response.json();
// //     })
// //     .then(function(json){
// //         // addMessage(json);
// //         console.log("sendMessage json = ", json)
// //     })
// // } 



// // // function addMessage(){

