import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import "./SignIn.css";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Bản quyền © "}
            <Link color="inherit" href="/">
                FAKEHASA
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

async function loginUser(credentials) {
    let url = `${process.env.REACT_APP_SV_HOST}/login`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

export default function SignIn() {
    const navigate = useNavigate();
    let [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const response = await loginUser({
            username: data.get("username"),
            password: data.get("password"),
        });
        if (!response.error) {
            sessionStorage.setItem("userId", response.userId);
            if (response.roleId === 1) {
                sessionStorage.setItem("admin", "true");
            } else {
                sessionStorage.setItem("admin", "false");
            }
            setMessage("success-login");
            setTimeout(() => navigate("/"), 1500);
        } else {
            setMessage("error-login");
        }
    };
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box">
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                className="sign-in icon-locker"
                                sx={{ m: 1, bgcolor: "secondary.main" }}
                            >
                                <LockOutlinedIcon className="sign-in icon-locker" />
                            </Avatar>
                            <Typography
                                className="sign-in text-sign-in"
                                component="h1"
                                variant="h5"
                            >
                                Đăng nhập
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Tài khoản"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    className="sign-in button-sign-in"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    Đăng nhập
                                </Button>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Link
                                            className="sign-in text-sign-in"
                                            href="/sign-up"
                                            variant="body2"
                                        >
                                            {"Đăng ký tài khoản"}
                                        </Link>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{ textAlign: "right" }}
                                    >
                                        <Link
                                            className="sign-in text-sign-in"
                                            href="/"
                                            variant="body2"
                                        >
                                            {"Quên mật khẩu?"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                            {message === "error-login" && (
                                <Alert severity="warning" sx={{ mt: 3 }}>
                                    Tài khoản hoặc mật khẩu không chính xác
                                </Alert>
                            )}
                            {message === "success-login" && (
                                <Alert severity="success" sx={{ mt: 3 }}>
                                    Đăng nhập thành công
                                </Alert>
                            )}
                        </Box>
                        <Copyright sx={{ mt: 15, mb: 4 }} />
                    </Container>
                </ThemeProvider>
            </Box>
        </Box>
    );
}
