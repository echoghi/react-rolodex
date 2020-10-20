export const displayName = (name) => {
    if (!name) return;

    if (name.length > 50) {
        return `${name.substring(0, 50)}...`;
    } else {
        return name;
    }
};

export function makeTableData(data) {
    const result = [];

    for (let i = 0; i < data.length; i++) {
        const contact = data[i][1];
        const id = data[i][0];

        contact.id = id;

        // format dates
        if (contact.created && contact.updated) {
            contact.created = new Date(contact.created).toLocaleDateString('en-US');
            contact.updated = new Date(contact.updated).toLocaleDateString('en-US');
        }

        result.push(contact);
    }

    return result;
}
