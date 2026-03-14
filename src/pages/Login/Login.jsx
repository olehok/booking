import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import { useTranslation } from "react-i18next";
import useWithLng from "../../hooks/useWithLng";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { withLng } = useWithLng();

  const loginSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .min(2, t("login.errors.tooShort"))
          .max(50, t("login.errors.tooLong"))
          .required(t("login.errors.required")),
        email: Yup.string()
          .email(t("login.errors.invalidEmail"))
          .required(t("login.errors.required")),
        password: Yup.string()
          .min(4, t("login.errors.tooShort"))
          .max(20, t("login.errors.tooLong"))
          .required(t("login.errors.required")),
      }),
    [t],
  );

  return (
    <Card style={{ maxWidth: 400, margin: "40px auto" }}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          dispatch(
            login({
              name: values.name,
              email: values.email,
            }),
          );

          navigate(withLng("/profile"));
        }}
      >
        {() => (
          <Form className="login-wrapper">
            <div className="login-field-group">
              <Field
                className="login-field"
                name="name"
                type="text"
                placeholder={t("login.name")}
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
                placeholder={t("login.email")}
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
                placeholder={t("login.password")}
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
              {t("login.submit")}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
