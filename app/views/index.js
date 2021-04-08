const usersEndPoint = "http://localhost:3000/api/v1/users"
const chatsEndPoint = "http://localhost:3000/api/v1/chats"

document.addEventListener('DOMContentLoaded', () =>{
    getChats();
    gatherUsers()
    // fillUsersDropDown();
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

const usersDropdown = document.querySelector("#users-dropdown")

function gatherUsers(){
    let allUsers = []
    fetch(usersEndPoint)
    .then(response => response.json())
    .then(users =>{
        users.data.forEach(user =>{
            allUsers.push(user.attributes.name);
        })
    });
    console.log("allUsers", allUsers); //these are coming out undefined
}


function fillUsersDropDown(){
    // fetch(usersEndPoint)
    // .then(response => response.json())
    // .then(users =>{
    //     usersDropdown.innerHTML.add(users.forEach(user => {
    //         user.name
    //     }))
    // })

    const sel = document.querySelector("#users-dropdown");
    // let allUsers = users.map(user => {
    //     user.name
    // })
    let allUsers = ["user1", "user2", "user3"]
    
    const opt1 = document.createElement("option")
    const opt2 = document.createElement("option");
    opt1.value = "1";
    opt1.text = "Option: Value 1"
    opt2.value = "2";
    opt2.text = "Option: Value 2";
    sel.add(opt1, null);
    sel.add(opt2, null);
}