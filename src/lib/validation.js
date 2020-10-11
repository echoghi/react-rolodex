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

const isValidDate = (date) => {
    const dates = date.split('/');
    const month = dates[0];
    const day = dates[1];
    const year = dates[2];

    if (month > 12 || day > 31 || year > new Date().getFullYear()) {
        return false;
    }

    return true;
};

export function validateDOB(dob) {
    if (dob.indexOf('_') >= 0) {
        return 'Please enter a full DOB';
    } else if (!isValidDate(dob)) {
        return 'Please enter a valid date';
    } else {
        return false;
    }
}

export function validatePhone(num) {
    if (num.indexOf('_') >= 0) {
        return 'Please enter an entire phone number';
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
        defaultValidator(values.name) ||
        validateEmail(values.email) ||
        validateDOB(values.dob) ||
        validatePhone(values.phone)
    ) {
        return {
            email: validateEmail(values.email),
            name: defaultValidator(values.name),
            phone: validatePhone(values.phone),
            dob: validateDOB(values.dob)
        };
    } else {
        return {};
    }
}
