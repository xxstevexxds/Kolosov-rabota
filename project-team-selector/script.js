const list = document.getElementById("list");

function loadUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers() {
    saveUsers();
}

let users = loadUsers();

render();

document.getElementById("addBtn").addEventListener("click", () => {

    const name = document.getElementById("name");
    const interest = document.getElementById("interest");

    if (name.value.trim() === "" || interest.value.trim() === "") {
        alert("Заполните все поля");
        return;
    }
    if (users.some(user =>
    user.name.toLowerCase() === name.value.trim().toLowerCase()
)) {
    alert("Участник с таким именем уже существует.");
    return;
}
    users.push({
        name: name.value,
        interest: interest.value
    });

    saveUsers();

    name.value = "";
    interest.value = "";

    render();

});

function deleteUser(index){

    users.splice(index,1);

    saveUsers();

    render();

}

function render() {

    list.innerHTML = "";

    users.forEach((user,index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="row">
                <div>
                    <strong>${user.name}</strong><br>
                    Интересы: ${user.interest}
                </div>

                <button class="deleteBtn"
                onclick="deleteUser(${index})">
                Удалить
                </button>
            </div>
        `;

        list.appendChild(li);

    });

}