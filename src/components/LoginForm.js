import { LoadingButton } from "@mui/lab";
// @mui
import {
    IconButton,
    InputAdornment, Stack, TextField, Typography
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
// components
// import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const testEmail = "admin@suchiit.com";
const testPassword = "admin";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState(testEmail);
  const [password, setPassword] = useState(testPassword);

//   const { loginError } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    onLogin({ username: email, password });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleLoginClick() : "")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {/* <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  /> */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* {loginError && (
        <Stack sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2, color: "red" }}>
            {loginError || `Incorrect Email or Password`}
          </Typography>
        </Stack>
      )} */}

      <LoadingButton
        sx={{ my: 2 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLoginClick}
        disabled={!(email && password)}
      >
        Login
      </LoadingButton>
    </>
  );
}
