import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { withRouter, useHistory } from 'react-router-dom';

import Firebase from '../firebase';
import { validateSignUp } from '../lib/validation';
import Input from './Input';

const SignUp = ({ errorMessage }) => {
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = Firebase.auth.onAuthStateChanged((user) => {
            if (user && user.uid) {
                history.push('/');
            }
        });

        return () => unsubscribe();
    }, []);

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
                                <Input
                                    id="name"
                                    name="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={errors.name && touched.name && errors.name}
                                />
                            </div>

                            <div className="form-control">
                                <Input
                                    id="email"
                                    name="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={errors.email && touched.email && errors.email}
                                />
                            </div>

                            <div className="form-control">
                                <Input
                                    id="password"
                                    name="Password"
                                    value={values.password}
                                    type="password"
                                    onChange={handleChange}
                                    error={errors.password && touched.password && errors.password}
                                />
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
