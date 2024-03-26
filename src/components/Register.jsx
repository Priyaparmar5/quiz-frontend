import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signUp } from '../services/auth';

function Register() {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting ,resetForm}) => {
    try {
      const response = await signUp(values);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error('Error:', error);
      resetForm();
      setSubmitting(false);
      alert(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
