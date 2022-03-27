import { Container, Stack, Typography } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";
import { LoginForm } from "../sections/authentication/login";
import { RootStyle, SectionStyle, ContentStyle } from "./styles/LoginStyle";

export default function Login() {
  return (
    <RootStyle title="TEApprendo | Login">
      <AuthLayout />
      <SectionStyle sx={{ display: { xs: "none", md: "flex" } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          TEApprendo
        </Typography>
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Inicia sesión como Especialista
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Ingresa tus credenciales
            </Typography>
          </Stack>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
