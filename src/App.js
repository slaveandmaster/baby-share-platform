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
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import CreateItem from "./components/Catalog/CreateItem/CreateItem";
import ProtectRoute from "./guards/ProtectRoute";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import Logout from "./components/Auth/Logout";

function App() {
  const [shares, setShares] = useState([]);
  const [auth, setAuth] = useLocalStorage("auth", {});
  
  //handlers
  const onLoginHandler = (userData) => {
    console.log(userData);
    setAuth(userData)
  }

  //logout handler
  const onLogoutHandler = () => {
    setAuth({});
  }
  return (
    <AuthContext.Provider value={{auth, onLoginHandler, onLogoutHandler}}>
      <div>
        <ShareContext.Provider value={{shares}}>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute> } /> */}
                <Route element={<ProtectRoute />}>
                  <Route
                    element={<Catalog itemsPerPage={2} />}
                    path="/catalog"
                  />
                  <Route path="/create" element={<CreateItem />} />
                  <Route path="/profile" element={<Profile />} />
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
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/NotFound" element={<NotFound/>}/>
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
