const form = document.getElementById("userForm");

const userList = document.getElementById("userList");

let users = JSON.parse(localStorage.getItem("users")) || [];

function displayUsers(){

    userList.innerHTML = "";

    users.forEach((user) => {

        userList.innerHTML += `
        
        <div class="user">
            <h3>${user.name}</h3>
            <p>${user.email}</p>
        </div>

        `;

    });

}

displayUsers();

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const user = {
        name,
        email
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    displayUsers();

    form.reset();

});