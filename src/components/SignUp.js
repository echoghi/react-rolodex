import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Firebase from '../firebase';
import { validateSignUp } from '../lib/validation';

const SignUp = ({ errorMessage, history }) => {
    async function onRegister(name, email, password) {
        try {
            await Firebase.register(name, email, password);

            history.push('/');
        } catch (err) {
            console.warn(err.message);

            errorMessage(err.message);
        }
    }

    async function submitHandler(values, actions) {
        const { name, email, password } = values;

        await onRegister(name, email, password);

        actions.setSubmitting(false);
    }

    return (
        <div className="login__container">
            <div className="login__wrapper">
                <h1 className="login__header">Create Account</h1>

                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validate={validateSignUp}
                    onSubmit={submitHandler}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                        <form className="login__form" onSubmit={handleSubmit} noValidate={true}>
                            <div className="form-control">
                                <label>
                                    Name
                                    <input
                                        className="input"
                                        id="name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={errors.name && touched.name}
                                    />
                                </label>
                                <div className="error__message">{errors.name && touched.name && errors.name}</div>
                            </div>

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
                                <div className="error__message">{errors.email && touched.email && errors.email}</div>
                            </div>

                            <div className="form-control">
                                <label>
                                    Password
                                    <input
                                        className="input"
                                        id="password"
                                        name="password"
                                        value={values.password}
                                        type="password"
                                        onChange={handleChange}
                                        error={errors.password && touched.password}
                                    />
                                </label>
                                <div className="error__message">
                                    {errors.password && touched.password && errors.password}
                                </div>
                            </div>

                            <div className="form-control">
                                <button className="login__button" type="submit" disabled={isSubmitting}>
                                    Sign Up
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

export default withRouter(SignUp);
