import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Error404 from "./containers/errors/Error404";
import { Home, Shop } from "./containers/index";
import { Login, Signup, Activate, ResetPassword, ResetPasswordConfirm} from "./containers/auth";

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
          <Route
            exac
            path="/reset_password"
            element={<ResetPassword />}
          />
          <Route
            exac
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />

          {/* Shop */}
          <Route exac path="/shop" element={<Shop />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
