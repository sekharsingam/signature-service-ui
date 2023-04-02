import { Outlet } from "react-router-dom";
import Header from "src/components/Header";

function HomeLayout() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: 50 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;
