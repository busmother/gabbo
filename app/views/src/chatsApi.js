class ChatsApi {

    static baseUrl = `http://localhost:3000/api/v1/users/`

    static getChats(){
        Chat.clearChats()
        const user_id = User.setCurrentUser().id
        fetch(this.baseUrl+`${user_id}/chats`)
        .then(r => r.json())
        .then(json => {
            json["data"].forEach(element => {
                const chatWindow = new Chat({id: element.id, 
                    sender: element.attributes.sender, 
                    recipient: element.attributes.recipient, 
                    messages: element.attributes.messages})
                chatWindow.render();
                chatWindow.attachToDom();
                Chat.getMessages(chatWindow);
            })
        })
    }

    static createChat(){
        const dropdown = document.querySelector(`#other-users-dropdown`)
        const recipient_id = dropdown.options[dropdown.selectedIndex].id
        const currentUserId = User.setCurrentUser().id;
        if (recipient_id != currentUserId){
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
            fetch(`http://localhost:3000/api/v1/users/${currentUserId}/chats`, configurationObject)
            .then(data=>{return data.json()})
            .catch(error=>console.log(error))
            this.getChats()
        }
    }

    static createMessage(body, chat_id){
        const currentUserId = User.setCurrentUser().id
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
        fetch(`http://localhost:3000/api/v1/users/${currentUserId}/chats/${chat_id}/messages`, configurationObject)
        .then(data=>{
            console.log("data", data)
            return data.json()}) 
        .catch(error=>console.log(error))
        Chat.clearChats();
        this.getChats();
    }
}