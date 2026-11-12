const list = document.getElementById("list");
const search = document.getElementById("search");
const nameInput = document.getElementById("name");
const interestInput = document.getElementById("interest");
const message = document.getElementById("message");
const emptyState = document.getElementById("emptyState");

function loadUsers() {
    return ParticipantLogic.parseStoredUsers(localStorage.getItem("users"));
}

let users = loadUsers();

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

render();

search.addEventListener("input", render);

document.getElementById("addBtn").addEventListener("click", addParticipant);
[nameInput, interestInput].forEach(input => {
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            addParticipant();
        }
    });
});

function showMessage(text, type = "success") {
    message.textContent = text;
    message.classList.toggle("error", type === "error");
}

function addParticipant() {
    const validationError = ParticipantLogic.validateParticipant(
        users,
        nameInput.value,
        interestInput.value
    );

    if (validationError) {
        showMessage(validationError, "error");
        return;
    }

    users.push({
        name: nameInput.value.trim(),
        interest: interestInput.value.trim()
    });

    saveUsers();
    nameInput.value = "";
    interestInput.value = "";
    showMessage("Участник добавлен и сохранён.");
    render();
    nameInput.focus();
}

function deleteUser(index) {
    if (!window.confirm("Удалить участника?")) {
        return;
    }

    users.splice(index, 1);
    saveUsers();
    showMessage("Участник удалён.");
    render();
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
    const filteredUsers = ParticipantLogic.filterUsers(users, search.value);

    list.innerHTML = "";
    list.append(...filteredUsers.map(createUserListItem));

    emptyState.hidden = filteredUsers.length > 0;
    emptyState.textContent = users.length === 0
        ? "Участников пока нет. Добавьте первого участника в форме выше."
        : "По вашему запросу участники не найдены.";
}
