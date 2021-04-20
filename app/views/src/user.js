class User {
    static all = []

    constructor({id, name}){
        this.id = id
        this.name = name

        this.element = document.createElement("option")
        this.element.dataset["id"] = this.id

        User.all.push(this)
    }

    static renderDropdown(dropdown, array) { 
        for (let i = 0; i < array.length; i++) {
            let option = array[i].name;
            var el = document.createElement("option");
            el.textContent = option;
            el.value = option;
            el.id = array[i].id
            dropdown.add(el, null);
        }
    }

    static fillUsersDropdown(){
        const usersDropdown = document.querySelector(`#users-dropdown`)
        this.renderDropdown(usersDropdown, this.all);
    }

    static setOtherUsers(){
        const allUsers = this.all
        const currentUserIndex = allUsers.indexOf(this.setCurrentUser())
        const otherUsersArray = []
        for (let i = 0; i < allUsers.length; i++){
            if (i !== currentUserIndex){
                otherUsersArray.push(allUsers[i])
            }
        }
        return otherUsersArray
    }

    static fillOtherUsersDropdown(){
        const otherUsersDropdown = document.querySelector(`#other-users-dropdown`);
        this.clearDropdown(otherUsersDropdown);
        this.renderDropdown(otherUsersDropdown, this.setOtherUsers());
    }

    static clearDropdown(dropdown){
        const length = dropdown.options.length
        for (let i = length-1; i >=0; i--){
            dropdown.options[i] = null;
        }
    }

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

}