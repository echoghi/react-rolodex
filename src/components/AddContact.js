import React, { forwardRef } from 'react';
import { Formik } from 'formik';
import InputMask from 'react-input-mask';
import { useToasts } from 'react-toast-notifications';

import Firebase from '../firebase';
import Modal from './Modal';
import { useAuth } from '../context/authContext';
import { validateNewContact } from '../lib/validation';
import Input from './Input';
import { useAppState } from '../context/appContext';

const AddContact = forwardRef(
    (
        {
            name = '',
            id,
            email = '',
            phone = '',
            company = '',
            dob = '',
            notes = '',
            relation = '',
            birthplace = '',
            location = ''
        },
        ref
    ) => {
        const { auth } = useAuth();
        const { addToast } = useToasts();
        const { setNewContactStatus } = useAppState();

        async function editFormHandler(values, actions) {
            const contactRef = Firebase.db.ref('users').child(auth.uid).child('contacts').child(id);

            await contactRef.update(
                {
                    ...values,
                    updated: Date.now()
                },
                (error) => {
                    if (error) {
                        addToast(error, { appearance: 'error' });
                    } else {
                        actions.resetForm();
                        addToast('Contact updated', { appearance: 'success' });
                        setNewContactStatus(true);
                    }
                }
            );
        }

        async function formHandler(values, actions) {
            const contactRef = Firebase.db.ref('users').child(auth.uid).child('contacts');
            const contactData = {
                ...values,
                created: Date.now(),
                updated: Date.now()
            };

            await contactRef.push(contactData, (error) => {
                if (error) {
                    addToast(error, { appearance: 'error' });
                } else {
                    actions.resetForm();
                    addToast('New contact added', { appearance: 'success' });
                    setNewContactStatus(true);
                }
            });
            actions.setSubmitting(false);
        }

        const renderInputClass = (err) => (err ? 'input contact error' : 'input contact');

        return (
            <Modal>
                <div className="modal__container contact__modal" ref={ref}>
                    <h1>{name === '' ? 'Add Contact' : 'Edit Contact'}</h1>

                    <Formik
                        initialValues={{
                            name,
                            email,
                            phone,
                            company,
                            dob,
                            notes,
                            relation,
                            location,
                            birthplace
                        }}
                        validate={validateNewContact}
                        onSubmit={name ? editFormHandler : formHandler}
                    >
                        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                            <form className="contact__form" onSubmit={handleSubmit} noValidate={true}>
                                <div className="contact__form--left">
                                    <div className="form-control narrow">
                                        <Input
                                            name="Name"
                                            id="name"
                                            type="text"
                                            value={values.name}
                                            className="contact"
                                            placeholder="John Snow"
                                            onChange={handleChange}
                                            error={errors.name && touched.name && errors.name}
                                        />
                                    </div>

                                    <div className="form-control narrow">
                                        <Input
                                            id="email"
                                            name="Email"
                                            className="contact"
                                            value={values.email}
                                            placeholder="jsnow@wall.com"
                                            onChange={handleChange}
                                            error={errors.email && touched.email && errors.email}
                                        />
                                    </div>

                                    <div className="form-control narrow">
                                        <Input
                                            id="birthplace"
                                            name="Birthplace"
                                            className="contact"
                                            value={values.birthplace}
                                            placeholder="Winterfell, Westeros"
                                            onChange={handleChange}
                                            error={errors.birthplace && touched.birthplace && errors.birthplace}
                                        />
                                    </div>

                                    <div className="form-control narrow">
                                        <InputMask mask="(999) 999-9999" onChange={handleChange} value={values.phone}>
                                            {() => (
                                                <Input
                                                    type="text"
                                                    id="phone"
                                                    name="Phone"
                                                    value={values.phone}
                                                    className="contact"
                                                    onChange={handleChange}
                                                    placeholder="(800) 527-6911"
                                                    error={errors.phone && touched.phone && errors.phone}
                                                />
                                            )}
                                        </InputMask>
                                    </div>
                                    <div className="form-control narrow">
                                        <Input
                                            id="company"
                                            type="text"
                                            name="Company"
                                            value={values.company}
                                            className="contact"
                                            onChange={handleChange}
                                            placeholder="Night's Watch"
                                            error={errors.company && touched.company && errors.company}
                                        />
                                    </div>

                                    <div className="form-control narrow">
                                        <button
                                            className="login__button contact__button"
                                            disabled={isSubmitting}
                                            type="submit"
                                        >
                                            {name === '' ? 'Add' : 'Save'}
                                        </button>
                                    </div>
                                </div>

                                <div className="contact__notes">
                                    <div className="form-control narrow">
                                        <Input
                                            id="relation"
                                            type="text"
                                            name="Relationship"
                                            value={values.relation}
                                            className="contact"
                                            onChange={handleChange}
                                            placeholder="Family"
                                            error={errors.relation && touched.relation && errors.relation}
                                        />
                                    </div>

                                    <div className="form-control narrow">
                                        <InputMask mask="99/99/9999" onChange={handleChange} value={values.dob}>
                                            {() => (
                                                <Input
                                                    id="dob"
                                                    type="text"
                                                    name="Birthday"
                                                    className="contact"
                                                    value={values.dob}
                                                    onChange={handleChange}
                                                    placeholder="05/15/1988"
                                                    error={errors.dob && touched.dob && errors.dob}
                                                />
                                            )}
                                        </InputMask>
                                    </div>

                                    <div className="form-control narrow">
                                        <Input
                                            id="location"
                                            name="Current Location"
                                            className="contact"
                                            value={values.location}
                                            placeholder="The Wall, Westeros"
                                            onChange={handleChange}
                                            error={errors.location && touched.location && errors.location}
                                        />
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
    }
);

export default AddContact;
