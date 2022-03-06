import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Iconify from "../../../components/Iconify";
import { login } from "./../../../services/LoginService";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idChild");
  };

  useEffect(() => {
    initLocalStorage();
  }, []);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("El usuario es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      const loginData = {
        username: getFieldProps("username").value,
        password: getFieldProps("password").value,
      };
      setLoading(true);
      login(loginData).then(
        (data) => {
          console.log(data);
          if (data.idResponse) {
            switch (data.idResponse) {
              case 1:
                localStorage.setItem("token", data.token);
                localStorage.setItem("idChild", data.specialist.idChild);
                navigate("/dashboard/app", { replace: true });
                break;
              case -3:
                setErrors({ password: "Contraseña incorrecta" });

                break;
              case -2:
                setErrors({ username: "Usuario incorrecto" });
                break;
              default:
                setErrors({ password: "Error en el servidor" });
                break;
            }
          }
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setErrors({ password: "Error en el servidor" });
          setLoading(false);
        }
      );
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, setErrors } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="text"
            label="Usuario"
            {...getFieldProps("username")}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <br></br>
        <br></br>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          Iniciar Sesión
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
