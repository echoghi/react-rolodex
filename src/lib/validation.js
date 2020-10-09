export function defaultValidator(name) {
    if (!name) {
        return 'Required';
    } else {
        return false;
    }
}

export function validateEmail(email) {
    if (!email) {
        return 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return 'Invalid email address';
    } else {
        return false;
    }
}

export function validatePassword(pass) {
    if (!pass) {
        return 'Required';
    } else if (pass.length < 6) {
        return 'Password must be at least 6 characters long.';
    } else {
        return false;
    }
}

export function validateLogIn(values) {
    if (validateEmail(values.email) || defaultValidator(values.password)) {
        return {
            email: validateEmail(values.email),
            password: defaultValidator(values.password)
        };
    } else {
        return {};
    }
}

export function validateSignUp(values) {
    if (defaultValidator(values.name) || validateEmail(values.email) || validatePassword(values.password)) {
        return {
            email: validateEmail(values.email),
            name: defaultValidator(values.name),
            password: validatePassword(values.password)
        };
    } else {
        return {};
    }
}

export function validateResetPassword(values) {
    if (validateEmail(values.email)) {
        return {
            email: validateEmail(values.email)
        };
    } else {
        return {};
    }
}

export function validateLinkAccount(values) {
    if (defaultValidator(values.password)) {
        return {
            password: defaultValidator(values.password)
        };
    } else {
        return {};
    }
}

export function validateNewContact(values) {
    if (
        (defaultValidator(values.name) ||
            validateEmail(values.email) ||
            defaultValidator(values.company) ||
            defaultValidator(values.dob) ||
            defaultValidator(values.phone),
        defaultValidator(values.notes))
    ) {
        return {
            email: validateEmail(values.email),
            name: defaultValidator(values.name),
            phone: defaultValidator(values.phone),
            dob: defaultValidator(values.dob),
            company: defaultValidator(values.company),
            notes: defaultValidator(values.notes)
        };
    } else {
        return {};
    }
}
