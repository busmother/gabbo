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

    static createUser(newUserName){
        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                "name": newUserName,
            })
        }
        fetch(this.baseUrl, configurationObject)
        .then(data=>{return data.json()})
        .then(
            data => {
                console.log("data = ", data)
                document.querySelector('.current-user').innerHTML = "The current user is "+data.name;
                // add name to usersDropdown
                var el = document.createElement("option");
                el.id = data.id;
                el.value = data.name;
                el.innerText = data.name;
                document.querySelector(`#users-dropdown`).add(el, null);
                User.fillOtherUsersDropdown();
            })
            .catch(error=>console.log(error));
    }
}