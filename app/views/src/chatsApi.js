class ChatApi {

    static baseUrl = "http://localhost:3000/api/v1/chats"

    static getChats(){
        fetch(this.baseUrl)
        .then(r => r.json())
        .then(json => {
            json["data"].forEach(element => {
                const chatWindow = new Chat({id: element.id, 
                sender: element.attributes.sender, 
                recipient: element.attributes.recipient, 
                messages: element.attributes.messages})
                console.log("chatWindow = ", chatWindow.element)
                chatWindow.render();
                chatWindow.attachToDom();
            })
        })
    }
}