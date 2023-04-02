import { Typography } from "@mui/material";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const styles = {
    root: {
      height: 50,
      backgroundColor: "#fff",
      padding: "5px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "97%",
    },
    img: {
      height: 50,
      width: 120,
      cursor: "pointer",
    },
  };
  return (
    <div style={styles.root}>
      <div>
        <img
          src="/assets/images/suchi_it_full_logo.png"
          alt="logo"
          style={styles.img}
          onClick={() => navigate("/suchi/home")}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Sekhar Singam</Typography>
        <FaPowerOff
          style={{ marginLeft: 15, fontSize: 24, cursor: "pointer" }}
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
}

export default Header;
