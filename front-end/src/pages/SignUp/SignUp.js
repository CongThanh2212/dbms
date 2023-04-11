import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import "./SignUp.css";

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

async function registerUser(credentials) {
    return fetch(`${process.env.REACT_APP_SV_HOST}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    let [message, setMessage] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (
            data.get("username") === "" ||
            data.get("password") === "" ||
            data.get("firstname") === "" ||
            data.get("lastname") === ""
        ) {
            setMessage("null-value");
        } else {
            const response = await registerUser({
                username: data.get("username"),
                password: data.get("password"),
                firstname: data.get("firstname"),
                lastname: data.get("lastname"),
                email: data.get("email"),
                phone: data.get("phone"),
            });
            if (!response.error) {
                sessionStorage.setItem("userId", response.userId);
                if (response.roleId === 1) {
                    sessionStorage.setItem("admin", "true");
                } else {
                    sessionStorage.setItem("admin", "false");
                }
                setMessage("success-register");
                setTimeout(() => navigate("/"), 1500);
            } else {
                setMessage("error-register");
            }
        }
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box width="100%">{Header()}</Box>
            <Box width="100%">
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                className="sign-up icon-locker"
                                sx={{ m: 1, bgcolor: "secondary.main" }}
                            >
                                <LockOutlinedIcon className="sign-up icon-locker" />
                            </Avatar>
                            <Typography
                                className="sign-up text-sign-up"
                                component="h1"
                                variant="h5"
                            >
                                Đăng ký
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 3 }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastname"
                                            label="Họ"
                                            name="lastname"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstname"
                                            required
                                            fullWidth
                                            id="firstname"
                                            label="Tên"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Tài khoản"
                                            name="username"
                                            autoComplete="username"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Mật khẩu"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            type="email"
                                            id="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="phone"
                                            label="Điện thoại"
                                            type="phone"
                                            id="phone"
                                            autoComplete="phone"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    className="sign-up button-sign-up"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3 }}
                                >
                                    Đăng ký
                                </Button>
                                {message === "null-value" && (
                                    <Alert severity="warning" sx={{ mt: 3 }}>
                                        Vui lòng điền đủ các thông tin bắt buộc
                                    </Alert>
                                )}
                                {message === "error-register" && (
                                    <Alert severity="warning" sx={{ mt: 3 }}>
                                        Tài khoản đã tồn tại
                                    </Alert>
                                )}
                                {message === "success-register" && (
                                    <Alert severity="success" sx={{ mt: 3 }}>
                                        Đăng ký thành công
                                    </Alert>
                                )}
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Container>
                </ThemeProvider>
            </Box>
        </Box>
    );
}
