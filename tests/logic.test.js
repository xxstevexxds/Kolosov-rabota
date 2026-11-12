const test = require("node:test");
const assert = require("node:assert/strict");
const { filterUsers, parseStoredUsers } = require("../logic.js");

const users = [
    { name: "Иван", interest: "JavaScript" },
    { name: "Анна", interest: "Python" },
    { name: "Сергей", interest: "Дизайн" }
];

test("поиск находит участника по интересу без учёта регистра", () => {
    assert.deepEqual(filterUsers(users, "javascript"), [users[0]]);
});

test("пустой запрос возвращает всех участников", () => {
    assert.deepEqual(filterUsers(users, "   "), users);
});

test("повреждённые данные localStorage заменяются пустым списком", () => {
    assert.deepEqual(parseStoredUsers("{некорректный json"), []);
});
