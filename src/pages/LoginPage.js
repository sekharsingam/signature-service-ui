import { Container, Link, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
// import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "src/components/LoginForm";
// sections
// import { LoginForm } from "../sections/auth/login";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  //   boxShadow: theme.customShadows.card,
  //   backgroundColor: '#fff',
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "calc(100vh - 100px)",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  //   padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();

  //   const { isLoggedIn } = useSelector((state) => state.auth);

  const onLogin = (data) => {
    // dispatch(login(data));
    navigate("/suchi");
  };

  //   if (isLoggedIn) {
  //     return <Navigate to="/dashboard/all-orders" />;
  //   }

  const onNavigateToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      {/* <ApplicationTitle title={"Login"} /> */}

      <StyledRoot>
        <StyledSection>
          <img src="/assets/images/suchi_it_full_logo.png" alt="login" />
        </StyledSection>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Suchi IT
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {""}
              <Link
                variant="subtitle2"
                sx={{ cursor: "pointer" }}
                onClick={onNavigateToRegisterPage}
              >
                Get started
              </Link>
            </Typography>

            <LoginForm onLogin={onLogin} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
