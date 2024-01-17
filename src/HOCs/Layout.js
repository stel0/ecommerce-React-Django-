import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Footer } from "../components/navigation/index";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
