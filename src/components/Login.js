import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import Firebase from '../firebase';
import { validateLogIn, validateLinkAccount } from '../lib/validation';

const validationConfig = (values) => validateLogIn(values);

const linkValidationConfig = (values) => validateLinkAccount(values);

export default function Login({ history }) {
    const [loginError, setLoginError] = useState(false);
    const authError = false;

    async function logIn(email, password) {
        try {
            await Firebase.logIn(email, password);

            history.push('/');
        } catch (err) {
            console.warn(err.message);

            let message;

            switch (err.code) {
                case 'auth/wrong-password':
                    message = 'Invalid Password';
                    break;

                case 'auth/user-not-found':
                    message = 'Email not found.';
                    break;

                default:
                    message = err.message;
                    break;
            }

            setLoginError(message);
        }
    }

    async function formHandler(values, actions) {
        const { email, password } = values;

        await logIn(email, password);

        actions.setSubmitting(false);
    }

    async function linkFormHandler(values, actions) {
        await linkAccount(values.password);

        actions.setSubmitting(false);
    }

    return (
        <div className="login__container">
            <div className="login__wrapper">
                <h1 className="login__header">react-rolodex</h1>

                {!authError ? (
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={validationConfig}
                        onSubmit={formHandler}
                    >
                        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                            <form className="login__form" onSubmit={handleSubmit} noValidate={true}>
                                <div className="form-control">
                                    <label>
                                        Email
                                        <input
                                            className={`input ${errors.email && touched.email ? 'error' : ''} `}
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <div className="error__message">
                                        {errors.email && touched.email && errors.email}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label>
                                        Password
                                        <input
                                            className={`input ${errors.password && touched.password ? 'error' : ''} `}
                                            id="password"
                                            name="password"
                                            value={values.password}
                                            type="password"
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <div className="error__message">
                                        {loginError || (errors.password && touched.password && errors.password)}
                                    </div>
                                </div>
                                <div className="form-control">
                                    <button className="login__button" disabled={isSubmitting} type="submit">
                                        Sign In
                                    </button>
                                </div>
                                <div className="login__footer">
                                    <div className="login__signup">
                                        <span>New User?</span>
                                        <Link className="login__signup--link" to="/register">
                                            Sign Up
                                        </Link>
                                    </div>

                                    <div className="login__signup">
                                        <Link className="login__signup--link" to="/reset-password">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                ) : (
                    <Formik initialValues={{ password: '' }} validate={linkValidationConfig} onSubmit={linkFormHandler}>
                        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                            <form className="login__form" onSubmit={handleSubmit} noValidate={true}>
                                <div className="form-control">
                                    <input
                                        className="input"
                                        id="password"
                                        name="password"
                                        label="Password"
                                        value={values.password}
                                        type="password"
                                        error={errors.password && touched.password}
                                        onChange={handleChange}
                                    />
                                    <div className="error__message">
                                        {authError.message || (errors.password && touched.password && errors.password)}
                                    </div>
                                </div>
                                <div className="form-control">
                                    <button className="login__button" disabled={isSubmitting} type="submit">
                                        Sign In
                                    </button>
                                </div>
                                <div className="login__footer">
                                    <div className="login__signup">
                                        <span>New User?</span>
                                        <Link div className="login__signup--link" to="/register">
                                            Sign Up
                                        </Link>
                                    </div>

                                    <div className="login__signup">
                                        <Link div className="login__signup--link" to="/reset-password">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
}
