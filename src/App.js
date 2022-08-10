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

import { ToastContainer, toast } from "react-toastify";

import * as ShareService from "./services/ShareService";

import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import CreateItem from "./components/Catalog/CreateItem/CreateItem";
import DetailsItem from "./components/Catalog/DetailsItem/DetailsItem";
import CatalogEdit from "./components/Catalog/CatalogEdit/CatalogEdit";
import ProtectRoute from "./guards/ProtectRoute";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import Logout from "./components/Auth/Logout";

function App() {
  const [shares, setShares] = useState([]);
  const [auth, setAuth] = useLocalStorage("auth", {});

  //get all shares

  useEffect(() => {
    ShareService.getAll().then((data) => {
      // console.log(data);
      setShares(data);
    });
  }, []);

  //handlers
  const onLoginHandler = (userData) => {
    console.log(userData);
    setAuth(userData);
  };
  //register handler
  const onRegister = (data) => {
    setAuth({});
  };
  //logout handler
  const onLogoutHandler = () => {
    setAuth({});
  };

  //on Search Handler
  const onSearch = (searchData) => {
    setShares(searchData);
  };

  //forms handlers
  const onCreate = (data) => {
    setShares((oldData) => [...oldData, data]);
  };

  const onDelete = (shareId) => {
    setShares((state) => state.filter((row) => row._id != shareId));
  };
  const onEdit = (shareId, data) => {
    setShares((state) =>
      state.map((item) => (item._id === shareId ? data : item))
    );
  };

  return (
    <AuthContext.Provider
      value={{ auth, onLoginHandler, onRegister, onLogoutHandler }}
    >
      <div>
        <ShareContext.Provider
          value={{ shares, onSearch, onCreate, onDelete, onEdit }}
        >
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute> } /> */}
                <Route element={<ProtectRoute />}>
                  <Route
                    element={<Catalog itemsPerPage={6} />}
                    path="/catalog"
                  />
                  <Route path="/create" element={<CreateItem />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/catalog/:shareId" element={<DetailsItem />} />
                  <Route
                    path="/catalog/:shareId/edit"
                    element={<CatalogEdit />}
                  />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/NotFound" element={<NotFound />} />
              </Routes>
            </main>
           <Footer />
          </Router>
        </ShareContext.Provider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
