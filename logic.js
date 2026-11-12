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

    const participantLogic = {
        filterUsers,
        parseStoredUsers
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = participantLogic;
    }

    globalScope.ParticipantLogic = participantLogic;
}(typeof globalThis !== "undefined" ? globalThis : window));
