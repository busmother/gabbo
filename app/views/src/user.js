class User {
    static all = []

    constructor({id, name}){
        this.id = id
        this.name = name

        this.element = document.createElement("option")
        this.element.dataset["id"] = this.id

        User.all.push(this)
    }

    static render(dropdown, array) {
        for (let i = 0; i < array.length; i++) {
            let optn = array[i].name;
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            el.id = array[i].id
            dropdown.add(el, null);
        }
    }

    static fillUsersDropdown(){
        const usersDropdown = document.querySelector(`#users-dropdown`)
        this.render(usersDropdown, this.all);
    }

    static fillOtherUsersDropdown(){
        const otherUsersDropdown = document.querySelector(`#other-users-dropdown`);
        this.setCurrentUser()
        console.log("current user = ", currentUser)
        this.render(otherUsersDropdown, this.all);
    }

    static currentUser = "hi"

    static setCurrentUser(){
        let usersDropdown = document.querySelector(`#users-dropdown`)
        let currentUserId = usersDropdown.options[usersDropdown.selectedIndex].id;
        let currentUser = ``
        this.all.forEach(user => {
            if (user.id === currentUserId){
                currentUser = user
            }
        })
        document.querySelector('.current-user').innerHTML = "The current user is "+currentUser.name;
        return currentUser;
    }

    //fillOtherUsersDropdown 
}