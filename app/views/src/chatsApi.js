class ChatsApi {

    static baseUrl = "http://localhost:3000/api/v1/chats"

    static getChats(){
        Chat.clearChats()
        fetch(this.baseUrl)
        .then(r => r.json())
        .then(json => {
            json["data"].forEach(element => {
                const chatWindow = new Chat({id: element.id, 
                sender: element.attributes.sender, 
                recipient: element.attributes.recipient, 
                messages: element.attributes.messages})
                chatWindow.render();
                chatWindow.attachToDom();
            })
        })
    }

    static createChat(){
        const dropdown = document.querySelector(`#other-users-dropdown`)
        const recipient_id = dropdown.options[dropdown.selectedIndex].id
        const configurationObject ={
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
        fetch("http://localhost:3000/api/v1/chats", configurationObject)
        .then(data=>{return data.json()})
        .catch(error=>console.log(error))
        this.getChats()
    }

    static createMessage(body, chat_id){
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
        ChatsApi.getChats();
    }
}