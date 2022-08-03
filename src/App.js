import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { AuthContext } from "./context/AuthContext";
import { ShareContext } from "./context/ShareContext";

import "./App.css";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Header/Header";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Catalog from "./components/Catalog/Catalog";
import ProtectRoute from "./guards/ProtectRoute";
import Home from "./components/Home/Home";

function App() {
  const [shares, setShares] = useState([]);
  const [auth, setAuth] = useLocalStorage("auth", {});

  return (
    <AuthContext.Provider value={{}}>
      <>
        <Router>
          <Header />
          <Routes>
            <ShareContext.Provider value={{}}>
              <Route path="/" element={<Home />} />
              {/* <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute> } /> */}
              <Route element={<ProtectRoute />}>
                <Route element={<Catalog itemsPerPage={2} />} path="/catalog" />
                {/* <Route path="/create" element={<CreateItem />} /> */}
              </Route>
              {/* <Route
                path="/catalog/:gameId"
                element={
                  <DetailItem
                    addComment={AddComment}
                    deleteGame={onDeleteHandler}
                  />
                }
              />
              <Route path="/catalog/:gameId/edit" element={<EditItem />} /> */}
              {/* <Route path="/create" element={<CreateItem />} /> */}
            </ShareContext.Provider>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
        <Footer />
      </>
    </AuthContext.Provider>
  );
}

export default App;
