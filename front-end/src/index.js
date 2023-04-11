import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Product from "./pages/Product/Product";
import ProductSet from "./pages/ProductSet/ProductSet";
import ProductCategory from "./pages/ProductCategory/ProductCategory";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import UserInfo from "./pages/UserInfo/UserInfo";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Search from "./pages/Search/Search";
import "./index.css";

export default function App() {
    const [mode, setMode] = useState("light");
    const [userRoute, setUserRoute] = useState("PrivateRoute");
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        // <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/product" element={<Product />}>
                    <Route path="?id=" element={<Product />} />
                </Route>
                <Route path="/product-set" element={<ProductSet />}>
                    <Route path="?id=" element={<ProductSet />} />
                </Route>
                <Route path="/product-category" element={<ProductCategory />}>
                    <Route path="?id=" element={<ProductCategory />} />
                </Route>
                <Route path="/cart" element={<PrivateRoute type={"cart"} />} />
                <Route
                    path="/payment"
                    element={<PrivateRoute type={"payment"} />}
                />
                <Route path="/user" element={<PrivateRoute type={"user"} />} />
                <Route
                    path="/order-detail"
                    element={<PrivateRoute type={"order-detail"} />}
                />
                <Route path="/search" element={<Search />}>
                    <Route path="?name=" element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
        // </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
