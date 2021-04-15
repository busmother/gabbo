class User {
    static all = []

    constructor({id, name}){
        this.id = id
        this.name = name

        this.element = document.createElement("option")
        this.element.dataset["id"] = this.id

        User.all.push(this)
    }

    static render(dropdown) {
        for (let i = 0; i < this.all.length; i++) {
            let optn = this.all[i].name;
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            el.id = this.all[i].id
            dropdown.add(el, null);
        }
    }

    static fillUsersDropdown(){
        const usersDropdown = document.querySelector(`#users-dropdown`)
        this.render(usersDropdown);
    }

    static fillOtherUsersDropdown(){
        const otherUsersDropdown = document.querySelector(`#other-users-dropdown`);
        this.render(otherUsersDropdown);
    }

    static setCurrentUserName(){
        let currentUserName = document.querySelector('#users-dropdown').value;
        document.querySelector('.current-user').innerHTML = "The current user is "+currentUserName;
    }

    //setCurrentUserName ?
    //setCurrentUserId ?
    //fillOtherUsersDropdown ?
}