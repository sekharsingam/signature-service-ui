import { Box, Container, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
const StyledContent = styled("div")(() => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "calc(100vh - 100px)",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      {/* <ApplicationTitle title={"404 Page Not Found"} /> */}
      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src="/assets/images/illustration_404.svg"
            sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
          />
        </StyledContent>
      </Container>

      {/* return (
    <div style={{ margin: "20px 50px" }}>
      <label className="form-label">Signatue</label>
      <div
        className="form-field1"
        style={{
          width: 400,
          marginTop: 5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          type="text"
          size="small"
          fullWidth
          sx={{ mb: 1 }}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
      </div>
      <div style={{ marginTop: 20 }}>
        <label className="form-label">Generated Signatue</label>
        <SignatureBox>
          <img
            src={`http://localhost:8080/api/v1/signature/generateimage?name=${name}`}
            alt={"Signature"}
            width={300}
            draggable
            onDragStart={handleDragStart}
          />
        </SignatureBox>
      </div>
    </div>
  ); */}
    </>
  );
}
