import Footer from "components/Footer/Footer";
import Body from "components/Body";
import Header from "components/Header";
import { Outlet } from "react-router-dom";

const Root = () => (
  <>
    <Header />
    <Body>
      {" "}
      <Outlet />
    </Body>
    <Footer />
  </>
);

export default Root;
