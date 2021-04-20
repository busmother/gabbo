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
            let option = this.all[i].name;
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
        // console.log("allUsers = ", allUsers)
        const currentUserIndex = allUsers.indexOf(this.setCurrentUser())
        // console.log("currentUserIndex = ", currentUserIndex)
        const otherUsersArray = []
        for (let i = 0; i < allUsers.length; i++){
            if (i !== currentUserIndex){
                otherUsersArray.push(allUsers[i])
            }
        }
        // console.log("otherUsersArray = ", otherUsersArray)
        return otherUsersArray
    }

    static fillOtherUsersDropdown(){
        const otherUsersDropdown = document.querySelector(`#other-users-dropdown`);
        this.renderDropdown(otherUsersDropdown, this.setOtherUsers());
        console.log("setOtherUsers = ", this.setOtherUsers())
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