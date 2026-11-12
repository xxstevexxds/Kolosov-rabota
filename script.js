const list = document.getElementById("list");
const search = document.getElementById("search");

function loadUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

let users = loadUsers();

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

render();

search.addEventListener("input", render);

document.getElementById("addBtn").addEventListener("click", () => {

    const name = document.getElementById("name");
    const interest = document.getElementById("interest");

    // Проверка №1 - пустые поля
    if (name.value.trim() === "" || interest.value.trim() === "") {
        alert("Ошибка: заполните имя участника и его интересы.");
        return;
    }

    // Проверка №2 - одинаковые имена
    if (users.some(user =>
        user.name.toLowerCase() === name.value.trim().toLowerCase()
    )) {
        alert("Участник с таким именем уже существует.");
        return;
    }

    users.push({
        name: name.value.trim(),
        interest: interest.value.trim()
    });

    saveUsers();

    name.value = "";
    interest.value = "";

    render();

});

function deleteUser(index) {

    users.splice(index, 1);

    saveUsers();

    render();

}

function render() {

    list.innerHTML = "";

    const query = search.value.trim().toLowerCase();
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.interest.toLowerCase().includes(query)
    );

    filteredUsers.forEach(user => {

        const index = users.indexOf(user);

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
