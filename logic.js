(function (globalScope) {
    function filterUsers(users, query) {
        const normalizedQuery = query.trim().toLowerCase();

        return users.filter(user =>
            user.name.toLowerCase().includes(normalizedQuery) ||
            user.interest.toLowerCase().includes(normalizedQuery)
        );
    }

    function parseStoredUsers(rawValue) {
        if (!rawValue) {
            return [];
        }

        try {
            const parsedValue = JSON.parse(rawValue);
            return Array.isArray(parsedValue) ? parsedValue : [];
        } catch {
            return [];
        }
    }

    function validateParticipant(users, name, interest) {
        const normalizedName = name.trim();
        const normalizedInterest = interest.trim();

        if (!normalizedName || !normalizedInterest) {
            return "Введите имя участника и его интересы.";
        }

        const nameExists = users.some(user =>
            user.name.toLowerCase() === normalizedName.toLowerCase()
        );

        return nameExists
            ? "Участник с таким именем уже существует."
            : "";
    }

    const participantLogic = {
        filterUsers,
        parseStoredUsers,
        validateParticipant
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = participantLogic;
    }

    globalScope.ParticipantLogic = participantLogic;
}(typeof globalThis !== "undefined" ? globalThis : window));
