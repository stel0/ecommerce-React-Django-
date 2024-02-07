import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Error404 from "./containers/errors/Error404";
import {
  Home,
  Shop,
  ProductDetails,
  Login,
  Signup,
  Activate,
  ResetPassword,
  ResetPasswordConfirm,
  Search,
} from "./containers/index";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* 404 error */}
          <Route path="*" element={<Error404 />} />
          <Route exac path="/" element={<Home />} />
          {/* Authentication */}
          <Route exac path="/signup" element={<Signup />} />
          <Route exac path="/login" element={<Login />} />
          <Route exac path="/activate/:uid/:token" element={<Activate />} />
          <Route exac path="/reset_password" element={<ResetPassword />} />
          <Route
            exac
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />

          {/* Shop */}
          <Route exac path="/shop" element={<Shop />} />

          {/* Product details */}
          <Route
            exac
            path="/product/:product_id"
            element={<ProductDetails />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
