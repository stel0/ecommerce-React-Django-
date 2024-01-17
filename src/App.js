import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Error404 from "./containers/errors/Error404";
import Home from "./containers/Home";
import { Login, Signup, Activate } from "./containers/auth";

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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
