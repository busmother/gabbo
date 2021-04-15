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

    static createUser(){
        const newUserName = document.querySelector(`.new-user-compose-area`)
        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                "name": name,
            })
        }
        fetch(this.baseUrl, configurationObject)
        .then(data=>{return data.json()})
        .then(
            data => {
                // set current user ?
            })
            .catch(error=>console.log(error));
    }
}