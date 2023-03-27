import { Container, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { FaCheckCircle } from "react-icons/fa";
const StyledContent = styled("div")(() => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "calc(100vh - 100px)",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

// ----------------------------------------------------------------------

export default function DocumentSignatureSuccess() {
  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            <FaCheckCircle
              style={{ color: "green", fontSize: 35, marginRight: 10 }}
            />
            Success
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            You have signed the document and submitted successfully
          </Typography>
        </StyledContent>
      </Container>
    </>
  );
}
