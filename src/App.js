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


import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
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
      <div>
        <ShareContext.Provider value={{}}>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute> } /> */}
                {/* <Route element={<ProtectRoute />}> */}
                  <Route
                    element={<Catalog itemsPerPage={2} />}
                    path="/catalog"
                  />
                  {/* <Route path="/create" element={<CreateItem />} /> */}
                {/* </Route> */}
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
                <Route path="/login" element={<Login />} />
                {/* <Route path="/logout" element={<Logout />} /> */}
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </Router>
        </ShareContext.Provider>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
