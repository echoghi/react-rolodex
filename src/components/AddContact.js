import React from 'react';
import { Formik } from 'formik';
import InputMask from 'react-input-mask';

import Firebase from '../firebase';
import Modal from './Modal';
import { useAuth } from '../context/authContext';
import { validateNewContact } from '../lib/validation';
import Input from './Input';

const AddContact = React.forwardRef((props, ref) => {
    const { auth } = useAuth();

    async function formHandler(values, actions) {
        const contactRef = Firebase.db.ref('users').child(auth.uid).child('contacts');
        const contactData = {
            ...values,
            created: Date.now(),
            updated: Date.now()
        };

        await contactRef.push(contactData, (error) => {
            if (error) {
                errorMessage();
            } else {
                actions.resetForm();
            }
        });
        actions.setSubmitting(false);
    }

    const renderInputClass = (err) => (err ? 'input contact error' : 'input contact');

    return (
        <Modal>
            <div className="modal__container contact__modal" ref={ref}>
                <h1>Add Contact</h1>

                <Formik
                    initialValues={{ name: '', email: '', phone: '', company: '', dob: '', notes: '', relation: '' }}
                    validate={validateNewContact}
                    onSubmit={formHandler}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                        <form className="contact__form" onSubmit={handleSubmit} noValidate={true}>
                            <div className="contact__form--left">
                                <div className="form-control narrow">
                                    <Input
                                        name="Name"
                                        error={errors.name && touched.name && errors.name}
                                        className="contact"
                                        id="name"
                                        placeholder="John Snow"
                                        value={values.name}
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-control narrow">
                                    <Input
                                        name="Email"
                                        error={errors.email && touched.email && errors.email}
                                        className="contact"
                                        id="email"
                                        placeholder="jsnow@wall.com"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-control narrow">
                                    <InputMask mask="(999) 999-9999" onChange={handleChange} value={values.phone}>
                                        {(inputProps) => (
                                            <label>
                                                Phone
                                                <input
                                                    className={`${renderInputClass(errors.phone && touched.phone)}`}
                                                    id="phone"
                                                    name="phone"
                                                    value={values.phone}
                                                    placeholder="(800) 527-6911"
                                                    type="text"
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        )}
                                    </InputMask>

                                    <div className="error__message">
                                        {errors.phone && touched.phone && errors.phone}
                                    </div>
                                </div>
                                <div className="form-control narrow">
                                    <Input
                                        id="company"
                                        name="Company"
                                        className="contact"
                                        placeholder="Night's Watch"
                                        error={errors.company && touched.company && errors.company}
                                        value={values.company}
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-control narrow">
                                    <button
                                        className="login__button contact__button"
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            <div className="contact__notes">
                                <div className="form-control narrow">
                                    <Input
                                        id="relation"
                                        name="Relationship"
                                        className="contact"
                                        error={errors.relation && touched.relation && errors.relation}
                                        placeholder="Family"
                                        value={values.relation}
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-control narrow">
                                    <InputMask mask="99/99/9999" onChange={handleChange} value={values.dob}>
                                        {() => (
                                            <label>
                                                Birthday
                                                <input
                                                    className={`${renderInputClass(errors.dob && touched.dob)}`}
                                                    id="dob"
                                                    name="dob"
                                                    value={values.dob}
                                                    placeholder="05/15/1988"
                                                    type="text"
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        )}
                                    </InputMask>
                                    <div className="error__message">{errors.dob && touched.dob && errors.dob}</div>
                                </div>

                                <div className="form-control narrow">
                                    <label>
                                        Notes
                                        <textarea
                                            rows="8"
                                            cols="50"
                                            className={`${renderInputClass(errors.notes && touched.notes)}`}
                                            id="notes"
                                            name="notes"
                                            value={values.notes}
                                            type="text"
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <div className="error__message">
                                        {errors.notes && touched.notes && errors.notes}
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
});

export default AddContact;
