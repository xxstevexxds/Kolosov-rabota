const test = require("node:test");
const assert = require("node:assert/strict");
const {
    filterUsers,
    parseStoredUsers,
    validateParticipant
} = require("../logic.js");

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

test("пустое имя отклоняется с понятным сообщением", () => {
    assert.equal(
        validateParticipant(users, "   ", "JavaScript"),
        "Введите имя участника и его интересы."
    );
});

test("повторяющееся имя определяется без учёта регистра", () => {
    assert.equal(
        validateParticipant(users, "иван", "Дизайн"),
        "Участник с таким именем уже существует."
    );
});

test("корректный участник проходит проверку", () => {
    assert.equal(validateParticipant(users, "Мария", "Тестирование"), "");
});
