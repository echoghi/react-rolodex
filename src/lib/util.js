export const displayName = (name) => {
    if (!name) return;

    if (name.length > 50) {
        return `${name.substring(0, 50)}...`;
    } else {
        return name;
    }
};
