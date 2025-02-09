import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Read from "./pages/Read";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/LogIn";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "./redux/Store";

const queryClient = new QueryClient({});

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  console.log(isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="*" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/read/:id" element={<Read />} />
              <Route path="*" element={<Home />} />{" "}
              {/* Catch-all route for authenticated users */}
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />{" "}
              {/* Redirect unknown routes to login */}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
