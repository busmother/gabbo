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
                <h3>Chat between Users ${chat.attributes.recipient_id} and ${chat.attributes.sender_id}</h3>
                <div class = "messages">
                    <br><br><br>
                </div>
                <textarea class="message-compose-area"></textarea><br>
                <button> Gab </button>
            </div>`;
            document.querySelector('.grid-container').innerHTML += chatMarkup
        })
    })
}