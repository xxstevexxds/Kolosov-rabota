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

function deleteUser(index){

    users.splice(index,1);

    localStorage.setItem("users",JSON.stringify(users));

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