//build out Chat class
//setting out the properties of each chat
//the html we want to put on the DOM for each chat
//attach event listeners particular to each item

class Chat {

    static all = []

    constructor(id, sender_id, recipient_id, messages){
        this.id = id
        this.sender_id = sender_id
        this.recipient_id = recipient_id
        this.messages = messages

        Chat.all.push(this)
    }
}