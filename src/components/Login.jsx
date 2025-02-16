import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../services/auth";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values,
    { setFieldError, resetForm, setSubmitting }
  ) => {
    try {
      const response = await login(values);
      if (response.data.token) {
        dispatch(setToken(response.data.token));
        dispatch(setUser(response?.data?.user));
        resetForm();
        navigate("/");
      } else {
        setFieldError("email", response.data.error);
        resetForm();
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field  type="email" name="email" id="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit" className="login-button" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
