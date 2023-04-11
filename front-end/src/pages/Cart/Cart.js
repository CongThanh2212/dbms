import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Cart.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function GetAllStorage(userId) {
    var storage = [], // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        let id = parseInt(keys[i]);
        let thisUserId = parseInt(id / 1000);
        if (thisUserId == userId) {
            var obj = JSON.parse(localStorage.getItem(keys[i]));
            storage.push({ ...obj, id });
        }
    }
    return storage;
}

async function GetProductById(productId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product/by-id/` + productId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function Cart() {
    let navigate = useNavigate();
    let userId = sessionStorage.getItem("userId");
    userId = parseInt(userId);
    let [cartInfo, setCartInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, []);
    let handleData = () => {
        let response = GetAllStorage(userId);
        setCartInfo(response);
    };

    let [productId, setProductId] = useState(1);
    let [productInCartInfo, setProductInCartInfo] = useState([]);
    let [productIndex, setProductIndex] = useState(1);
    let [change, setChange] = useState(false);
    let productQuantityInStock = "";
    let changeAmountControll = async () => {
        let data = productInCartInfo;
        if (data.length != 0 && productQuantityInStock != 0) {
            if (data.quantity < productQuantityInStock) {
                changeAmount(productIndex, 1);
                let info = localStorage.getItem(data.id);
                info = JSON.parse(info);
                let quantity = info == null ? 0 : info.quantity;
                quantity = quantity + 1;
                let newInfo = {
                    productName: data.productName,
                    image: data.image,
                    price: data.price,
                    quantity: quantity,
                };
                newInfo = JSON.stringify(newInfo);
                localStorage.setItem(data.id, newInfo);
            } else {
                setOpen(true);
            }
        }
    };
    useEffect(() => {
        handleData2();
        changeAmountControll();
    }, [change]);
    let handleData2 = async () => {
        let response = await GetProductById(productId);
        productQuantityInStock = response.product[0].quantityInStock;
        let response2 = await changeAmountControll();
        response2;
    };

    let totalPayment = 0;
    if (Array.isArray(cartInfo)) {
        for (let i in cartInfo) {
            let product = cartInfo[i];
            totalPayment += product.quantity * product.price;
        }
    }

    function changeAmount(index, value) {
        if (Array.isArray(cartInfo)) {
            let nextCartInfo = cartInfo.map((data, idx) => {
                if (idx == index) {
                    return {
                        ...data,
                        quantity: Math.max(1, data.quantity + value),
                    };
                } else return data;
            });
            setCartInfo(nextCartInfo);
        }
    }

    function deleteCart(index) {
        if (Array.isArray(cartInfo)) {
            let nextCartInfo = cartInfo.map((data, idx) => {
                if (idx == index) {
                    return null;
                } else return data;
            });
            let idx = nextCartInfo.indexOf(null);
            nextCartInfo.splice(idx, 1);
            setCartInfo(nextCartInfo);
        }
    }

    let cartShow =
        Array.isArray(cartInfo) &&
        cartInfo.map((data, index) => (
            <Item className="box cart box-product-info">
                <Box className="box cart box-product-image">
                    <img
                        className="image"
                        src={data.image}
                        alt={data.productName}
                    />
                </Box>
                <Box className="box cart box-product-details">
                    <Box className="box cart box-product-productInfo">
                        <Box className="box cart box-product-productName">
                            {data.productName}
                        </Box>
                        <Box className="box cart box-product-price">
                            Giá: {data.price}
                        </Box>
                    </Box>
                    <Box className="box cart box-quantity">
                        <Box className="box cart box-quantity-control">
                            <Button
                                className="box cart button-quantity-change"
                                onClick={() => {
                                    changeAmount(index, -1);
                                    let info = localStorage.getItem(data.id);
                                    info = JSON.parse(info);
                                    let quantity =
                                        info == null ? 0 : info.quantity;
                                    quantity = Math.max(1, quantity - 1);
                                    let newInfo = {
                                        productName: data.productName,
                                        image: data.image,
                                        price: data.price,
                                        quantity: quantity,
                                    };
                                    newInfo = JSON.stringify(newInfo);
                                    localStorage.setItem(data.id, newInfo);
                                }}
                            >
                                -
                            </Button>
                            <Box className="box cart box-quantity-num">
                                {data.quantity}
                            </Box>
                            <Button
                                className="box cart button-quantity-change"
                                onClick={() => {
                                    setProductId(data.id % 1000);
                                    setProductInCartInfo(data);
                                    setProductIndex(index);
                                    setChange(!change);
                                }}
                            >
                                +
                            </Button>
                        </Box>
                    </Box>
                    <Box className="box cart box-product-total">
                        Tổng giá: {data.quantity * data.price}
                    </Box>
                    <Box className="box cart box-product-delete">
                        <IconButton
                            className="box cart button-product-delete"
                            onClick={() => {
                                localStorage.removeItem(data.id);
                                deleteCart(index);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Item>
        ));
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    if (cartInfo.length == 0) {
        return (
            <Box className="box">
                <Box className="box">{Header()}</Box>
                <Item className="box cart no-item">
                    Bạn không có sản phẩm nào trong giỏ
                </Item>
            </Box>
        );
    } else {
        return (
            <Box className="box">
                <Box className="box">{Header()}</Box>
                <Box className="box cart box-cart-info">
                    <Item className="box cart box-list-product">
                        {cartShow}
                    </Item>
                    <Item className="box cart box-payment">
                        <Box className="box cart box-total-payment">
                            Tổng số tiền: {totalPayment}
                        </Box>
                        <Button
                            className="box cart button-payment"
                            onClick={() => {
                                navigate(`/payment`);
                            }}
                        >
                            Thanh toán
                        </Button>
                    </Item>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText className="cart popup text">
                            SỐ LƯỢNG YÊU CẦU KHÔNG KHẢ DỤNG
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="cart popup button-confirm"
                            onClick={handleClose}
                        >
                            ĐỒNG Ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }
}
