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

function filterUsers(query) {
    const normalizedQuery = query.trim().toLowerCase();

    return users.filter(user =>
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.interest.toLowerCase().includes(normalizedQuery)
    );
}

function createUserListItem(user) {
    const item = document.createElement("li");
    const row = document.createElement("div");
    const details = document.createElement("div");
    const name = document.createElement("strong");
    const interest = document.createElement("span");
    const deleteButton = document.createElement("button");

    row.className = "row";
    name.textContent = user.name;
    interest.textContent = `Интересы: ${user.interest}`;
    deleteButton.className = "deleteBtn";
    deleteButton.type = "button";
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", () => {
        deleteUser(users.indexOf(user));
    });

    details.append(name, document.createElement("br"), interest);
    row.append(details, deleteButton);
    item.append(row);

    return item;
}

function render() {
    list.innerHTML = "";
    list.append(...filterUsers(search.value).map(createUserListItem));
}
