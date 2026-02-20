import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(4, "Too short").required("Required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card style={{ maxWidth: 400, margin: "40px auto" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          dispatch(
            login({
              email: values.email,
              name: "User",
            }),
          );

          navigate("/profile");
        }}
      >
        {() => (
          <Form>
            <div>
              <Field name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div style={{ marginTop: 12 }}>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 16 }}
              block
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
