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
        for (let i = 0; i < this.all.length; i++) {
            let optn = this.all[i].name;
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

    static setOtherUsers(){
        const allUsers = this.all
        const currentUserIndex = allUsers.indexOf(this.setCurrentUser())
        const otherUsersArray = []
        for (let i = 0; i < allUsers.length; i++){
            otherUsersArray.push(i === currentUserIndex ? "cheese" : allUsers[i])
        }
        return otherUsersArray
    }

    static fillOtherUsersDropdown(){
        const otherUsersDropdown = document.querySelector(`#other-users-dropdown`);
        console.log("setOtherUsers = ", this.setOtherUsers())
        this.render(otherUsersDropdown, this.setOtherUsers());
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