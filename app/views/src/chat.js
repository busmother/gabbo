//build out Chat class
//setting out the properties of each chat
//the html we want to put on the DOM for each chat
//attach event listeners particular to each item

class Chat {

    static all = []
    static container = document.querySelector(`.grid-container`)

    constructor({id, sender, recipient, messages}){
        this.id = id
        this.sender = sender
        this.recipient = recipient
        this.messages = messages

        this.element = document.createElement("div")
        this.element.dataset["id"] = this.id

        Chat.all.push(this)
    }

    render(){
        this.element.innerHTML =  `
            <div class = "chat", id = "chat-${this.id}">
                <h3>Chat between ${this.recipient.name} and ${this.sender.name}</h3>
                <div class = "messages">
                    <br><br><br>
                </div>
                <br><br>
                <form method="post" class = "chat-form-chat-${this.id}">
                    <input class="message-compose-area" id = "chat-form-chat-${this.id}" type="text" name="body"></input><br><br><br>
                    <input type="submit" value="Gab" class="send-message" id= "gab-button-${this.id}">  </input>
                </form>
            </div>
        `;

        return this.element
    }

    attachToDom(){
        Chat.container.append(this.render());
        addGabButtonEvent(this.id)
        Chat.getMessages(this) // argument different from original
    }

    static clearChats() { //might be unnecessary, we'll see!
        const chatMarkup = ``
        document.querySelector('.grid-container').innerHTML = chatMarkup;
    }

    static getMessages(chat){
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
}