import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Details from "./pages/Details";

import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <HomeLayout>
                  <Home />
                </HomeLayout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/account"
            element={
              <ProtectedRoute>
                <HomeLayout>
                  <Account />
                </HomeLayout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute>
                <HomeLayout>
                  <Movies />
                </HomeLayout>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/series"
            element={
              <ProtectedRoute>
                <HomeLayout>
                  {" "}
                  <Series />
                </HomeLayout>
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/:category/:id"
            element={
              <ProtectedRoute>
                <HomeLayout>
                  <Details />
                </HomeLayout>
              </ProtectedRoute>
            }
          />

          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
