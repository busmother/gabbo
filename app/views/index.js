const endPoint = "http://localhost:3000/api/v1/chats"
// const endPoint = "http://localhost:3000"

document.addEventListener('DOMContentLoaded', () =>{
    getChats()
})

function getChats() {
    fetch(endPoint)
    .then(response => response.json())
    .then(chats => {
        console.log(chats);
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
            document.querySelector('.grid-container').innerHTML += chatMarkup
        })
    })
}