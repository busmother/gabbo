const endPoint = "http://localhost:3000/api/v1/chats"

document.addEventListener('DOMContentLoaded', () =>{
    console.log("Hi Nilay");
    fetch(endPoint)
    .then(response => response.json())
    .then(chats => {
        console.log(chats);
    })
})