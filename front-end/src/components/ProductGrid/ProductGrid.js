import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./ProductGrid.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function ProductGrid(name, productInfo) {
    const navigate = useNavigate();
    const productShow = productInfo.map((data) => (
        <Box className="box">
            <Box
                className="box product-grid box-product-detail"
                onClick={() => navigate(`/product/?id=${data.id}`)}
            >
                <Box className="box product-grid box-product-image">
                    <img
                        className="image"
                        src={data.image}
                        alt={data.productName}
                    />
                </Box>
                <Box className="box product-grid box-product-detail-text">
                    <Box className="box product-grid box-product-name">
                        {data.productName}
                    </Box>
                    <Box className="box product-grid box-product-price">
                        Giá: {data.price}
                    </Box>
                    <Box className="box product-grid box-product-sold">
                        Đã bán: {data.soldNumber}
                    </Box>
                </Box>
            </Box>
            <Button
                className="box product-grid button-add-to-cart"
                variant="outlined"
                onClick={() => {
                    if (data.soldStatus == 1) {
                        let userId = sessionStorage.getItem("userId");
                        let info = localStorage.getItem(
                            userId * 1000 + data.id
                        );
                        info = JSON.parse(info);
                        let quantity = info == null ? 0 : info.quantity;
                        quantity++;
                        let newInfo = {
                            productName: data.productName,
                            image: data.image,
                            price: data.price,
                            quantity: quantity,
                        };
                        newInfo = JSON.stringify(newInfo);
                        localStorage.setItem(userId * 1000 + data.id, newInfo);
                        setOpen1(true);
                    } else {
                        setOpen2(true);
                    }
                }}
            >
                THÊM VÀO GIỎ
            </Button>
        </Box>
    ));

    const [open1, setOpen1] = React.useState(false);
    const handleClick1 = () => {
        navigate("/cart");
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => {
        setOpen2(false);
    };

    return (
        productInfo && (
            <Item className="box product-grid box-product-grid">
                <Box className="box product-grid box-product-grid-name">
                    <Typography className="box product-grid text-product-grid-name">
                        {name}
                    </Typography>
                </Box>
                <Box className="box">
                    {Array.from(Array(Math.ceil(productInfo.length / 5))).map(
                        (_, index1) => (
                            <Box className="box product-grid box-product-grid-info">
                                {Array.from(Array(5)).map(
                                    (_, index2) =>
                                        productInfo.length >=
                                            index1 * 5 + index2 + 1 && (
                                            <Item
                                                className="box product-grid box-product-info"
                                                key={index1 * 5 + index2}
                                            >
                                                {
                                                    productShow[
                                                        index1 * 5 + index2
                                                    ]
                                                }
                                            </Item>
                                        )
                                )}
                            </Box>
                        )
                    )}
                </Box>
                <Dialog
                    className="product-grid popup box"
                    open={open1}
                    onClose={handleClose1}
                >
                    <DialogContent>
                        <DialogContentText className="product-grid popup text">
                            ĐÃ THÊM VÀO GIỎ HÀNG
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="product-grid popup button-text"
                            onClick={handleClick1}
                        >
                            THANH TOÁN
                        </Button>
                        <Button onClick={handleClose1}>TIẾP TỤC MUA SẮM</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    className="product-grid popup box"
                    open={open2}
                    onClose={handleClose2}
                >
                    <DialogContent>
                        <DialogContentText className="product-grid popup text">
                            SẢN PHẨM ĐÃ HẾT HÀNG
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose2}>TIẾP TỤC MUA SẮM</Button>
                    </DialogActions>
                </Dialog>
            </Item>
        )
    );
}
