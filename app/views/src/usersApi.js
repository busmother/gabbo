class UsersApi {

    static baseUrl = "http://localhost:3000/api/v1/users"

    static getUsers(){
        fetch(this.baseUrl)
        .then(r => r.json())
        .then(json => {
            json["data"].forEach(element => {
                const user = new User({id: element.id,
                name: element.attributes.name})
            })
            User.fillUsersDropdown()
        })
    }

    //static createUser()
}