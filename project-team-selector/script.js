const list = document.getElementById("list");

let users = JSON.parse(localStorage.getItem("users")) || [];

render();

document.getElementById("addBtn").addEventListener("click", () => {

    const name = document.getElementById("name");
    const interest = document.getElementById("interest");

    if (name.value.trim() === "" || interest.value.trim() === "") {
        alert("Заполните все поля");
        return;
    }

    users.push({
        name: name.value,
        interest: interest.value
    });

    localStorage.setItem("users", JSON.stringify(users));

    name.value = "";
    interest.value = "";

    render();

});

function render() {

    list.innerHTML = "";

    users.forEach(user => {

        const li = document.createElement("li");

        li.innerHTML =
            `<strong>${user.name}</strong><br>
            Интересы: ${user.interest}`;

        list.appendChild(li);

    });

}