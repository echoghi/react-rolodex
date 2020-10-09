import React, { useState } from 'react';
import { Formik } from 'formik';
import { withRouter, Link } from 'react-router-dom';

import Firebase from '../firebase';
import { validateResetPassword } from '../lib/validation';

const ResetPassword = ({ errorMessage }) => {
    const [submitted, toggleSubmitted] = useState(false);
    async function onRequest(email) {
        try {
            await Firebase.resetPasswordRequest(email);
        } catch (err) {
            console.warn(err.message);

            errorMessage(err.message);
        }
    }

    const submitHandler = (values, actions) => {
        onRequest(values.email);
        toggleSubmitted(true);
        actions.setSubmitting(false);
    };

    return (
        <div className="login__container">
            <div className="login__wrapper">
                <h1 className="login__header">{submitted ? 'Email Sent' : 'Reset Password'}</h1>
                {/* prettier-ignore */}
                <h2 className="login__subhead">
                        {submitted
                            ? 'We\'ve e-mailed you instructions for setting your password to the e-mail address you submitted. You should be receiving it shortly.'
                            : 'Please specify your email address to receive instructions for resetting it. If an account exists by that email, we will send a password reset.'}
                    </h2>
                <Formik initialValues={{ email: '' }} validate={validateResetPassword} onSubmit={submitHandler}>
                    {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                        <form className="login__form" onSubmit={handleSubmit} noValidate={true}>
                            <div className="form-control">
                                <label>
                                    Email
                                    <input
                                        className="input"
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        error={errors.email && touched.email}
                                    />
                                </label>
                                <div className="error_message">{errors.email && touched.email && errors.email}</div>
                            </div>

                            <div className="form-control">
                                <button className="login__button" type="submit" disabled={isSubmitting}>
                                    Reset Password
                                </button>
                            </div>

                            <div className="form-control">
                                <Link className="login__return" to="/login">
                                    Back to Log In
                                </Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default withRouter(ResetPassword);
