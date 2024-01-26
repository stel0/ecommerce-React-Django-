import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Footer } from "../components/navigation/index";
import { connect } from "react-redux";
import { useEffect } from "react";

import { check_authenticated, refresh, load_user } from "../redux/actions/auth";
const Layout = (props) => {
  useEffect(() => {
    props.refresh();
    props.check_authenticated();
    props.load_user();
  })

  return (
    <>
      <Navbar />
      <ToastContainer />
      {props.children}
      <Footer />
    </>
  );
};

export default connect(null,{
  check_authenticated,
  refresh,
  load_user
})(Layout);
