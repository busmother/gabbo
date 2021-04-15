class User {
    static all = []
    static usersDropdown = document.querySelector(`#users-dropdown`)
    static otherUsersDropwdon = document.querySelector(`#other-users-dropdown`)

    constructor({id, name}){
        this.id = id
        this.name = name

        this.element = document.createElement("option")
        this.element.dataset["id"] = this.id

        User.all.push(this)
    }

    render(){
        this.element.innerHTML = `
        value = "${this.name}" id = "${this.id}"
        `;

        return this.element
    }

    static fillUsersDropdown(){
        const usersDropdown = document.querySelector(`#users-dropdown`)
        console.log(this.all) //working!
        console.log(this.all[0].name)
        for (let i = 0; i < this.all.length; i++) {
            let optn = this.all[i].name;
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            el.id = this.all[i].id
            usersDropdown.add(el, null);
        }
    }



    //setCurrentUserName ?
    //setCurrentUserId ?
    //fillOtherUsersDropdown ?
}