import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

export default function Header() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        handleLogin();
    }, []);
    const handleLogin = async () => {
        let token = sessionStorage.getItem("userId");
        if (token) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    };
    const handleUser = async () => {
        let userId = sessionStorage.getItem("userId");
        let path = "/user";
        navigate(path);
    };
    const handleSignOut = async () => {
        let token = sessionStorage.getItem("userId");
        if (token) {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("admin");
            navigate("/");
            setAuth(false);
        } else {
            console.log("Error");
        }
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="header" position="static">
                <Toolbar>
                    <Typography
                        className="logo"
                        variant="h6"
                        component="div"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        FAKEHASA
                    </Typography>
                    <Menu></Menu>
                    <SearchBar />
                    <IconButton
                        className="ShoppingCartIcon"
                        onClick={() => navigate("/cart")}
                    >
                        <ShoppingCartIcon />
                    </IconButton>

                    {!auth && (
                        <div>
                            <Button
                                className="button-signin"
                                onClick={() => navigate("/sign-in")}
                            >
                                ĐĂNG NHẬP
                            </Button>
                        </div>
                    )}
                    {auth && (
                        <div>
                            <IconButton
                                className="AccountCircle"
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleUser}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Button
                                className="button-signin"
                                onClick={handleSignOut}
                            >
                                ĐĂNG XUẤT
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
