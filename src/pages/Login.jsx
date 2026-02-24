import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";

const LoginSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short").max(50, "Too long").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(4, "Too short").max(20, "Too long").required("Required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card style={{ maxWidth: 400, margin: "40px auto" }}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          dispatch(
            login({
              name: values.name,
              email: values.email,
            }),
          );

          navigate("/profile");
        }}
      >
        {() => (
          <Form className="login-wrapper">
            <div className="login-field-group">
              <Field
                className="login-field"
                name="name"
                type="text"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                component="span"
                className="error-message"
              />
            </div>

            <div className="login-field-group">
              <Field
                className="login-field"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="error-message"
              />
            </div>

            <div className="login-field-group">
              <Field
                className="login-field"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="error-message"
              />
            </div>

            <Button
              color="primary"
              variant="outlined"
              htmlType="submit"
              style={{ marginTop: 16 }}
              // block
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
